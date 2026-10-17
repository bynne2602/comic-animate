# Lịch sử Việt

Repo mẫu để dựng phim lịch sử Việt từ **kịch bản do người dùng cung cấp**. Tập Diên Hồng là mẫu tham chiếu: comic dọc 1080×1920, 30 fps, người kể đứng ngoài khung, bối cảnh chia lớp, lời thoại căn giữa ô. Giọng mẫu: **Hải Đăng (mẫu 10), tốc độ 95%**.

## Tạo tập mới từ kịch bản của bạn

1. Nhập kịch bản vào [`episode/script.md`](episode/script.md), hoặc gửi trực tiếp trong cuộc trò chuyện. Người dùng tự quyết định chủ đề và nội dung lời kể.
2. Yêu cầu dựng tập từ kịch bản đó. Nếu chưa có kịch bản, công cụ cần chờ người dùng cung cấp; không tự chọn sự kiện hoặc viết sẵn tập tiếp theo.
3. Dựng demo 30 giây khổ 9:16 trước, giữ phong cách của `example/` và các thành phần hình ảnh gốc trong `src/`.
4. Sau khi người dùng duyệt demo, mới dựng bản full theo kịch bản đã nhận.

File kịch bản là đầu vào cho quy trình dựng với trợ lý; việc lưu file không tự tạo giọng, hoạt cảnh hoặc video. `npm run dev` mở các composition đã có; `npm run render` hiện xuất lại tập mẫu Diên Hồng theo `project.json`.

## Cài và chạy

Yêu cầu Node.js 22 LTS và npm. Bản MP4 đã xuất nằm trong `exports/` của gói bàn giao.

```powershell
npm ci
npm run dev
```

Xem MP4 có sẵn: `npm run preview`. Xuất lại: `npm run render` (cần FFmpeg trong PATH). Lệnh xuất dùng một luồng để hạn chế thiếu RAM; không tự đổi giọng hoặc thời gian cảnh.

Mã nguồn và tài nguyên đang dùng được quản lý bằng Git. `exports/`, bộ nhớ đệm, `node_modules/` và tệp môi trường được bỏ qua. File MP4 kèm gói ZIP là thành phẩm, không phải tài nguyên cần để dựng lại. Clone chỉ chứa nguồn vẫn xuất lại được sau `npm ci`.

Đây là repo riêng, không dùng liên kết tới thư mục 26flow, node_modules hay tài nguyên của repo bên cạnh. GitHub riêng tư: https://github.com/bynne2602/history-vn. Không kèm khóa API, model cache hoặc công cụ cá nhân của máy dựng.

## Quyền sử dụng

Repo giữ `private: true` và `UNLICENSED`; không tự cấp phép công khai cho toàn bộ tác phẩm. Thư viện, font và tư liệu lịch sử có điều kiện sử dụng riêng. Xem ghi chú nguồn đi kèm trước khi tái phân phối.

## Cấu trúc và giọng đọc

- `src/`: nhân vật, cảnh, bố cục và entry độc lập.
- `public/dienhong-haidang/`: thoại, nhạc, khẩu hình và timeline đã chốt. Bản WAV nguồn ở93%; composition phát95/93 để đạt95%. Không tăng thêm lần nữa.
- `example/`: kịch bản, phụ đề95%, ghi chú và công cụ âm thanh.
- `episode/script.md`: chỗ nhập kịch bản tập mới; ban đầu để trống.
- `content/`: timeline/mẫu nhạc đầu vào để tái tạo âm thanh, không lấy từ repo cũ.

Không cần Python để xem hoặc xuất từ bộ âm thanh có sẵn. Nếu chủ động tạo lại giọng: Python3.11, FFmpeg; cài `example/requirements-voice.txt`, rồi lần lượt `npm run audio:generate`, `npm run audio:align`, `npm run audio:timing`. VieNeu tải model khi cần. Đây là bước tái tạo tùy chọn; chưa chạy lại khi tách repo.

Ghi chú `archive-README.md` lưu lịch sử các bản cũ; thông số hiện tại lấy ở README này và `project.json`.

## Demo đã có để tham khảo

**Bạch Đằng 1288**: demo 30 giây, 1080×1920, 30 fps; composition `BachDang-Demo-30s`. Dùng lại nhân vật, phong cách và giọng Hải Đăng 95% của tập Diên Hồng. Chạy `npm run dev`, chọn composition này để xem. Kịch bản, phụ đề, hướng dẫn dựng và ghi chú kiểm tra nằm trong `bach-dang/`. Chưa dựng bản full.

Demo này không ấn định chủ đề cho tập mới. Nội dung tập mới lấy từ kịch bản người dùng nhập.
