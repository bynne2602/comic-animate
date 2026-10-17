# Edge TTS — giọng nước ngoài / Foreign-language voices

Comic Animate tích hợp Python client **[edge-tts](https://github.com/rany2/edge-tts)** của **rany2** để sử dụng dịch vụ giọng nói trực tuyến **Microsoft Edge**. Đây là dịch vụ bên ngoài, không phải model của Comic Animate. Cần Internet; văn bản cần đọc được gửi tới dịch vụ Microsoft.

## Cài đặt

```powershell
python -m pip install -r tools/requirements-edge-tts.txt
```

Repo ghim `edge-tts==7.3.1`. Không cần cài trình duyệt Edge hoặc API key cho client này. Khả năng truy cập và danh sách giọng phụ thuộc dịch vụ trực tuyến.

## Danh sách giọng hiện tại

```powershell
npm run edge:voices
npm run edge:voices -- --locale en-US
npm run edge:voices -- --locale ja-JP
npm run edge:voices -- --locale en
```

Dùng `ShortName` làm mã giọng, ví dụ `en-US-AvaNeural`, `en-US-AndrewNeural`, `ja-JP-NanamiNeural`, `ja-JP-KeitaNeural`. Các ví dụ đã được kiểm tra với danh sách của dịch vụ; hãy lấy danh sách mới trước khi chọn. Bộ công cụ lưu toàn bộ danh sách trả về tại `exports/voice-preview/edge/catalog.json`, không đưa vào Git.

## Nghe thử trước khi chọn

```powershell
npm run edge:generate -- --locale en-US --limit 4
npm run voices:preview
```

Mở [trang nghe thử Edge TTS](http://localhost:3052/edge/). Mặc định chỉ tạo tối đa 4 giọng thuộc locale đã chọn, không tự tạo mẫu cho toàn bộ danh sách. Chọn giọng và copy yêu cầu vào cuộc trò chuyện; trợ lý sẽ dùng lựa chọn đó cho tập mới.

Để nghe tiếng Nhật:

```powershell
npm run edge:generate -- --locale ja-JP --limit 2
```

Mỗi lần tạo mẫu thay danh sách hiển thị tại `/edge/` theo lựa chọn mới; âm thanh cũ vẫn nằm trong cache. VieNeu vẫn có trang riêng ở [localhost:3052](http://localhost:3052).

Với ngôn ngữ không có câu mẫu sẵn, thêm `--text` hoặc `--text-file` bằng đúng ngôn ngữ muốn nghe. Mẫu được tạo ở tốc độ gốc; bộ chọn tốc độ trên trang chỉ thay tốc độ nghe trong trình duyệt.

## Tạo lời kể cho tập mới

Chuẩn bị file UTF-8 chỉ chứa lời kể, không kèm tiêu đề Markdown hoặc hướng dẫn dựng. Ví dụ `episode/narration.txt` do bạn tạo:

```powershell
npm run edge:speak -- --voice en-US-AvaNeural --text-file episode/narration.txt --rate=-5% --output public/my-episode/narration.mp3
```

`--rate=-5%` tương ứng tốc độ 95%; `--rate=+0%` là 100%. Không áp thêm tỷ lệ 95% lần nữa khi phát âm thanh đã tạo ở 95%. Lệnh yêu cầu chọn giọng rõ ràng và không ghi đè file đã tồn tại.

Sau khi tạo MP3, trợ lý phải căn phụ đề, khẩu hình và thời gian cảnh theo bản thu của tập mới. Lệnh này không tự tạo composition hoặc thay giọng tập Diên Hồng. Nếu dịch vụ lỗi, lệnh báo lỗi thay vì tự đổi sang giọng hoặc ngôn ngữ khác.

## Quy tắc chọn engine

- Tiếng Việt: mặc định VieNeu; người dùng có thể chỉ định engine khác.
- Ngôn ngữ nước ngoài: dùng Edge TTS nếu người dùng không yêu cầu engine khác. Lấy danh sách theo locale và cho nghe thử trước khi chốt giọng.
- Giữ nguyên ngôn ngữ kịch bản, không tự dịch.

Client `edge-tts` giữ giấy phép LGPLv3, với ngoại lệ MIT được nêu trong file giấy phép gốc. Điều khoản của client không thay thế điều khoản dịch vụ của Microsoft. Xem [ghi nhận bên thứ ba](../THIRD_PARTY_NOTICES.md).

## English quick start

For non-Vietnamese narration, Comic Animate uses [rany2/edge-tts](https://github.com/rany2/edge-tts), a Python client for Microsoft Edge's online speech service. Internet access is required and narration text is sent to Microsoft's service.

Install `tools/requirements-edge-tts.txt`. Run `npm run edge:voices -- --locale en-US` to list current voices, then `npm run edge:generate -- --locale en-US --limit 4` to create audition samples. Start `npm run voices:preview` and open [localhost:3052/edge/](http://localhost:3052/edge/). Use `--locale ja-JP --limit 2` for Japanese samples, or provide `--text` in your selected language.

To create narration, run `npm run edge:speak -- --voice en-US-AvaNeural --text-file episode/narration.txt --rate=-5% --output public/my-episode/narration.mp3`. Supply your own UTF-8 narration-only text file. A rate of `-5%` means 95% speed; do not apply the same slowdown again during playback. Existing output files are not overwritten. Caption alignment and video timing remain separate episode-authoring steps. See the upstream client license and service terms linked in [THIRD_PARTY_NOTICES.md](../THIRD_PARTY_NOTICES.md).
