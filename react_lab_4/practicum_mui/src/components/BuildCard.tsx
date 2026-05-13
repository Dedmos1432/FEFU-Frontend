import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

interface ComponentProps {
  building: {
    img: string;
    title: string;
    description: string[];
  };
  cardNumber: number;
}

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textAlign: "justify",
  marginBottom: theme.spacing(1.5),
}));

export default function BuildCard({ building, cardNumber }: ComponentProps) {
  const reverse = cardNumber % 2 !== 0;

  return (
    <Card
      sx={{
        display: "flex",
        height: "100%",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <CardMedia
        component="img"
        alt={building.title}
        image={building.img}
        sx={{
          width: { xs: "100%", md: "35%" },
          objectFit: "cover",
        }}
      />

      <Box
        sx={{
          width: { xs: "100%", md: "65%" },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent sx={{ flex: 1 }}>
          <Typography gutterBottom variant="h5" component="div">
            {building.title}
          </Typography>

          {building.description.map((item, ind) => (
            <StyledTypography key={ind} variant="body2">
              {item}
            </StyledTypography>
          ))}
        </CardContent>

        <CardActions
          sx={{
            justifyContent: { xs: "center", md: reverse ? "end" : "start" },
            mt: "auto",
          }}
        >
          <Button size="small">Подробнее</Button>
        </CardActions>
      </Box>
    </Card>
  );
}
