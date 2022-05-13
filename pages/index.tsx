import type { NextPage } from "next";
import {
  Typography
} from "@mui/material";
import { ShopLayout } from "../components/layouts";
import { ProductList } from "../components/products";
import { FullScreenLoading } from "../components/ui";
import { useProducts } from "../hooks";

const Home: NextPage = () => {

  const { products, isLoading } = useProducts('/products');

  return (
    <ShopLayout
      title="Teslo-Shop - Home"
      pageDescription="Entra los mejores productos de Teslo Shop"
    >
      <Typography variant="h1" component="h1">
        Tienda
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Todos los Productos
      </Typography>

      {
        isLoading
          ? <FullScreenLoading/>
          : <ProductList products={ products } />
      }


    </ShopLayout>
  );
};

export default Home;
