import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import structures from "../../data";
import BuildCard from "./BuildCard";

const cardData = [structures[3], structures[6], structures[9], structures[7]];

export default function Content() {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={{ xs: 3, md: 6 }}>
        {cardData.map((item, index) => (
          <Grid key={index} size={{ xs: 12, md: 6 }}>
            <BuildCard building={item} cardNumber={index} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
