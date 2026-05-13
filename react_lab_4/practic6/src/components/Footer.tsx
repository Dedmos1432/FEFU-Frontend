import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 5,
        py: 3,
        borderTop: "1px solid",
        borderColor: "divider",
        backgroundColor: "background.paper",
      }}
    >
      <Container maxWidth="xl">
        <Typography variant="body2" color="text.secondary" align="center">
          Я лучший!!
        </Typography>
      </Container>
    </Box>
  );
}
