# Comic Video — dựng phim từ kịch bản của bạn

[Tiếng Việt](README.md) | [English](README.en.md)

Dự án Remotion để dựng video kể chuyện dạng comic dọc **9:16** từ kịch bản do người dùng cung cấp. Có thể làm lịch sử thế giới, khoa học, giáo dục, văn hóa, truyện hư cấu và các chủ đề khác; không giới hạn ở lịch sử Việt Nam. Trợ lý tham chiếu phong cách hình ảnh của tập mẫu và thiết kế nhân vật, trang phục, đạo cụ, bối cảnh phù hợp với từng kịch bản.

## Bắt đầu một tập mới

1. Nhập tên tập và lời kể vào [episode/script.md](episode/script.md), hoặc gửi kịch bản trực tiếp trong cuộc trò chuyện.
2. Yêu cầu trợ lý dựng tập từ kịch bản đã cung cấp, tham chiếu [example/](example/) và bộ nhân vật, bối cảnh trong [src/](src/).
3. Xem **demo 30 giây** trước để kiểm tra hình ảnh, giọng đọc, phụ đề và nhịp kể.
4. Sau khi bạn duyệt demo, trợ lý mới dựng **bản full** theo kịch bản của bạn.

Nếu chưa có kịch bản, trợ lý chờ bạn nhập. Chủ đề và lời kể của tập mới không được tự lấy từ các tập mẫu. Nếu muốn trợ lý viết hoặc biên tập kịch bản, hãy yêu cầu rõ việc đó.

Việc lưu file kịch bản chưa tự tạo video. Đây là quy trình dựng với trợ lý và Remotion; repo hiện chưa có màn hình nhập kịch bản hay bộ chuyển kịch bản thành hoạt cảnh tự động.

## Prompt mẫu để copy

Nhập kịch bản vào [episode/script.md](episode/script.md) trước, sau đó copy toàn bộ prompt dưới đây và thay `[TIÊU ĐỀ TẬP]` bằng tiêu đề của bạn. Dán prompt trong cuộc trò chuyện tại thư mục repo này.

```text
/remotion-create Tạo video kể chuyện có tiêu đề "[TIÊU ĐỀ TẬP]" từ kịch bản tôi đã nhập trong episode/script.md. Chủ đề lấy từ kịch bản, không giới hạn ở lịch sử Việt Nam. Tham chiếu example/ và mã nguồn hình ảnh gốc trong src/ để giữ phong cách comic, bối cảnh nhiều lớp và người kể áo xanh ngoài khung; điều chỉnh nhân vật, trang phục, đạo cụ và bối cảnh cho đúng nội dung. Dựng khổ dọc 9:16 (1080×1920), 30 fps, có phụ đề khớp lời kể. Với lời kể tiếng Việt, dùng giọng Hải Đăng tốc độ 95% nếu tôi không yêu cầu giọng khác; với ngôn ngữ khác, xác nhận giọng phù hợp trước khi tạo âm thanh. Bám kịch bản đã cung cấp; nếu file chưa có kịch bản, hãy chờ tôi nhập. Mở Remotion Studio để xem trước, dựng và xuất demo MP4 30 giây để tôi duyệt trước khi làm bản full. Nếu kịch bản ngắn hơn 30 giây, báo lại để tôi quyết định. Giữ nguyên tập mẫu và lưu tập mới vào thư mục riêng.
```

## Phong cách mặc định

- Khung hình 1080×1920, 30 fps.
- Nhân vật màu phẳng, viền đen; bối cảnh nhiều lớp với màu dịu.
- Khung comic, ô thoại và người kể áo xanh đứng ngoài khung.
- Với lời kể tiếng Việt: giọng Hải Đăng, tốc độ 95%. Nếu kịch bản dùng ngôn ngữ khác, chọn giọng phù hợp theo yêu cầu người dùng; bộ tạo giọng đi kèm hiện là công cụ cho tập mẫu tiếng Việt.

Trợ lý giữ phong cách nét vẽ và bố cục của tập mẫu, đồng thời điều chỉnh tạo hình theo chủ đề. Nhân vật và trang phục thời Trần chỉ là tài nguyên của tập mẫu, không bắt buộc dùng cho mọi tập. Bạn có thể yêu cầu đổi giọng, thời lượng hoặc cách trình bày trong kịch bản.

## Cài đặt và xem các tập mẫu

Cần Node.js 22 LTS và npm:

```powershell
npm ci
npm run dev
```

Mở [Remotion Studio](http://localhost:3041) và chọn composition muốn xem. Các tập có sẵn chỉ là tư liệu tham khảo:

Diên Hồng là ví dụ minh họa phong cách, không ấn định chủ đề hay ngôn ngữ cho các tập mới. `project.json` hiện là cấu hình xuất của ví dụ này.

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

## Kho mã nguồn và quyền sử dụng

Repo công khai: [bynne2602/history-vn](https://github.com/bynne2602/history-vn). Mã nguồn và tài nguyên cần dựng được đưa lên Git; `node_modules/`, `exports/`, cache và file môi trường được bỏ qua. MP4 không đi kèm khi clone repo.

Copyright (c) 2026 bynne2602. Dự án được cấp phép theo **GNU General Public License phiên bản 3 (GPL-3.0-only)**. Xem toàn văn tại [LICENSE](LICENSE).

Bạn được sử dụng, sửa đổi và phân phối theo GPLv3 mà không cần xin phép riêng. Khi phân phối bản sửa đổi hoặc tác phẩm phái sinh thuộc phạm vi GPL, bạn phải đáp ứng các yêu cầu của giấy phép, bao gồm cung cấp mã nguồn tương ứng cho người nhận, giữ các thông báo bản quyền và giấy phép, và ghi rõ các thay đổi. Phần mềm được cung cấp không kèm bảo hành theo điều khoản GPLv3.

Giấy phép áp dụng cho mã nguồn, tài liệu và tài nguyên gốc của dự án trong phạm vi quyền của chủ sở hữu. Thư viện, font và tài nguyên của bên thứ ba vẫn tuân theo giấy phép riêng của chúng. Tệp video do người dùng tạo không tự động thuộc GPL chỉ vì được dựng bằng công cụ này; quyền đối với nội dung và tài nguyên được đưa vào video vẫn cần được tuân thủ.

`private: true` trong package.json tiếp tục ngăn xuất bản nhầm gói lên npm; thiết lập này không thay đổi các quyền theo GPLv3 và không tự đổi chế độ riêng tư của repo GitHub.
