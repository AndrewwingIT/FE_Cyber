import { Box, Typography, Button, Stack } from "@mui/material";

interface PriceCardProps {
  title: string;
  price: string;
  subPrice?: string;
  features: { text: string; active: boolean }[];
  highlight?: boolean;
}

const PriceCard: React.FC<PriceCardProps> = ({ title, price, subPrice, features, highlight }) => (
  <Box
    sx={{
      flex: 1,
      minWidth: 250,
      background: highlight ? "#1e293b" : "linear-gradient(135deg,#7dd3fc,#38bdf8)",
      color: highlight ? "#fff" : "#0f172a",
      borderRadius: 3,
      p: 3,
      boxShadow: highlight ? 6 : 2,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      border: highlight ? "2px solid #fff" : "none",
    }}
  >
    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
      {title}
    </Typography>
    <Typography variant="h3" sx={{ fontWeight: "bold", mb: 1 }}>
      {price}
      {subPrice && (
        <Typography component="span" variant="body1" sx={{ ml: 1 }}>
          {subPrice}
        </Typography>
      )}
    </Typography>
    <Stack spacing={1} sx={{ mb: 2, width: "100%" }}>
      {features.map((f, idx) => (
        <Typography
          key={idx}
          sx={{
            color: f.active ? (highlight ? "#fff" : "#0f172a") : "#94a3b8",
            textDecoration: f.active ? "none" : "line-through",
            fontSize: 16,
          }}
        >
          {f.active ? "✔️" : "❌"} {f.text}
        </Typography>
      ))}
    </Stack>
    <Button
      variant="contained"
      sx={{
        backgroundColor: "#f472b6",
        color: "#0f172a",
        fontWeight: "bold",
        borderRadius: "25px",
        mt: "auto",
        "&:hover": { backgroundColor: "#ec4899" },
      }}
    >
      Chọn gói đăng ký
    </Button>
  </Box>
);

export default PriceCard;