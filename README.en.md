# Comic Video — turn your script into a video

[Tiếng Việt](README.md) | [English](README.en.md)

A Remotion project for creating **9:16 vertical comic storytelling videos** from scripts supplied by the user. Topics can include world history, science, education, culture, fiction, and more. The project is not limited to Vietnamese history. The assistant follows the example's visual style while adapting characters, costumes, props, and locations to each script.

## Start a new episode

1. Enter the episode title and narration in [episode/script.md](episode/script.md), or provide the script directly in the conversation. You may write the script in your preferred language.
2. Ask the assistant to create the episode from your script, using [example/](example/) and the visual components in [src/](src/) as style references.
3. Review a **30-second demo** for visuals, narration, captions, and pacing.
4. Once you approve the demo, the assistant creates the **full video** from your script.

If no script has been provided, the assistant waits for it. Existing examples do not determine the next episode's topic or narration. Ask explicitly if you want help writing or editing a script.

Saving a script does not automatically generate a video. This is an assistant-guided Remotion workflow; the repository currently has no script-entry interface or automatic script-to-animation engine.

## Copyable prompt

First enter your script in [episode/script.md](episode/script.md). Copy the entire prompt below, replace `[EPISODE TITLE]`, and paste it into the conversation opened in this repository.

```text
/remotion-create Create a storytelling video titled "[EPISODE TITLE]" from the script I supplied in episode/script.md. Take the topic from my script; it is not limited to Vietnamese history. Use example/ and the original visual components in src/ to preserve the comic style, layered scenery, and blue-clothed presenter outside the panel. Adapt characters, costumes, props, and settings to the content. Use vertical 9:16 (1080×1920), 30 fps, with captions aligned to the narration. For Vietnamese narration, use Hải Đăng at 95% speed unless I request another voice; for another language, confirm a suitable voice before generating audio. Follow my script; if it is missing, wait for me to provide it. Open Remotion Studio for preview and create and export a 30-second MP4 demo for my approval before making the full video. If the script is shorter than 30 seconds, report its length and let me decide how to proceed. Preserve the example and save the new episode in its own directory.
```

## Default visual style and narration

- 1080×1920 resolution at 30 fps.
- Flat-colored characters with black outlines and softly colored, layered scenery.
- Comic panels, speech bubbles, and a blue-clothed presenter outside the panel.
- For Vietnamese narration: Hải Đăng at 95% speed. For other languages, use a suitable voice selected with the user. The bundled voice-generation scripts currently serve the Vietnamese example.

Preserve the example's drawing style and layout while adapting the designs to the topic. Its Trần-dynasty characters and costumes are example assets, not requirements for every episode. You can request a different voice, duration, or presentation style.

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

Diên Hồng demonstrates the visual style; it does not restrict the topic or language of new episodes. `project.json` currently contains the export configuration for this example.

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

## Repository and license

Public repository: [bynne2602/history-vn](https://github.com/bynne2602/history-vn). Source code and required assets are tracked. `node_modules/`, `exports/`, caches, and environment files are excluded. Cloning the repository does not include exported MP4 files.

Copyright (c) 2026 bynne2602. Licensed under the **GNU General Public License, version 3 only (`GPL-3.0-only`)**. See [LICENSE](LICENSE) for the complete terms.

You may use, modify, and distribute the project under GPLv3 without separate permission. When distributing modifications or derivative works covered by GPL, you must meet its requirements, including providing corresponding source to recipients, retaining applicable copyright and license notices, and identifying changes. The software comes without warranty under the terms of GPLv3.

The license covers original project code, documentation, and assets to the extent the owner holds the relevant rights. Third-party libraries, fonts, and assets remain subject to their own licenses. A user's output video is not automatically GPL-licensed merely because this tool rendered it; rights in the content and assets included in the video still apply.

`private: true` in `package.json` prevents accidental npm publication. It does not change GPLv3 permissions or the GitHub repository's public visibility.
