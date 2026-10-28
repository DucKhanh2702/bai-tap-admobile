# PawPals cho Android

Dự án hiện dùng Capacitor để đóng gói giao diện web thành ứng dụng Android. Phần quảng cáo dùng SDK Google Mobile Ads thông qua plugin AdMob native.

## Mở lần đầu

1. Cài Node.js 22 trở lên và Android Studio có Android SDK API 24 trở lên.
2. Mở terminal trong thư mục dự án và chạy `npm install`.
3. Chạy `npm run android:sync` để biên dịch giao diện và đồng bộ vào project Android.
4. Mở thư mục `android` bằng Android Studio, chờ Gradle sync, chọn emulator hoặc điện thoại Android rồi nhấn Run.

Nếu Android Studio báo `invalid source release: 21`, vào **Settings → Build, Execution, Deployment → Build Tools → Gradle → Gradle JDK** và chọn JDK 21 đi kèm Android Studio. Project Capacitor hiện tại yêu cầu toolchain mới; JDK 17 trong terminal không đủ để build.

## Sửa giao diện trong VS Code

- Màn hình và xử lý thao tác: `js/app.js`
- Dữ liệu demo: `js/data.js`
- Giao diện: `css/styles.css`
- Cấu hình mã quảng cáo: `js/ad-config.js`

Sau khi sửa, chạy lại `npm run android:sync`, rồi bấm Run trong Android Studio để cập nhật app trên thiết bị.

## AdMob

App ID, banner ID và interstitial ID hiện dùng là mã test chính thức của Google. SDK AdMob native đã được cài vào Android project. Mã test hiển thị quảng cáo thử, không ghi nhận doanh thu. Trước khi phát hành, thay các mã này bằng App ID và Ad Unit ID trong tài khoản AdMob của nhóm:

- App ID Android: `android/app/src/main/res/values/strings.xml` (`admob_app_id`)
- Banner và interstitial: `js/ad-config.js`

Ứng dụng lấy consent qua UMP trước khi yêu cầu quảng cáo. Khi người dùng chuyển màn hình, app chỉ tiếp tục sau khi interstitial đóng; tần suất tối đa một lần mỗi ba phút. Nếu quảng cáo không tải được thì app tiếp tục để tránh bị kẹt ở màn hình chờ.
