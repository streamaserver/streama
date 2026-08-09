# Extracting Subtitles from Video Files

This guide explains how to extract subtitle tracks from MKV video files using ffmpeg.

## Prerequisites

- ffmpeg installed (`brew install ffmpeg` on macOS)

## Step 1: Analyze the Video File

First, check what subtitle tracks are available:

```bash
ffprobe -v error -show_entries stream=index,codec_name,codec_type:stream_tags=language,title -of json "video.mkv"
```

This outputs JSON showing all streams. Look for entries with `"codec_type": "subtitle"`.

Example output:
```json
{
  "index": 3,
  "codec_name": "subrip",
  "codec_type": "subtitle",
  "tags": {
    "language": "eng",
    "title": "English"
  }
}
```

## Step 2: Extract Subtitles

### Extract a Single Subtitle Track

Use the stream index from Step 1:

```bash
ffmpeg -i "video.mkv" -map 0:3 -c:s srt "output.srt" -y
```

- `-map 0:3` selects stream index 3 from input 0
- `-c:s srt` converts to SRT format
- `-y` overwrites output without prompting

### Extract Multiple Subtitle Tracks

Extract multiple tracks in one command:

```bash
ffmpeg -i "video.mkv" \
  -map 0:3 -c:s srt "video.English.srt" \
  -map 0:35 -c:s srt "video.Swedish.srt" \
  -y
```

## Common Subtitle Formats

| Codec | Extension | Notes |
|-------|-----------|-------|
| subrip | .srt | Most compatible, plain text |
| ass/ssa | .ass | Styled subtitles, converts to SRT |
| hdmv_pgs | .sup | Blu-ray image subs, cannot convert to text |
| dvd_subtitle | .sub | DVD image subs, cannot convert to text |

## Tips

- **Finding language codes**: Common codes are `eng` (English), `swe` (Swedish), `ger` (German), `fre` (French)
- **Forced subtitles**: These only show when foreign languages are spoken (marked as "forced" in title)
- **SDH subtitles**: Include descriptions for deaf/hard of hearing viewers

## Troubleshooting

### "Stream not found"
The stream index may have changed. Re-run ffprobe to verify.

### Image-based subtitles
PGS/VOB subtitles are images, not text. You'll need OCR tools like SubtitleEdit to convert them.
