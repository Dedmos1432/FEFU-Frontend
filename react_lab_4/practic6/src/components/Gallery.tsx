import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import videocards from "../data";
import { Link } from "react-router-dom";

const imgData = videocards.slice(0, 5);

export default function Gallery() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          height: {
            xs: "auto",
            md: 420,
          },
          m: "20px auto",
          display: "grid",

          gridTemplateColumns: {
            xs: "1fr",
            md: "2fr 2fr 1.5fr 1.5fr",
          },

          gridTemplateRows: {
            xs: "repeat(5, 220px)",
            md: "1fr 1fr",
          },

          gridTemplateAreas: {
            xs: `
              "img1"
              "img2"
              "img3"
              "img4"
              "img5"
            `,
            md: `
              "img1 img1 img2 img2"
              "img3 img3 img4 img5"
            `,
          },

          gap: 0,
          overflow: "hidden",
        }}
      >
        {imgData.map((item, index) => (
          <Box
            key={item.img}
            sx={{
              gridArea: `img${index + 1}`,
              position: "relative",
              width: "100%",
              height: "100%",
              overflow: "hidden",
            }}
          >
            <Link key={index} to={`/videocard/${index}`}>
              <ImageListItem
                component="div"
                sx={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  m: 0,
                  p: 0,
                  display: "block",
                  overflow: "hidden",
                }}
              >
                <img
                  srcSet={item.img}
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />

                <ImageListItemBar position="bottom" title={item.title} />
              </ImageListItem>
            </Link>
          </Box>
        ))}
      </Box>
    </Container>
  );
}
