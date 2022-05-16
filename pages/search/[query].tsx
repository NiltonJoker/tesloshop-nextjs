import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import { Box, Typography } from "@mui/material";
import { ShopLayout } from "../../components/layouts";
import { ProductList } from "../../components/products";
import { dbProducts } from "../../database";
import { IProduct } from "../../interfaces/products";

interface Props {
  products: IProduct[];
  foundProducts: boolean;
  query: string;
}

const SearchPage: NextPage<Props> = ({ products, foundProducts, query }) => {
  return (
    <ShopLayout
      title="Teslo-Shop - Search"
      pageDescription="Encuentra los mejores productos de Teslo Shop"
    >
      <Typography variant="h1" component="h1">
        Buscar Productos
      </Typography>
        {
          foundProducts
            ? <Typography variant="h2" sx={{ mb: 1 }} textTransform="capitalize" >Resultados: {query}</Typography>
            : (
              <Box display="flex">
                <Typography variant="h2" sx={{ mb: 1 }}>No se encontro ningun producto</Typography>
                <Typography variant="h2" sx={{ ml: 1 }} color="secondary">{query}</Typography>
              </Box>
            )
        }

      <ProductList products={products} />
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = "" } = params as { query: string };

  if (query.length === 0) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  // No hay productos
  let products = await dbProducts.getProductsByTerm(query);
  const foundProducts = products.length > 0;
  
  // TODO: Retornar otros productos

  if(!foundProducts) {
    // products = await dbProducts.getAllProducts()
    products = await dbProducts.getProductsByTerm('shirt');
  }

  return {
    props: {
      products,
      foundProducts,
      query,
    },
  };
};

export default SearchPage;
