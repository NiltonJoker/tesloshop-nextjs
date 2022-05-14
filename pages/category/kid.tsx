import { ShopLayout } from "../../components/layouts";
import { Typography } from "@mui/material";
import { FullScreenLoading } from "../../components/ui";
import { ProductList } from "../../components/products";
import { useProducts } from '../../hooks/useProducts';


const KidPage = () => {

  const { products, isLoading } = useProducts(`/products?gender=kid`)

  return (
    <ShopLayout
      title={ "Teslo Shop | Niños" }
      pageDescription={ "Los mejores productos para Niños de Teslo Shop" }
    >
      <Typography variant="h1" component="h1">
        Tienda
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Productos para Niños 🧒  
      </Typography>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default KidPage;
