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
  color: "#009b5a",
  textAlign: "left",
  marginBottom: theme.spacing(1.5),
  fontSize: "21px",
  lineHeight: 1.5,
}));

export default function BuildCard({ building, cardNumber }: ComponentProps) {
  return (
    <Card
      sx={{
        height: "100%",
        maxWidth: 450,
        backgroundColor: "#202529",
        border: "1px solid #009b5a",
        borderRadius: "24px",
        boxShadow: "none",
        display: "flex",
        flexDirection: "column",
        p: 3,
      }}
    >
      <CardContent
        sx={{
          p: 0,
          flex: 1,
        }}
      >
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{
            color: "#009b5a",
            fontSize: "30px",
            lineHeight: 1.2,
            mb: 3,
          }}
        >
          {building.title}
        </Typography>

        {building.description.map((item, ind) => (
          <StyledTypography key={ind} variant="body2">
            {item}
          </StyledTypography>
        ))}

        <Box
          sx={{
            mt: 3,
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            overflow: "hidden",
            height: 300,
          }}
        >
          <CardMedia
            component="img"
            alt={building.title}
            image={building.img}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              display: "block",
            }}
          />
        </Box>
      </CardContent>

      <CardActions
        sx={{
          justifyContent: "flex-end",
          p: 0,
          pt: 3,
        }}
      >
        <Button
          variant="contained"
          size="medium"
          sx={{
            fontSize: "20px",
            textTransform: "none",
            borderRadius: "5px",
            px: 2,
            py: 0.8,
          }}
        >
          Подробнее »
        </Button>
      </CardActions>
    </Card>
  );
}
