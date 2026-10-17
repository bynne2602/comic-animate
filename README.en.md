# Comic Video — turn your script into a video

[Tiếng Việt](README.md) | [English](README.en.md)

A Remotion project for creating comic storytelling videos from user-provided scripts and settings. **You choose the aspect ratio: landscape 16:9, portrait 9:16, or another format.** Topics can include world history, science, education, culture, fiction, and more. The project is not limited to Vietnamese history. The assistant follows the example's visual style while adapting characters, costumes, props, and locations to each script.

## Start a new episode

1. Enter the episode title, narration, and video settings (aspect ratio, resolution, frame rate, and voice) in [episode/script.md](episode/script.md), or provide the script directly in the conversation. You may write the script in your preferred language.
2. Ask the assistant to create the episode from your script, using [example/](example/) and the visual components in [src/](src/) as style references.
3. Review a **30-second demo** for visuals, narration, captions, and pacing.
4. Once you approve the demo, the assistant creates the **full video** from your script.

If no script has been provided, the assistant waits for it. Existing examples do not determine the next episode's topic or narration. Ask explicitly if you want help writing or editing a script.

Saving a script does not automatically generate a video. This is an assistant-guided Remotion workflow; the repository currently has no script-entry interface or automatic script-to-animation engine.

## Customize your video

Specify your settings in `episode/script.md` or directly in the conversation:

| Setting | Examples |
| --- | --- |
| Aspect ratio | Landscape 16:9, portrait 9:16, square 1:1, or a custom ratio |
| Resolution | 1920×1080 for 16:9; 1080×1920 for 9:16; 1080×1080 for 1:1 |
| Frame rate | 24, 25, 30, or 60 fps |
| Narration | Your choice of language, voice, and speaking speed |
| Duration | Based on your script or requested length; a 30-second demo before the full video |
| Presentation | Comic layout, presenter, captions, and colors tailored to your request |

If the aspect ratio is unspecified, the assistant asks before laying out scenes. Panels, characters, and captions are arranged for the selected dimensions rather than simply stretching or cropping a portrait video. The demo and full video use the same agreed settings.

## Copyable prompt

First enter your script in [episode/script.md](episode/script.md). Copy the entire prompt below, replace `[EPISODE TITLE]`, `[ASPECT RATIO]`, `[RESOLUTION]`, and `[FPS]` with your settings (for example: 16:9, 1920×1080, 30), and paste it into the conversation opened in this repository.

```text
/remotion-create Create a storytelling video titled "[EPISODE TITLE]" from the script I supplied in episode/script.md. Take the topic from my script; it is not limited to Vietnamese history. Use example/ and the original visual components in src/ to preserve the comic style, layered scenery, and blue-clothed presenter outside the panel. Adapt characters, costumes, props, and settings to the content. Use my selected settings: [ASPECT RATIO] aspect ratio, [RESOLUTION] resolution, and [FPS] fps, with captions aligned to the narration. Design the layout for this frame; ask me before proceeding if settings are missing or dimensions do not match the ratio. For Vietnamese narration, use Hải Đăng at 95% speed unless I request another voice; for another language, use Edge TTS and list voices for its locale so I can audition and select a voice before narration is generated. Follow my script; if it is missing, wait for me to provide it. Open Remotion Studio for preview and create and export a 30-second MP4 demo for my approval before making the full video. If the script is shorter than 30 seconds, report its length and let me decide how to proceed. Preserve the example and save the new episode in its own directory.
```

## Default visual style and narration

- Aspect ratio, resolution, and frame rate follow user settings; 9:16 is not mandatory.
- Flat-colored characters with black outlines and softly colored, layered scenery.
- Comic panels, speech bubbles, and a blue-clothed presenter outside the panel.
- For Vietnamese narration: Hải Đăng at 95% speed. For other languages, use Edge TTS and audition voices for the selected locale, unless the user requests a different engine.

Preserve the example's drawing style and layout while adapting the designs to the topic. Its Trần-dynasty characters and costumes are example assets, not requirements for every episode. You can request a different voice, duration, or presentation style.

## Audition and select a TTS voice

**TTS is powered by [VieNeu-TTS](https://github.com/pnnbao97/VieNeu-TTS), developed by Phạm Nguyễn Ngọc Bảo (pnnbao97).** Comic Animate calls the external Python package `vieneu==3.8.3` to synthesize speech; it does not develop its own TTS model. See [third-party attribution and the VieNeu license](THIRD_PARTY_NOTICES.md).

The Vietnamese example uses VieNeu 3.8.3, v3 Turbo, with **25 preset voices**. See the [complete voice catalog and audition guide](docs/tts-voices.md), including an English quick start.

After installing Python 3.11 and running `python -m pip install vieneu==3.8.3`:

```powershell
npm run voices:list
npm run voices:generate
npm run voices:preview
```

Open the [local audition page](http://localhost:3052), compare the same sentence across voices, select a voice and playback speed, then copy the request into your episode conversation. Selecting a voice does not modify the example. Samples are generated on your machine in `exports/voice-preview/` and excluded from Git.

## Foreign-language narration with Edge TTS

Uses **[rany2/edge-tts](https://github.com/rany2/edge-tts)**, a client for Microsoft Edge's online speech service. Internet access is required; narration text is sent to Microsoft's service. Vietnamese defaults to VieNeu; other languages use Edge TTS unless you select another engine.

```powershell
python -m pip install -r tools/requirements-edge-tts.txt
npm run edge:voices -- --locale en-US
npm run edge:generate -- --locale en-US --limit 4
npm run voices:preview
```

Open the [Edge TTS audition page](http://localhost:3052/edge/), select a voice, and copy the request into your episode conversation. Use `ja-JP` for Japanese or another supported locale. See the [Edge TTS narration guide](docs/edge-tts.md) and [client attribution and license](THIRD_PARTY_NOTICES.md#edge-tts-and-microsoft-edge-speech-service).

## Install and preview the example

Requires Node.js 22 LTS and npm:

```powershell
npm ci
npm run dev
```

Open [Remotion Studio](http://localhost:3041) and select a composition:

| Example | Composition | Materials |
| --- | --- | --- |
| Diên Hồng | `DienHong-Vertical` | [example/](example/) — script, subtitles, notes, and audio tools |

Diên Hồng demonstrates the visual style; it does not restrict the topic, language, or aspect ratio of new episodes. The existing example is portrait 9:16 at 1080×1920 and 30 fps. `project.json` currently contains the export configuration for this example.

## Project structure

| Path | Purpose |
| --- | --- |
| [episode/script.md](episode/script.md) | User-provided script for a new episode |
| [AGENTS.md](AGENTS.md) | Instructions for the assistant's episode-creation workflow |
| [example/](example/) | Diên Hồng materials used as a style reference |
| [src/](src/) | Remotion code and reusable character and scenery components |
| [public/](public/) | Audio and timelines for existing compositions |
| [content/](content/) | Source timeline and music for the example |
| `exports/` | Local video exports; excluded from Git |

## Re-export the example

These commands currently use the Diên Hồng configuration in [project.json](project.json). They do not consume the new episode script:

```powershell
npm run render
npm run preview
```

`render` requires FFmpeg in PATH. `preview` serves an already-exported video at [localhost:3051](http://localhost:3051/watch.html). For a new episode, the assistant must create the corresponding composition and export configuration.

Python is not required to preview or render with the existing audio. To regenerate the example's narration, use Python 3.11, install [example/requirements-voice.txt](example/requirements-voice.txt), and run:

```powershell
npm run audio:generate
npm run audio:align
npm run audio:timing
```

These `audio:*` commands regenerate only the Vietnamese Diên Hồng example. Its source WAV is at 93% speed; the composition uses a playback ratio of 95/93 to reach 95%.

## Source code

[github.com/bynne2602/comic-animate](https://github.com/bynne2602/comic-animate)

## License

[GNU GPLv3](LICENSE) (`GPL-3.0-only`).

VieNeu-TTS and other third-party components retain their own licenses; see [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

Copyright (c) 2026 bynne2602.
