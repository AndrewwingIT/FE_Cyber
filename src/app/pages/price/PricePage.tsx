import  { useState } from "react";
import { Box, Container, Typography, Stack, Button} from "@mui/material";
import Price from "../../../components/Pricing/Price";
import Header from "../../layouts/headers/Header";

const priceData = [
  {
    title: "FREE",
    price: "FREE",
    features: [
      { text: "Quyền truy cập vào các khóa học dành cho người mới bắt đầu.", active: true },
      { text: "Kiến thức cơ bản về nhận diện lừa đảo trực tuyến và thủ thuật lừa đảo.", active: true },
      { text: "Các bài thực hành tốt nhất để duyệt web an toàn.", active: true },
      { text: "Quyền truy cập diễn đàn cộng đồng.", active: false },
    ],
  },
  {
    title: "BASIC",
    price: "$28",
    subPrice: "/Tháng Hoặc $280 /năm",
    features: [
      { text: "Quyền truy cập vào các khóa học dành cho người mới bắt đầu.", active: true },
      { text: "Kiến thức cơ bản về nhận diện lừa đảo trực tuyến và thủ thuật lừa đảo.", active: true },
      { text: "Các bài thực hành tốt nhất để duyệt web an toàn.", active: true },
      { text: "Quyền truy cập diễn đàn cộng đồng.", active: true },
    ],
  },
  {
    title: "PLUS",
    price: "$35",
    subPrice: "/Tháng Hoặc $350 /năm",
    highlight: true,
    features: [
      { text: "Mọi thứ đều đơn giản.", active: true },
      { text: "Quyền truy cập vào các khóa học cấp độ trung cấp.", active: true },
      { text: "Hướng dẫn và danh sách kiểm tra có thể tải xuống.", active: true },
      { text: "Bản tin cảnh báo lừa đảo hàng tháng.", active: true },
      { text: "✔️ Chứng chỉ hoàn thành.", active: false },
    ],
  },
  {
    title: "PREMIUM",
    price: "$49",
    subPrice: "/Tháng Hoặc $490 /năm",
    features: [
      { text: "Tất cả những gì có trong gói Plus.", active: true },
      { text: "Quyền truy cập vào các khóa học cấp độ nâng cao.", active: true },
      { text: "Đánh giá rủi ro được cá nhân hóa.", active: true },
      { text: "Hỗ trợ hỏi đáp ưu tiên.", active: true },
      { text: "Tư vấn chuyên gia 1 kèm 1.", active: true },
    ],
  },
];

export default function PricePage() {
  const [plan, setPlan] = useState<"month" | "year">("month");

  return (
    <Box sx={{ minHeight: "100vh", background: "#f8fafc" }}>
      <Header />
      <Box sx={{ pt: 10, pb: 4 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3, textAlign: "center" }}>
            Bảng giá dịch vụ
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 4 }}>
            <Button
              variant={plan === "month" ? "contained" : "outlined"}
              onClick={() => setPlan("month")}
              sx={{
                backgroundColor: plan === "month" ? "#38bdf8" : undefined,
                color: "#0f172a",
                fontWeight: "bold",
                borderRadius: "20px",
              }}
            >
              Hàng tháng
            </Button>
            <Button
              variant={plan === "year" ? "contained" : "outlined"}
              onClick={() => setPlan("year")}
              sx={{
                backgroundColor: plan === "year" ? "#38bdf8" : undefined,
                color: "#0f172a",
                fontWeight: "bold",
                borderRadius: "20px",
              }}
            >
              Hàng năm
            </Button>
          </Stack>
          <Stack direction={{ xs: "column", md: "row" }} spacing={3} alignItems="stretch">
            {priceData.map((pkg) => (
              <Price
                key={pkg.title}
                title={pkg.title}
                price={pkg.price}
                subPrice={pkg.subPrice}
                features={pkg.features}
                highlight={pkg.highlight}
              />
            ))}
          </Stack>
        </Container>
      </Box>
      <Box sx={{ background: "#1e293b", py: 4, mt: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h5" sx={{ color: "#f472b6", fontWeight: "bold", textAlign: "center", mb: 1 }}>
            CYBER RAMPART
          </Typography>
          <Typography sx={{ color: "#fff", textAlign: "center", fontSize: 14 }}>
            Được cung cấp bởi FPTU, được xây dựng bởi Airborne Infantry | Bản quyền sử dụng
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
            {/* Icon social media ở đây nếu muốn */}
          </Box>
        </Container>
      </Box>
    </Box>
  );
}