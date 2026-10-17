# Third-party attribution / Ghi nhận dự án bên thứ ba

## VieNeu-TTS

Comic Animate uses **VieNeu-TTS**, created by **Phạm Nguyễn Ngọc Bảo (pnnbao97)**, for Vietnamese text-to-speech. VieNeu is an external dependency, not a speech model developed by Comic Animate.

Comic Animate tích hợp **VieNeu-TTS**, do **Phạm Nguyễn Ngọc Bảo (pnnbao97)** phát triển, để chuyển lời kể tiếng Việt thành âm thanh. Bộ model và giọng preset thuộc dự án VieNeu, không phải model do Comic Animate phát triển.

- Upstream source / Mã nguồn gốc: https://github.com/pnnbao97/VieNeu-TTS
- Python package used / Gói sử dụng: [`vieneu==3.8.3`](https://pypi.org/project/vieneu/3.8.3/)
- Engine: VieNeu v3 Turbo, accessed through the Python SDK.
- Model: https://huggingface.co/pnnbao-ump/VieNeu-TTS-v3-Turbo
- SDK license: Apache License 2.0. The unmodified license text supplied with the installed `vieneu==3.8.3` distribution is preserved in [third_party/licenses/VieNeu-LICENSE](third_party/licenses/VieNeu-LICENSE).
- Model and preset-voice terms: see the upstream [model card and licensing section](https://huggingface.co/pnnbao-ump/VieNeu-TTS-v3-Turbo#usage-rights--licensing-faq). Model weights are downloaded by VieNeu as needed and are not bundled in this Git repository.

### Integration points / Các vị trí tích hợp

| File | Use / Công dụng |
| --- | --- |
| [example/requirements-voice.txt](example/requirements-voice.txt) | Pins the Python dependency / Khai báo phiên bản thư viện |
| [example/build_audio.py](example/build_audio.py) | Calls VieNeu to synthesize the example narration / Tạo lời kể cho tập mẫu |
| [tools/voice_preview.py](tools/voice_preview.py) | Lists VieNeu presets and generates audition samples / Lấy giọng preset và tạo mẫu nghe thử |
| [tools/voice-preview.html](tools/voice-preview.html) | Plays locally generated samples / Phát các mẫu đã tạo trên máy |

The local audition page is a Comic Animate interface that uses VieNeu-generated audio; it is not VieNeu's official web application. Remotion renders the animation and combines the narration with the video.

Trang nghe thử là giao diện của Comic Animate sử dụng âm thanh do VieNeu tạo, không phải ứng dụng web chính thức của VieNeu. Remotion phụ trách dựng hình và ghép lời kể vào video.

Comic Animate's GPL-3.0-only license does not replace third-party licenses. VieNeu and its model assets retain their upstream licenses and attribution. Other dependencies also retain their respective licenses; this notice documents the VieNeu integration, not an exhaustive dependency inventory.

Giấy phép GPL-3.0-only của Comic Animate không thay thế giấy phép riêng của VieNeu hoặc các thư viện, model và tài nguyên bên thứ ba.
