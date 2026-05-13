import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import videocards from "../data";
import BuildCard from "./BuildCard";
import BuildCardHorizontal from "./BuildCardHorizontal";

const cardData = [
  videocards[3],
  videocards[6],
  videocards[8],
  videocards[7],
  videocards[1],
  videocards[2],
  videocards[5],
  videocards[4],
];

const verticalCards = cardData.slice(0, 4);
const horizontalCards = cardData.slice(4, 8);

export default function Content() {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "1fr 1fr",
              },
              gap: 3,
              alignItems: "start",
            }}
          >
            {verticalCards.map((item, index) => (
              <Box key={index}>
                <BuildCard building={item} cardNumber={index} />
              </Box>
            ))}
          </Box>
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              height: "100%",
            }}
          >
            {horizontalCards.map((item, index) => (
              <BuildCardHorizontal
                key={index}
                building={item}
                cardNumber={index}
              />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
