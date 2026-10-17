# Voice presets / Cấu hình giọng sẵn

[edge.json](edge.json) là preset sẵn để dùng **Microsoft Edge TTS**, thông qua client [rany2/edge-tts](https://github.com/rany2/edge-tts). Đây là cấu hình gọi dịch vụ online, không phải trọng số model chạy offline.

- Giọng: `en-US-AvaNeural` — tiếng Anh Mỹ, nữ.
- Tốc độ: `+0%` — 100%.
- Cần Internet; văn bản được gửi tới dịch vụ Microsoft.

## Nghe thử preset

```powershell
python -m pip install -r tools/requirements-edge-tts.txt
npm run edge:model
npm run voices:preview
```

Mở [localhost:3052/edge/](http://localhost:3052/edge/).

## Tạo lời kể

Tạo file `episode/narration.txt` chứa lời kể tiếng Anh, rồi chạy:

```powershell
npm run edge:model:speak -- --text-file episode/narration.txt --output public/my-episode/narration.mp3
```

Đổi `locale`, `voice` và `rate` trong `edge.json` để dùng giọng khác. Ví dụ tiếng Nhật: `locale` = `ja-JP`, `voice` = `ja-JP-NanamiNeural`. Lấy danh sách hợp lệ bằng `npm run edge:voices` trước khi đổi. Preset này chỉ là lựa chọn sẵn; không ép mọi tập phải dùng tiếng Anh hoặc giọng Ava.

Tham số dòng lệnh được ưu tiên hơn cấu hình, ví dụ `--voice ja-JP-NanamiNeural --rate=-5%`. Nếu chỉ ghi đè `--voice`, locale cũ trong preset không được dùng để chặn giọng mới. Nếu cung cấp cả `--locale`, locale đó phải khớp giọng đã chọn. Lệnh không ghi đè file âm thanh đã tồn tại.

Mẫu nghe thử luôn dùng tốc độ gốc. Nếu preset đã đổi `rate` khác `+0%`, chạy `npm run edge:model -- --rate=+0%` để tạo mẫu và dùng bộ chọn tốc độ trong trang; tạo lời kể vẫn dùng `rate` trong preset. Không làm chậm âm thanh hai lần.

## English

`edge.json` is a ready-to-use online voice preset, not offline model weights. It selects `en-US-AvaNeural` at 100% speed. Install `tools/requirements-edge-tts.txt`, run `npm run edge:model`, then open the player with `npm run voices:preview` at [localhost:3052/edge/](http://localhost:3052/edge/).

For narration, create a UTF-8 text file and run `npm run edge:model:speak -- --text-file episode/narration.txt --output public/my-episode/narration.mp3`. Edit the preset to choose another locale, voice, or rate. Explicit command-line options take precedence. Internet is required and narration text is sent to Microsoft's service. See [attribution and licenses](../THIRD_PARTY_NOTICES.md).
