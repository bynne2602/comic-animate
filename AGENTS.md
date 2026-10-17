# Quy trình dựng tập mới

- Đây là repo phim lịch sử Việt. Người dùng chọn chủ đề và cung cấp kịch bản trong cuộc trò chuyện hoặc `episode/script.md`.
- Nếu file chỉ có tiêu đề, gợi ý hoặc comment mẫu và cuộc trò chuyện chưa có kịch bản, hãy yêu cầu người dùng nhập kịch bản rồi chờ. Không tự chọn sự kiện lịch sử, viết lời kể hoặc tạo tập tiếp theo từ mẫu có sẵn. Chỉ viết hay biên tập kịch bản khi người dùng yêu cầu rõ việc đó.
- `example/` chứa tập Diên Hồng để tham khảo. `bach-dang/` và `src/bach-dang/` là demo đã có, không phải chủ đề mặc định cho tập tiếp theo. Không ghi đè các tập mẫu khi dựng tập mới.
- Bám lời kể và thứ tự nội dung người dùng cung cấp. Có thể chia cảnh, căn phụ đề và thiết kế chuyển động; không tự thêm sự kiện, lời thoại hoặc kết luận làm đổi nội dung. Nếu cần thay đổi nội dung để chính xác, hãy nêu đề xuất cho người dùng.
- Dùng Remotion; giữ khổ 1080×1920 (9:16), 30 fps và phong cách minh họa của tập gốc: bộ nhân vật `src/PortraitCast.tsx`, nền nhiều lớp `src/DepthScenery.tsx`, khung comic, người kể áo xanh ngoài khung. Giọng mặc định Hải Đăng, tốc độ 95%, trừ khi người dùng yêu cầu khác.
- Dựng và kiểm tra demo 30 giây trước. Nếu kịch bản ngắn hơn 30 giây, không tự thêm lời hay lặp cảnh để đủ thời lượng; báo rõ độ dài và xin hướng xử lý. Chỉ dựng bản full sau khi người dùng duyệt demo hoặc yêu cầu rõ bỏ qua bước duyệt.
- Đọc các skill Remotion phù hợp trước khi sửa composition. Mở Studio trước khi chỉnh hình; kiểm tra hình ảnh trong Studio và các frame của MP4 khi xuất. Không coi build hoặc kiểm tra codec là bằng chứng đã đạt yêu cầu hình ảnh.
