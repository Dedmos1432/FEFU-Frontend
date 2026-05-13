import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { ruRU } from "@mui/x-data-grid/locales";
import Container from "@mui/material/Container";
import videocardData from "../videocardTable";

export default function TableGrid() {
  const rows: GridRowsProp = videocardData;
  const columns: GridColDef[] = [
    { field: "Модель", headerName: "Название", flex: 1 },
    { field: "Производитель", flex: 0.5 },
    { field: "Цена ($)", flex: 0.5 },
    { field: "Видеопамять (ГБ)", flex: 0.5 },
    { field: "Энергопотребление (Вт)", flex: 0.5 },
    { field: "Мощность (баллы)", flex: 0.5 },
    { field: "Частота ядра (МГц)", flex: 0.5 },
    { field: "Потоковые процессоры" },
  ];
  return (
    <Container maxWidth="lg" sx={{ height: "700px", mt: "20px" }}>
      <DataGrid
        localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
        rows={rows}
        getRowId={(row) => row["Модель"]}
        columns={columns}
        showToolbar={true}
      />
    </Container>
  );
}
