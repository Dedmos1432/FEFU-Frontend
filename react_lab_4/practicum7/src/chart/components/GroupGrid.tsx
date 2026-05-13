import { tGroup } from "../groupdata";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { ruRU } from "@mui/x-data-grid/locales";
import Container from "@mui/material/Container";
type GroupProps = {
  data: tGroup;
};
export default function GroupGrid({ data }: GroupProps) {
  const rows: GridRowsProp = data;
  const columns: GridColDef[] = [
    { field: "Группа", headerName: "Группа", flex: 1 },
    { field: "Минимальная высота", flex: 0.5 },
    { field: "Максимальная высота", flex: 0.5 },
    { field: "Средняя высота", flex: 0.5 },
  ];
  return (
    <>
      <Container maxWidth="lg" sx={{ height: "700px", mt: "20px" }}>
        <DataGrid
          localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
          rows={rows}
          columns={columns}
          // showToolbar={true}
        />
      </Container>
    </>
  );
}
