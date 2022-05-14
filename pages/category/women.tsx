
import { ShopLayout } from "../../components/layouts";
import { Typography } from "@mui/material";
import { FullScreenLoading } from "../../components/ui";
import { ProductList } from "../../components/products";
import { useProducts } from '../../hooks/useProducts';


const WomenPage = () => {

  const { products, isLoading } = useProducts(`/products?gender=women`)

  return (
    <ShopLayout
      title={ "Teslo Shop | Mujeres" }
      pageDescription={ "Los mejores productos para Mujeres de Teslo Shop" }
    >
      <Typography variant="h1" component="h1">
        Tienda
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Productos para Mujeres 🥿  
      </Typography>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default WomenPage;
