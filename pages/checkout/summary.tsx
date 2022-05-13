import NextLink from 'next/link'
import {
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  Box,
  Button,
  Link,
} from "@mui/material";
import { CartList, OrderSummary } from "../../components/cart";
import { ShopLayout } from "../../components/layouts/ShopLayout";

const SummaryPage = () => {
  return (
    <ShopLayout
      title={"Resumen de Orden"}
      pageDescription={"Resumen de la orden"}
    >
      <Typography variant="h1" component="h1">
        Resumen de la Orden
      </Typography>

      <Grid container sx={{ mt: 2 }} spacing={2}>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Resumen (3 productos)</Typography>
              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent='space-between' >
                <Typography variant='subtitle1' >Direccion de entrega</Typography>
                <NextLink href={`/checkout/address`} passHref>
                  <Link underline='always'>
                   Editar
                  </Link>
                </NextLink>
              </Box>

              <Typography >Nilton Riega</Typography>
              <Typography >En algun lugar</Typography>
              <Typography >RandomCity, 17129</Typography>
              <Typography >Peru</Typography>
              <Typography >+51 999999999</Typography>


              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent='end' >
                <NextLink href={`/cart`} passHref>
                  <Link underline='always'>
                   Editar
                  </Link>
                </NextLink>
              </Box>

              <OrderSummary/>

              <Box sx={{ mt: 3 }}>
                <Button color="secondary" className="circular-btn" fullWidth>
                  Confirmar Orden
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default SummaryPage;
