# Giọng TTS và cách nghe thử / TTS voice catalog

Repo dùng **VieNeu 3.8.3, engine v3 Turbo** cho mẫu tiếng Việt. Danh sách dưới đây gồm đủ 25 preset đã kiểm tra bằng `Vieneu().list_preset_voices()`. Danh sách có thể khác khi đổi phiên bản hoặc engine; dùng `npm run voices:list` để kiểm tra môi trường của bạn. Tài liệu API: [VieNeu Voice Management](https://docs.vieneu.io/docs/api/voice-management/).

## Nghe trước khi chọn

Cài Python 3.11 và VieNeu một lần:

```powershell
python -m pip install vieneu==3.8.3
```

Tạo mẫu đọc cùng một câu cho mọi giọng, sau đó mở trang nghe thử:

```powershell
npm run voices:generate
npm run voices:preview
```

Mở [http://localhost:3052](http://localhost:3052). Bấm Play trên từng giọng, lọc theo tên/vùng miền/giới tính và thử tốc độ 90%, 95%, 100% hoặc 105%. Bấm **Chọn giọng → Copy yêu cầu dùng giọng này**, rồi dán vào cuộc trò chuyện khi dựng tập mới. Trang không tự ghi đè cấu hình hoặc âm thanh của tập mẫu.

Muốn nghe chính lời kể của bạn:

```powershell
npm run voices:generate -- --text "Nhập một đoạn ngắn trong kịch bản của bạn ở đây."
```

Model được tải khi cần ở lần chạy đầu. Mẫu âm thanh được lưu trong `exports/voice-preview/`, không đưa lên Git. Chạy lại cùng câu và phiên bản dùng lại mẫu đã có. Giữ trang ở tốc độ 100% để nghe bản gốc; thay tốc độ trên trang chỉ tác động phát thử trong trình duyệt. Trang nghe thử chạy tại máy bạn, không phải dịch vụ được host trên GitHub.

## Danh sách đầy đủ: 25 giọng

Tên giọng dưới đây là giá trị truyền vào `voice=`. Mô tả giới tính, vùng miền và phong cách lấy từ nhãn preset của engine, không phải đánh giá chất lượng chủ quan.

| Giọng / Voice | Giới tính | Vùng miền | Phong cách |
| --- | --- | --- | --- |
| Adam bựa | Nam | Bắc | Tự nhiên |
| Trúc Ly | Nữ | Bắc | Tự nhiên |
| Thiện Minh | Nam | Bắc | Kể chuyện |
| Mai Anh | Nữ | Bắc | Tin tức |
| Hải Đăng | Nam | Bắc | Tự nhiên |
| Thùy Dung | Nữ | Nam | Tin tức |
| Thiền Tâm Đức | Nam | Bắc | Kể chuyện |
| Ngọc Huyền | Nữ | Bắc | Đọc tự nhiên |
| Quang Sơn | Nam | Trung | Tự nhiên |
| Ngọc Trân | Nữ | Trung | Tự nhiên |
| Minh Đức | Nam | Bắc | Tin tức |
| Phạm Tuyên | Nam | Bắc | Tự nhiên |
| Thái Sơn | Nam | Nam | Kể chuyện |
| Xuân Vĩnh | Nam | Bắc | Tự nhiên |
| Thanh Bình | Nam | Bắc | Kể chuyện |
| Ngọc Linh | Nữ | Bắc | Kể chuyện |
| Đoan Trang | Nữ | Bắc | Tự nhiên |
| Thục Đoan | Nữ | Nam | Kể chuyện |
| Minh Triết | Nam | Nam | Tin tức |
| Mỹ Duyên | Nữ | Nam | Đọc truyện |
| Quỳnh Anh | Nữ | Bắc | Đọc truyện |
| Đức Trí | Nam | Nam | Đọc truyện |
| Kim Thanh | Nữ | Nam | Đọc truyện |
| Adam | Nam | Nam | Đọc tự nhiên |
| Quốc Tuấn | Nam | Bắc | Tự nhiên |

English legend: Nam/Nữ under gender = male/female; Bắc/Trung/Nam under region = northern/central/southern Vietnamese. Tự nhiên = natural; tin tức = news; kể chuyện/đọc truyện = storytelling.

## Tập mẫu dùng giọng nào?

Diên Hồng hiện dùng Hải Đăng. `example/build_audio.py` đặt tên giọng trong lời gọi `tts.infer`, khóa cache và metadata; đây là công cụ riêng cho tập mẫu, không phải bộ chọn giọng cho mọi tập.

WAV mẫu được tạo ở tốc độ 93%; composition phát tỷ lệ 95/93 để đạt tốc độ nghe 95%. Không áp thêm 95% lên âm thanh đã có. Khi chọn giọng mới, hãy cho trợ lý tạo âm thanh và căn lại phụ đề, khẩu hình, thời gian cảnh cho tập mới, thay vì đổi nhãn giọng của bản thu cũ.

## English quick start

Install Python 3.11 and `vieneu==3.8.3`, then run `npm run voices:generate` and `npm run voices:preview`. Open [localhost:3052](http://localhost:3052) to audition all engine presets using the same sentence. Filter the cards, play a sample, choose a speed, and copy the selected-voice request into your episode conversation. The audition interface currently uses Vietnamese labels; the engine's voice names are preserved exactly.

Use `npm run voices:generate -- --text "Your short Vietnamese sample sentence."` to compare the voices on your own narration. Samples are generated locally in `exports/voice-preview/` and excluded from Git. The first run may download model files. The page does not change the example voice or automatically apply a voice to a new episode. The assistant must synthesize new narration and update its timing after you select a voice.
