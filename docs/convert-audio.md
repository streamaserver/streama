# Converting Audio for Streama Compatibility

This guide explains how to convert audio tracks in video files for better streaming compatibility.

## Why Convert Audio?

Many video files use **EAC3** (Dolby Digital Plus) or **DTS** audio codecs that have poor browser/streaming support. Converting to **AAC** ensures compatibility with web players like Streama.

## Prerequisites

- ffmpeg installed (`brew install ffmpeg` on macOS)

## Step 1: Check Current Audio Format

```bash
ffprobe -v error -show_entries stream=index,codec_name,codec_type,channels:stream_tags=language -of json "video.mkv"
```

Look for the audio stream:
```json
{
  "index": 1,
  "codec_name": "eac3",
  "codec_type": "audio",
  "channels": 6,
  "tags": {
    "language": "eng"
  }
}
```

## Step 2: Convert Audio to AAC

### Basic Conversion (Preserves All Streams)

```bash
ffmpeg -i "input.mkv" \
  -map 0 \
  -c:v copy \
  -c:a aac -b:a 384k -ac 6 \
  -c:s copy \
  "output.mkv"
```

**Explanation:**
- `-map 0` copies all streams from input
- `-c:v copy` keeps video as-is (no re-encoding)
- `-c:a aac -b:a 384k` converts audio to AAC at 384 kbps
- `-ac 6` preserves 5.1 surround (6 channels)
- `-c:s copy` keeps subtitles as-is

### Stereo Downmix (Smaller File)

```bash
ffmpeg -i "input.mkv" \
  -map 0 \
  -c:v copy \
  -c:a aac -b:a 192k -ac 2 \
  -c:s copy \
  "output.mkv"
```

## Audio Codec Compatibility

| Codec | Browser Support | Recommendation |
|-------|-----------------|----------------|
| AAC | Excellent | Best for streaming |
| MP3 | Good | Legacy support |
| AC3 (Dolby) | Poor | Convert to AAC |
| EAC3 (DD+) | Poor | Convert to AAC |
| DTS | None | Convert to AAC |
| FLAC | Limited | Convert to AAC |
| Opus | Good | Modern alternative |

## Recommended Bitrates

| Channels | Quality | Bitrate |
|----------|---------|---------|
| Stereo (2.0) | Good | 128-192 kbps |
| Stereo (2.0) | High | 192-256 kbps |
| Surround (5.1) | Good | 256-384 kbps |
| Surround (5.1) | High | 384-512 kbps |

## In-Place Replacement

To replace the original file:

```bash
ffmpeg -i "video.mkv" -map 0 -c:v copy -c:a aac -b:a 384k -ac 6 -c:s copy "video.fixed.mkv"
mv -f "video.fixed.mkv" "video.mkv"
```

## Batch Processing

Convert all MKV files in a directory:

```bash
for f in *.mkv; do
  ffmpeg -i "$f" -map 0 -c:v copy -c:a aac -b:a 384k -c:s copy "${f%.mkv}.fixed.mkv" -y
  mv -f "${f%.mkv}.fixed.mkv" "$f"
done
```

## Troubleshooting

### Audio out of sync
Add `-async 1` to the ffmpeg command.

### "Discarding too many packets"
Try adding `-max_muxing_queue_size 1024`.

### File size increased significantly
Video was re-encoded. Ensure `-c:v copy` is present.
