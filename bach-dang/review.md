# Demo review

Reviewed output: `exports/bach-dang-demo-30s.mp4` (6,631,595 bytes).

- 1080×1920, 9:16, H.264, 30 fps, 900 video frames. AAC stereo 48 kHz. Container duration 30.016 seconds includes AAC padding; the authored video is 30 seconds.
- Full FFmpeg decoding completed without errors.
- Inspected Studio samples for the fleet, commander, stakes before/after rising water, and final boat scene. Inspected a 10-frame contact sheet extracted from the final encoded MP4 at 3-second intervals.
- Original cast geometry, colors, layered scenery and presenter placement are reused. Bubble text stays within its border. The commander's pointing hand is clear of the second soldier's face. Stakes are visible first and fully hidden after rising water. Boat poles avoid crew faces.
- Captions are matched to authored Vietnamese words using Whisper base word timestamps, with short trailing fragments merged. Recognizer digit formatting for 1288 is expanded for alignment. Recognition matched 94.7–100% of script tokens after number normalization; spurious ASR tails after the last scripted word were excluded from captions.
- Timeline totals 900 frames. Narration WAV is 30 seconds. All caption intervals are positive, in range and non-overlapping.
- TypeScript checking reports four pre-existing errors in the original files: unused React / CastRole, Array.at lib target, and redundant narrator comparison. No new-file TypeScript errors remain. Original files are preserved except the entry point registering the additional compositions.

This is visual sample review and automated audio/text alignment; no claim of a full human listening review. The full episode is not rendered; the demo is the user's requested first review stage.
