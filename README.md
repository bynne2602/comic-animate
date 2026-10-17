# Comic Video — dựng phim từ kịch bản của bạn

[Tiếng Việt](README.md) | [English](README.en.md)

Dự án Remotion để dựng video kể chuyện dạng comic từ kịch bản và thiết lập do người dùng cung cấp. **Tỷ lệ khung hình do bạn chọn: 16:9, 9:16 hoặc tỷ lệ khác.** Có thể làm lịch sử thế giới, khoa học, giáo dục, văn hóa, truyện hư cấu và các chủ đề khác; không giới hạn ở lịch sử Việt Nam. Trợ lý tham chiếu phong cách hình ảnh của tập mẫu và thiết kế nhân vật, trang phục, đạo cụ, bối cảnh phù hợp với từng kịch bản.

## Bắt đầu một tập mới

1. Nhập tên tập, lời kể và thiết lập video (tỷ lệ, độ phân giải, fps, giọng đọc) vào [episode/script.md](episode/script.md), hoặc gửi kịch bản trực tiếp trong cuộc trò chuyện.
2. Yêu cầu trợ lý dựng tập từ kịch bản đã cung cấp, tham chiếu [example/](example/) và bộ nhân vật, bối cảnh trong [src/](src/).
3. Xem **demo 30 giây** trước để kiểm tra hình ảnh, giọng đọc, phụ đề và nhịp kể.
4. Sau khi bạn duyệt demo, trợ lý mới dựng **bản full** theo kịch bản của bạn.

Nếu chưa có kịch bản, trợ lý chờ bạn nhập. Chủ đề và lời kể của tập mới không được tự lấy từ các tập mẫu. Nếu muốn trợ lý viết hoặc biên tập kịch bản, hãy yêu cầu rõ việc đó.

Việc lưu file kịch bản chưa tự tạo video. Đây là quy trình dựng với trợ lý và Remotion; repo hiện chưa có màn hình nhập kịch bản hay bộ chuyển kịch bản thành hoạt cảnh tự động.

## Thiết lập video theo nhu cầu

Bạn chọn thiết lập trong `episode/script.md` hoặc gửi trực tiếp trong cuộc trò chuyện:

| Thiết lập | Ví dụ |
| --- | --- |
| Tỷ lệ khung hình | 16:9 ngang, 9:16 dọc, 1:1 vuông hoặc tỷ lệ riêng |
| Độ phân giải | 1920×1080 cho 16:9; 1080×1920 cho 9:16; 1080×1080 cho 1:1 |
| Tốc độ khung hình | 24, 25, 30 hoặc 60 fps |
| Lời kể và giọng | Ngôn ngữ, giọng đọc và tốc độ do bạn chọn |
| Thời lượng | Theo kịch bản hoặc yêu cầu riêng; demo 30 giây trước bản full |
| Trình bày | Bố cục comic, người kể, phụ đề và màu sắc theo yêu cầu |

Nếu chưa chọn tỷ lệ khung hình, trợ lý hỏi trước khi bố trí cảnh. Bố cục, khung truyện, nhân vật và phụ đề được thiết kế theo kích thước đã chọn, không chỉ kéo giãn hoặc cắt video dọc sang ngang. Demo và bản full dùng cùng thiết lập đã chốt.

## Prompt mẫu để copy

Nhập kịch bản vào [episode/script.md](episode/script.md) trước, sau đó copy toàn bộ prompt dưới đây và thay `[TIÊU ĐỀ TẬP]`, `[TỶ LỆ]`, `[ĐỘ PHÂN GIẢI]` và `[FPS]` bằng thiết lập của bạn (ví dụ: 16:9, 1920×1080, 30). Dán prompt trong cuộc trò chuyện tại thư mục repo này.

```text
/remotion-create Tạo video kể chuyện có tiêu đề "[TIÊU ĐỀ TẬP]" từ kịch bản tôi đã nhập trong episode/script.md. Chủ đề lấy từ kịch bản, không giới hạn ở lịch sử Việt Nam. Tham chiếu example/ và mã nguồn hình ảnh gốc trong src/ để giữ phong cách comic, bối cảnh nhiều lớp và người kể áo xanh ngoài khung; điều chỉnh nhân vật, trang phục, đạo cụ và bối cảnh cho đúng nội dung. Dựng theo thiết lập tôi chọn: tỷ lệ [TỶ LỆ], độ phân giải [ĐỘ PHÂN GIẢI], [FPS] fps, có phụ đề khớp lời kể. Thiết kế bố cục theo khung hình này; nếu thiết lập còn thiếu hoặc không khớp tỷ lệ, hỏi tôi trước khi dựng. Với lời kể tiếng Việt, dùng giọng Hải Đăng tốc độ 95% nếu tôi không yêu cầu giọng khác; với ngôn ngữ khác, dùng Edge TTS và lấy danh sách giọng theo locale để tôi nghe thử trước khi chốt giọng. Bám kịch bản đã cung cấp; nếu file chưa có kịch bản, hãy chờ tôi nhập. Mở Remotion Studio để xem trước, dựng và xuất demo MP4 30 giây để tôi duyệt trước khi làm bản full. Nếu kịch bản ngắn hơn 30 giây, báo lại để tôi quyết định. Giữ nguyên tập mẫu và lưu tập mới vào thư mục riêng.
```

## Phong cách mặc định

- Tỷ lệ, độ phân giải và fps theo thiết lập người dùng; không cố định 9:16.
- Nhân vật màu phẳng, viền đen; bối cảnh nhiều lớp với màu dịu.
- Khung comic, ô thoại và người kể áo xanh đứng ngoài khung.
- Với lời kể tiếng Việt: giọng Hải Đăng, tốc độ 95%. Với ngôn ngữ khác: dùng Edge TTS và chọn giọng theo locale sau khi nghe thử, trừ khi người dùng yêu cầu engine khác.

Trợ lý giữ phong cách nét vẽ và bố cục của tập mẫu, đồng thời điều chỉnh tạo hình theo chủ đề. Nhân vật và trang phục thời Trần chỉ là tài nguyên của tập mẫu, không bắt buộc dùng cho mọi tập. Bạn có thể yêu cầu đổi giọng, thời lượng hoặc cách trình bày trong kịch bản.

## Nghe thử và chọn giọng TTS

**TTS được tích hợp từ [VieNeu-TTS](https://github.com/pnnbao97/VieNeu-TTS), do Phạm Nguyễn Ngọc Bảo (pnnbao97) phát triển.** Comic Animate gọi thư viện Python `vieneu==3.8.3` để tạo âm thanh, không tự phát triển model TTS. Xem [ghi nhận bên thứ ba và giấy phép VieNeu](THIRD_PARTY_NOTICES.md).

Mẫu tiếng Việt dùng VieNeu 3.8.3, v3 Turbo, với **25 giọng preset**. Xem [danh sách đầy đủ và hướng dẫn nghe thử](docs/tts-voices.md).

Sau khi cài Python 3.11 và `python -m pip install vieneu==3.8.3`:

```powershell
npm run voices:list
npm run voices:generate
npm run voices:preview
```

Mở [trang nghe thử](http://localhost:3052), nghe cùng một câu ở từng giọng, chọn giọng/tốc độ rồi copy yêu cầu vào cuộc trò chuyện. Chọn trên trang không tự đổi giọng của tập mẫu. Âm thanh nghe thử được tạo trên máy và lưu ngoài Git trong `exports/voice-preview/`.

## Giọng nước ngoài với Edge TTS

Tích hợp **[edge-tts](https://github.com/rany2/edge-tts)** của rany2 để dùng dịch vụ TTS trực tuyến Microsoft Edge. Cần Internet; văn bản được gửi tới dịch vụ Microsoft. Tiếng Việt mặc định dùng VieNeu; ngôn ngữ khác dùng Edge TTS, trừ khi bạn chọn engine khác.

```powershell
python -m pip install -r tools/requirements-edge-tts.txt
npm run edge:voices -- --locale en-US
npm run edge:generate -- --locale en-US --limit 4
npm run voices:preview
```

Mở [nghe thử Edge TTS](http://localhost:3052/edge/), chọn giọng rồi copy yêu cầu cho tập mới. Dùng locale `ja-JP` cho tiếng Nhật; `--list` lấy danh sách hiện tại từ dịch vụ. Xem [hướng dẫn tạo lời kể Edge TTS](docs/edge-tts.md) và [ghi nhận nguồn, giấy phép client](THIRD_PARTY_NOTICES.md#edge-tts-and-microsoft-edge-speech-service).

### Voice-model Edge có sẵn

Repo kèm [voice-models/edge.json](voice-models/edge.json): preset online `en-US-AvaNeural`, tốc độ 100%. Chạy `npm run edge:model` để tạo mẫu nghe thử. Tạo lời kể bằng `npm run edge:model:speak -- --text-file episode/narration.txt --output public/my-episode/narration.mp3` sau khi chuẩn bị file lời kể. Có thể đổi giọng, locale và tốc độ trong JSON; xem [hướng dẫn preset](voice-models/README.md). Đây là cấu hình dịch vụ, không phải model offline.

## Cài đặt và xem các tập mẫu

Cần Node.js 22 LTS và npm:

```powershell
npm ci
npm run dev
```

Mở [Remotion Studio](http://localhost:3041) và chọn composition muốn xem. Các tập có sẵn chỉ là tư liệu tham khảo:

Diên Hồng là ví dụ minh họa phong cách, không ấn định chủ đề, ngôn ngữ hay tỷ lệ khung hình cho các tập mới. Tập mẫu hiện có là 9:16, 1080×1920, 30 fps. `project.json` hiện là cấu hình xuất của ví dụ này.

| Tập mẫu | Composition | Tư liệu |
| --- | --- | --- |
| Diên Hồng | `DienHong-Vertical` | [example/](example/) — kịch bản, phụ đề, ghi chú và công cụ âm thanh |

## Các thư mục chính

| Đường dẫn | Nội dung |
| --- | --- |
| [episode/script.md](episode/script.md) | Kịch bản tập mới do người dùng nhập |
| [AGENTS.md](AGENTS.md) | Hướng dẫn cho trợ lý khi nhận kịch bản và dựng tập mới |
| [example/](example/) | Tư liệu tập Diên Hồng dùng làm mẫu phong cách |
| [src/](src/) | Mã Remotion, nhân vật và bối cảnh dùng lại |
| [public/](public/) | Âm thanh và timeline của các composition đã có |
| [content/](content/) | Timeline và nhạc nguồn của tập mẫu |
| `exports/` | Video xuất trên máy, không đưa lên Git |

## Xuất lại tập mẫu

Các lệnh dưới đây hiện dùng cấu hình Diên Hồng trong [project.json](project.json), không đọc kịch bản tập mới:

```powershell
npm run render
npm run preview
```

`render` cần FFmpeg trong PATH. `preview` mở video đã xuất tại [localhost:3051](http://localhost:3051/watch.html). Khi dựng tập mới, trợ lý cần tạo composition và cấu hình xuất tương ứng.

Không cần Python để xem hoặc xuất từ âm thanh có sẵn. Chỉ khi muốn tái tạo giọng của tập mẫu: dùng Python 3.11, cài [example/requirements-voice.txt](example/requirements-voice.txt), rồi chạy:

```powershell
npm run audio:generate
npm run audio:align
npm run audio:timing
```

Các lệnh `audio:*` chỉ tái tạo âm thanh Diên Hồng. WAV mẫu ở tốc độ 93%; composition phát với tỷ lệ 95/93 để đạt 95%.

## Mã nguồn

[github.com/bynne2602/comic-animate](https://github.com/bynne2602/comic-animate)

## Giấy phép

[GNU GPLv3](LICENSE) (`GPL-3.0-only`).

VieNeu-TTS và các thành phần bên thứ ba giữ giấy phép riêng; xem [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

Copyright (c) 2026 bynne2602.
