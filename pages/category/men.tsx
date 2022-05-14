
import { ShopLayout } from "../../components/layouts";
import { Typography } from "@mui/material";
import { FullScreenLoading } from "../../components/ui";
import { ProductList } from "../../components/products";
import { useProducts } from '../../hooks/useProducts';


const MenPage = () => {

  const { products, isLoading } = useProducts(`/products?gender=men`)

  return (
    <ShopLayout
      title={ "Teslo Shop | Hombres" }
      pageDescription={ "Los mejores productos para Hombres de Teslo Shop" }
    >
      <Typography variant="h1" component="h1">
        Tienda
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Productos para Hombres 👞 
      </Typography>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default MenPage;
