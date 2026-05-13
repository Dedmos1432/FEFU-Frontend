import { Box, Container, Typography, Breadcrumbs } from "@mui/material";
import Navbar from "../components/Navbar";
import { Link, useParams } from "react-router-dom";
import videocards from "../data";

export default function Videocard() {
  const { id } = useParams();
  const data = videocards[Number(id)];
  return (
    <>
      <Navbar active="1" />

      <Container maxWidth="xl" sx={{ mt: 3, mb: 5 }}>
        <Breadcrumbs
          aria-label="breadcrumb"
          sx={{
            mb: 3,
            fontSize: {
              xs: "12px",
              sm: "14px",
            },
          }}
        >
          <Link color="info.main" to="/">
            Главная
          </Link>

          <Typography
            color="text.primary"
            sx={{
              fontSize: {
                xs: "12px",
                sm: "14px",
              },
              fontWeight: 500,
            }}
          >
            {data.title}
          </Typography>
        </Breadcrumbs>

        <Typography
          variant="h4"
          component="h1"
          sx={{
            textAlign: "center",
            color: "text.secondary",
            mb: 3,
            fontSize: {
              xs: "24px",
              sm: "30px",
              md: "36px",
            },
          }}
        >
          {data.title}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 4,
          }}
        >
          <Box
            component="img"
            src={data.img}
            alt={data.title}
            sx={{
              width: {
                xs: "100%",
                sm: "80%",
                md: "50%",
                lg: "38%",
              },
              maxHeight: {
                xs: 300,
                sm: 420,
                md: 500,
              },
              objectFit: "cover",
              display: "block",
            }}
          />
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "1fr 1fr",
            },
            columnGap: 5,
            rowGap: 3,
          }}
        >
          {data.description.map((text, index) => (
            <Typography
              key={index}
              sx={{
                fontSize: {
                  xs: "14px",
                  sm: "15px",
                  md: "16px",
                },
                lineHeight: 1.6,
                textAlign: "justify",
              }}
            >
              {text}
            </Typography>
          ))}
        </Box>
      </Container>
    </>
  );
}
