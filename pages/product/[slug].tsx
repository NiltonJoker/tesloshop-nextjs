import { Box, Button, Chip, Grid, Typography } from "@mui/material";
import {
  NextPage,
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
} from "next";

import { ShopLayout } from "../../components/layouts/ShopLayout";
import { ProductSlideshow, SizeSelector } from "../../components/products";
import { ItemCounter } from "../../components/ui";
import { dbProducts } from "../../database";
import { IProduct } from "../../interfaces";


interface Props {
  product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {
  // const router = useRouter()
  // const { products: product, isLoading } = useProducts<IProduct>(`/products/${router.query.slug}`)

  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideshow images={product.images} />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Box display="flex" flexDirection="column">
            {/* titles */}
            <Typography variant="h1" component="h1">
              {product.title}
            </Typography>
            <Typography variant="subtitle1" component="h2">
              ${product.price}
            </Typography>

            {/* Quantity */}
            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle2">Cantidad</Typography>
              <ItemCounter />
              <SizeSelector
                selectedSize={product.sizes[0]}
                sizes={product.sizes}
              />
            </Box>

            {/* Add to cart */}
            <Button color="secondary" className="circular-btn">
              Agregar al carrtio
            </Button>

            {/* <Chip label="No hay disponibles" color="error" variant="outlined"  /> */}

            {/* Description */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2">Descripcion:</Typography>
              <Typography variant="body2">{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const slugs = await dbProducts.getAllProductSlugs();

  return {
    paths: slugs.map(({ slug }) => ({ params: { slug } })),
    fallback: "blocking",
  };
};


export const getStaticProps: GetStaticProps = async ({ params }) => {

  const { slug = '' } = params as { slug: string }

  const product = await dbProducts.getProductBySlug(slug)

  if(!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      product
    },
    revalidate: 86400
  }
}

// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//   const { slug = '' } = params as { slug: string };
//   const product = await dbProducts.getProductBySlug(slug)

//   if(!product){
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false
//       }
//     }
//   }

//   return {
//     props: {
//       product
//     }
//   }
// }

export default ProductPage;
