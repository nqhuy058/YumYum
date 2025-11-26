
YumYum là một ứng dụng đặt đồ ăn hoàn chỉnh được xây dựng bằng React Native và Expo. Dự án này mô phỏng quy trình thực tế của một ứng dụng thương mại điện tử, từ việc xác thực người dùng, tìm kiếm nhà hàng, quản lý giỏ hàng phức tạp (với nhiều tùy chọn topping/size) đến theo dõi lịch sử đơn hàng và tích hợp bản đồ.

🚀 Tech Stack
Dự án sử dụng các công nghệ và thư viện hiện đại nhất trong hệ sinh thái React Native:

Core Framework: React Native, Expo SDK 54

Language: TypeScript

Navigation: Expo Router (File-based routing)

State Management: React Context API (Global state cho User & Cart)

Networking: Axios (với Interceptors xử lý token tự động)

UI & Animations:

React Native Reanimated (Hiệu ứng Sticky Header, Parallax)

React Native Gesture Handler

React Content Loader (Skeleton loading)

React Native SVG & Vector Icons

Forms & Validation: Formik, Yup

Map Integration: React Native WebView (Tích hợp Leaflet/OpenStreetMap)

Storage: AsyncStorage

🔥 Key Features (Tính năng chính)
1. Authentication & Security (Xác thực)
Đăng nhập/Đăng ký: Quy trình hoàn chỉnh với validation chặt chẽ.

Xác thực OTP: Màn hình nhập OTP gửi về email.

Quên mật khẩu: Luồng khôi phục mật khẩu qua email.

Auto-Login: Tự động đăng nhập dựa trên Token lưu trong AsyncStorage.

2. Home & Discovery (Khám phá)
Banner Carousel: Banner quảng cáo tự động chạy.

Bộ sưu tập (Collections): Danh sách nhà hàng theo tiêu chí (Best Seller, Top Rating).

Tìm kiếm thông minh: Tích hợp Debounce để tối ưu hóa API request khi tìm kiếm nhà hàng/món ăn.

3. Restaurant Detail & Ordering (Đặt món)
UI/UX nâng cao: Hiệu ứng Parallax Header và Sticky Search Bar khi cuộn danh sách món ăn.

Sticky Menu: Menu danh mục món ăn trượt theo nội dung (SectionList + Animated).

Giỏ hàng phức tạp: Xử lý logic thêm món với nhiều tùy chọn (Toppings, Size, Ghi chú). Tính toán tổng tiền real-time.

4. Checkout & User Profile
Xác nhận đơn hàng: Xem lại thông tin giao hàng, phương thức thanh toán.

Bản đồ: Chọn vị trí giao hàng trực quan trên bản đồ (sử dụng WebView để hiển thị OpenStreetMap).

Lịch sử đơn hàng: Theo dõi trạng thái đơn hàng (Active, Completed, Cancelled).

Quản lý tài khoản: Cập nhật thông tin cá nhân, đổi mật khẩu, cài đặt thông báo.


🛠 Installation & Setup
Clone the repository:
git clone https://github.com/nqhuy058/YumYum.git
cd yumyum

Install dependencies:
npm install

Environment Setup: Tạo file .env ở thư mục gốc và cấu hình địa chỉ IP Backend của bạn (hoặc sử dụng localhost nếu chạy giả lập):
EXPO_PUBLIC_API_URL=http://YOUR_IP_ADDRESS:8080
EXPO_PUBLIC_ANDROID_API_URL=http://10.0.2.2:8080
EXPO_PUBLIC_IOS_API_URL=http://YOUR_IP_ADDRESS:8080

Run the app:
npx expo start

📬 Contact
Author: Nguyễn Quang Huy

Email: nqhuy058@gmail.com

GitHub: nqhuy058