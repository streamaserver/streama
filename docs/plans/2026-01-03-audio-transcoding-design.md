# On-the-fly Audio Transcoding Feature Design

## Overview

Add on-the-fly audio transcoding to Streama to convert incompatible audio codecs (EAC3, AC3) to browser-compatible AAC format. FFmpeg is optional and the feature is disabled if not installed.

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        STREAMA SERVER                           │
├─────────────────────────────────────────────────────────────────┤
│  Settings                                                       │
│  ├── ffmpegPath: auto-detected or manual                       │
│  ├── ffprobePath: auto-detected or manual                      │
│  ├── transcodingEnabled: boolean (default false)               │
│  └── transcodeCacheDir: path for cached audio files            │
├─────────────────────────────────────────────────────────────────┤
│  File Domain (extended)                                         │
│  ├── audioCodec: String (eac3, aac, ac3, etc.)                 │
│  ├── needsTranscoding: Boolean                                  │
│  └── transcodedAudioPath: String (path to cached .aac)         │
├─────────────────────────────────────────────────────────────────┤
│  New Services                                                   │
│  ├── FfmpegService        - detect, probe, transcode            │
│  └── TranscodingService   - orchestrate, queue, cache mgmt      │
├─────────────────────────────────────────────────────────────────┤
│  Cache Directory                                                │
│  └── {uploadDir}/transcode-cache/                               │
│      └── {sha256}.aac     - transcoded audio streams            │
└─────────────────────────────────────────────────────────────────┘
```

## User Flows

### Flow 1: Admin enables transcoding
1. Admin goes to Settings
2. System auto-detects FFmpeg in PATH
3. If found, shows "FFmpeg detected at /usr/bin/ffmpeg"
4. If not found, shows manual path input with install instructions
5. Admin enables "Audio Transcoding"
6. System validates FFmpeg works

### Flow 2: File added to video
1. User adds file to Movie/Episode (upload, local file, or existing)
2. If transcoding enabled, system probes file with ffprobe
3. Stores audioCodec in File domain
4. Sets needsTranscoding = true if codec is incompatible (eac3, ac3, dts)

### Flow 3: User plays video needing transcoding
1. User clicks play on video
2. Frontend requests video
3. If file.needsTranscoding && !file.transcodedAudioPath:
   - Return 202 Accepted with transcoding status
   - Frontend shows "Preparing audio..." spinner
   - Server transcodes audio only to AAC (ffmpeg -vn -c:a aac)
   - Stores result in cache directory
   - Updates file.transcodedAudioPath
4. Once ready, serve video with muxed transcoded audio
5. Subsequent plays use cached audio instantly

### Flow 4: Admin pre-transcodes
1. Admin goes to Transcoding admin page
2. Sees list of files needing transcoding
3. Can click "Pre-transcode All" or individual files
4. Background job processes queue
5. Status updates shown in UI

## Technical Implementation

### New Settings
```groovy
[settingsKey: 'FFmpeg Path', name: 'ffmpeg_path', settingsType: 'string', value: '']
[settingsKey: 'FFprobe Path', name: 'ffprobe_path', settingsType: 'string', value: '']
[settingsKey: 'Enable Audio Transcoding', name: 'transcoding_enabled', settingsType: 'boolean', value: 'false']
```

### File Domain Changes
```groovy
class File {
  // ... existing fields ...
  String audioCodec        // detected codec (aac, eac3, ac3, dts, etc.)
  Boolean needsTranscoding // true if browser-incompatible
  String transcodedAudioPath // path to cached .aac file
}
```

### FfmpegService
```groovy
class FfmpegService {
  // Auto-detect ffmpeg/ffprobe in PATH
  Map detectFfmpeg()

  // Probe file for audio codec
  String probeAudioCodec(String filePath)

  // Check if codec needs transcoding
  boolean needsTranscoding(String codec)

  // Transcode audio only to AAC
  String transcodeAudioToAac(String inputPath, String outputPath)

  // Mux original video with transcoded audio on-the-fly
  void streamMuxedVideo(OutputStream output, String videoPath, String audioPath, long rangeStart, long rangeEnd)
}
```

### TranscodingService
```groovy
class TranscodingService {
  // Get cache path for file
  String getCachePath(File file)

  // Check if transcoded version exists
  boolean hasTranscodedAudio(File file)

  // Transcode file (blocking)
  File transcodeFile(File file)

  // Queue file for transcoding
  void queueForTranscoding(File file)

  // Get transcoding status
  Map getTranscodingStatus(File file)

  // Pre-transcode all pending files
  void transcodeAllPending()
}
```

### FileController Changes
```groovy
def serve() {
  // ... existing auth checks ...

  if (file needs transcoding) {
    if (no cached audio) {
      // Return 202 with status, trigger transcoding
      return [status: 'transcoding', progress: transcodingService.getProgress(file)]
    }
    // Serve muxed video+audio
    ffmpegService.streamMuxedVideo(response.outputStream, videoPath, transcodedAudioPath, rangeStart, rangeEnd)
  } else {
    // Existing direct serve logic
  }
}
```

### New TranscodingController
```groovy
class TranscodingController {
  // Get status of FFmpeg detection
  def status()

  // Get list of files needing transcoding
  def pending()

  // Trigger transcoding for a file
  def transcode(File file)

  // Trigger transcoding for all pending
  def transcodeAll()

  // Get progress of current transcoding
  def progress(File file)
}
```

### Frontend Changes

#### Player Service
- Check for 202 response when loading video
- Show transcoding spinner with progress
- Poll for completion
- Auto-reload video when ready

#### Settings UI
- New section for "Audio Transcoding"
- FFmpeg status indicator (detected/not found)
- Manual path override
- Enable/disable toggle
- Install instructions link

#### Admin Transcoding Page (optional)
- List of files needing transcoding
- Current queue status
- Pre-transcode button

## Browser-compatible vs Incompatible Codecs

**Compatible (no transcoding needed):**
- aac
- mp3
- opus
- vorbis
- flac

**Incompatible (needs transcoding):**
- eac3 (Dolby Digital Plus)
- ac3 (Dolby Digital)
- dts
- truehd
- pcm_*

## FFmpeg Commands

**Probe audio codec:**
```bash
ffprobe -v quiet -select_streams a:0 -show_entries stream=codec_name -of default=noprint_wrappers=1:nokey=1 input.mkv
```

**Extract and transcode audio to AAC:**
```bash
ffmpeg -i input.mkv -vn -c:a aac -b:a 384k output.aac
```

**Mux video with new audio (for playback):**
```bash
ffmpeg -i input.mkv -i transcoded.aac -map 0:v -map 1:a -c:v copy -c:a copy -f mp4 -movflags frag_keyframe+empty_moov pipe:1
```

## Implementation Order

1. Add File domain fields + migration
2. Create Settings entries
3. Implement FfmpegService (detect, probe, transcode)
4. Implement TranscodingService (orchestrate, cache)
5. Modify VideoService.addLocalFile to probe on attach
6. Modify FileController.serve for transcoded playback
7. Create TranscodingController
8. Add settings UI for FFmpeg config
9. Add player transcoding spinner
10. Add admin transcoding UI (optional)
