import NextLink from "next/link";
import { Chip, Grid, Link, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

import { ShopLayout } from "../../components/layouts";
import RemoveRedEyeOutlined from "@mui/icons-material/RemoveRedEyeOutlined";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "fullname", headerName: "Nombre completo", width: 300 },
  {
    field: "paid",
    headerName: "Pagada",
    description: "Muestra la informacion si esta pagada o no",
    width: 200,
    renderCell: (params: GridValueGetterParams) => {
      return params.row.paid ? (
        <Chip color="success" label="Pagada" variant="outlined" />
      ) : (
        <Chip color="error" label="No pagada" variant="outlined" />
      );
    },
  },
  {
    field: "ordenUrl",
    headerName: "Ver orden",
    width: 200,
    sortable: false,
    renderCell: (params: GridValueGetterParams) => {
      return (
        <NextLink href={`/orders/${params.row.id}`} passHref>
          <Link display="flex" alignItems="center">
            <RemoveRedEyeOutlined sx={{ mr: 1 }} />
            <Typography variant="body2" >Ver Orden</Typography>
          </Link>
        </NextLink>
      );
    },
  },
];

const rows = [
  { id: 1, paid: true, fullname: "Nilton Riega" },
  { id: 2, paid: false, fullname: "Melissa Flores" },
  { id: 3, paid: false, fullname: "Fernando Herrera" },
  { id: 4, paid: true, fullname: "Hector Almonte" },
  { id: 5, paid: true, fullname: "Henrry Mendoza" },
];

const HistoryPage = () => {
  return (
    <ShopLayout
      title={"Historial de Ordenes"}
      pageDescription={"Historial de Ordenes del cliente"}
    >
      <Typography variant="h1" component="h1">
        Historial Ordenes
      </Typography>

      <Grid container>
        <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default HistoryPage;
