# Diên Hồng — comic dọc

1080×1920, 9:16, 30 fps, 76,3 giây. Giọng Hải Đăng đã được người dùng chốt, tốc độ 0,93 so với mẫu gốc, giữ cao độ. Giữ nguyên nội dung lời kể và phụ đề đã căn cho giọng này.

## Thiết kế

Nhân vật mới trong `src/PortraitCast.tsx`, bố cục dọc trong `src/DienHongVertical.tsx`, entry `src/vertical-entry.ts`. Không cắt video ngang thành dọc. Không dùng ảnh tạo AI hay đưa ảnh tham khảo vào thành phẩm.

Tham khảo cơ chế hình từ các ảnh comic người dùng gửi: viền đen mềm, đầu lớn, tay chân gọn, bàn tay đơn giản, mắt chấm hoặc nửa khép, lông mày và miệng diễn mạnh; màu phẳng sáng; ô thoại và ô phản ứng. Nhân vật, y phục, dáng tóc, tình huống, lời thoại và cảnh vật được vẽ riêng cho lịch sử Diên Hồng. Không lấy nhân vật tóc hồng, logo, watermark hay tình huống trong mẫu.

Khung chính có lề; lời kể bên dưới tối đa hai dòng, giữ vùng an toàn màn hình dọc. Cảnh hội nghị có hai ô comic xếp trên/dưới. Các cảnh giơ tay và phản ứng dùng cận cảnh; đi đường, quân sĩ và chuẩn bị lương thảo dùng toàn cảnh.

## Xuất

```powershell
npx remotion studio src/vertical-entry.ts --no-open --port=3017
npx remotion render src/vertical-entry.ts DienHong-Vertical storytime-dien-hong-vertical/dien-hong-doc-1080x1920.mp4 --codec h264 --crf 17 --concurrency 6
```

## Bản người kể đứng ngoài khung
Thành phẩm mới: dien-hong-doc-nguoi-ke.mp4. Người kể có kính/áo xanh, đứng ngoài lớp clip của khung; viền trắng và bóng tạo lớp tiền cảnh. Miệng người kể theo năng lượng của bản thu (envelope50ms). Lời phụ đề nằm bên phải người kể. Nội dung trong khung do src/HistoryWorld.tsx dựng: nhà/cây/ruộng, sân điện/mái/cột/thềm/ngai, kho thóc/bao lương, sân tập/bia gỗ, sông/thuyền/người chèo. Các hành động đổi theo mốc lời kể, không dùng người kể thay nhân vật trong cảnh.


Bản cuối: dien-hong-doc-nguoi-ke-final.mp4. Phụ đề đặt cách tay người kể ở bên phải; khung cảnh chính có4 nhấn máy có chủ đích (câu hỏi, tiếng Đánh, lời quyết tâm và phần ý nghĩa).


## Nét mịn và tốc độ95%
Nguồn thoại93% được phát ở95/93 để đạt95% bản mẫu, giữ cao độ. Đồng hồ cảnh/khẩu hình/phụ đề nhân cùng tỷ lệ, thời lượng74,7giây. Xuấtmaster ởscale2 (2160×3840), khung PNG lossless và H.264 yuv444p CRF10; thu về1080×1920 bằng Lanczos, H.264 CRF14. Tệp phụ đề mới dien-hong-doc-95.srt. Cấu hình JPEG chung của các video khác không bị đổi.


## Tách lớp và căn ô thoại
DepthScenery.tsx tách hậu cảnh nhạt không viền, trung cảnh công trình gọn, mặt đất phối cảnh và tiền cảnh đậm đặt sau nhân vật trong thứ tự compositing. Bỏ đường lưới ruộng/sàn dày và cảnh kết chồng2nền. HistoryWorld Tag căn giữa theo hình chữ nhật thân ô, không tính phần đuôi thoại; áp dụng1và nhiều dòng. Cờ chuyển sang đạo cụ gắn cổ tay trong PortraitCast, đội hình3người thu gọn để tránh cắt bên phải. Giọng Hải Đăng95%, PNG4K→FullHD được giữ.


Bản hiện tại: dien-hong-doc-chieu-sau-95.mp4. Master: dien-hong-depth-95-master.mp4. Căn text dựa trên tâm thân ô, dominantBaseline middle, khoảng1.5đơn vị bù thị giác cho font chữ có dấu; đuôi bong bóng không tham gia tính tâm. Ba cờ cùng hệ tọa độ với cổ tay và dịch chuyển cùng nhân vật.

