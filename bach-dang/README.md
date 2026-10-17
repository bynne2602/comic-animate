# Tập tiếp theo — Bạch Đằng 1288

Giai đoạn hiện tại: demo mở đầu đúng 30 giây, 1080 × 1920 (9:16), 30 fps. Chưa dựng hoặc xuất bản full; xem demo trước theo yêu cầu.

Xem Studio: http://localhost:3041/BachDang-Demo-30s (khởi chạy bằng `npm run dev`).

Video: `exports/bach-dang-demo-30s.mp4`. Phụ đề: `bach-dang/demo-30s.srt`.

## Phong cách được giữ

Dùng trực tiếp `PortraitCast.tsx` và `DepthScenery.tsx` từ tập Diên Hồng: nền giấy ngà, khung truyện mực đen, nhân vật màu phẳng, hậu cảnh nhạt chia lớp, người kể áo xanh ngoài khung, ô thoại và cỡ phụ đề tương ứng tập gốc. Không tạo ảnh AI thay thế nhân vật. Cảnh sông, thuyền quân Nguyên và bãi cọc được vẽ bằng SVG cùng bảng màu. Hưng Đạo trong demo dùng nhân vật quân sĩ gốc, thêm áo choàng đỏ làm dấu hiệu phân biệt; đây là tạo hình minh họa.

Giọng Hải Đăng / VieNeu 3.8.3, atempo 0.95 giữ cao độ. Nhạc lấy từ tập gốc, giảm xuống 0.30 và thêm fade hai đầu. Không thay tài nguyên hoặc composition của tập Diên Hồng.

## Năm cảnh mở đầu

1. 0–6.567s: nối từ tiếng hô Diên Hồng sang thử thách mới.
2. 6.567–12.2s: đoàn thuyền quân Nguyên rút lui năm 1288.
3. 12.2–18s: Trần Hưng Đạo chọn khúc sông để bày trận.
4. 18–23.9s: bãi cọc được chuẩn bị; triều lên che khuất đầu cọc.
5. 23.9–30s: thuyền nhẹ nhử địch; dừng ở câu chờ đúng con nước.

## Tư liệu lịch sử

- Bảo tàng Lịch sử quốc gia, [Những chiếc cọc Bạch Đằng năm 1288](https://baotanglichsu.vn/VI/Articles/3096/18594/tim-hieu-ve-nhung-chiec-coc-bach-djang-nam-1288-hien-djang-trung-bay-o-bao-tang-lich-su-quoc-gia.html): bãi cọc, triều lên che đầu cọc, thuyền nhẹ khiêu chiến và nhử địch.
- Bảo tàng Lịch sử quốc gia, [Trận thủy chiến Bạch Đằng: Những mảnh ghép](https://baotanglichsuquocgia.vn/vi/Articles/3096/71341/tran-thuy-chien-bach-djang-nhung-manh-ghep.html): bối cảnh quân Nguyên rút lui và sự chuẩn bị của Trần Hưng Đạo.

Kịch bản là lời kể mới, không trích nguyên văn. Thuyền, bờ sông và đội hình cọc là minh họa kể chuyện, không phải bản phục dựng khảo cổ.

## Dựng lại demo

`node node_modules/@remotion/cli/remotion-cli.js render src/index.ts BachDang-Demo-30s exports/bach-dang-demo-30s.mp4 --codec=h264 --image-format=png --crf=16 --pixel-format=yuv420p --concurrency=2`

Tái tạo giọng (tùy chọn): dùng Python 3.11 + vieneu==3.8.3 chạy `bach-dang/build_demo_audio.py`, rồi Python 3.11 + faster-whisper chạy `bach-dang/align_demo.py`. Nếu dựng lại giọng thay đổi độ dài từng cảnh, cập nhật thời lượng JSX tại `BachDangDemo.tsx` theo `public/bachdang-demo/timeline.json`; tổng phải bằng 900 frame.
