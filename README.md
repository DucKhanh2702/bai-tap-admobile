# PawPals — Demo đặt lịch và quản lý chăm sóc thú cưng

## Run the app

For the Android app, follow [ANDROID.md](ANDROID.md). For a browser preview, run `npm install` and then `npm run dev`.

## Cấu trúc thư mục

```text
index.html       Khung giao diện và các điểm gắn màn hình
css/styles.css   Giao diện desktop, mobile và quảng cáo demo
js/data.js       Dữ liệu mẫu dịch vụ, sản phẩm và thú cưng
js/app.js        Điều hướng, hiển thị màn hình và xử lý tương tác
```

## Tính năng demo

- Tổng quan lịch hẹn, thú cưng và dịch vụ.
- Tạo, cập nhật hồ sơ thú cưng.
- Đặt lịch dịch vụ, xem và hủy lịch hẹn.
- Sổ sức khỏe, hồ sơ chăm sóc và nhắc lịch.
- Cửa hàng sản phẩm với giỏ hàng demo.
- Hồ sơ tài khoản và cài đặt thông báo.
- Banner quảng cáo cố định ở cuối màn hình.
- Quảng cáo xen kẽ trước khi chuyển màn hình; cần đóng quảng cáo mới tiếp tục. Quảng cáo được giới hạn một lần trong mỗi 3 phút.

## Android & AdMob

This project now includes a native Android app in `android/`, built with Capacitor and the Google Mobile Ads SDK. Follow `ANDROID.md` to install dependencies, sync the project, and run it from Android Studio. Google's official test ad IDs are configured for development; replace them with your group's AdMob IDs before release.
