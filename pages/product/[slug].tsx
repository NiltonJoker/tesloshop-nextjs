import { Box, Button, Chip, Grid, Typography } from "@mui/material";
import {
  NextPage,
  GetStaticPaths,
  GetStaticProps,
} from "next";
import { useRouter } from "next/router";
import { useState, useContext } from 'react';

import { ShopLayout } from "../../components/layouts/ShopLayout";
import { ProductSlideshow, SizeSelector } from "../../components/products";
import { ItemCounter } from "../../components/ui";
import { dbProducts } from "../../database";
import { ICartProduct, IProduct, ISize } from "../../interfaces";
import { CartContext } from '../../context/cart/CartContext';

interface Props {
  product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {

  const router = useRouter();
  const { addProductToCart } = useContext(CartContext)

  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    image: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1,
  });

  const selectedSize = (size: ISize) => {
    setTempCartProduct({
      ...tempCartProduct,
      size
    })
  }

  const updatedQuantity = (quantity:number) => {
    setTempCartProduct({
      ...tempCartProduct,
      quantity
    })
  }

  const onAddProduct = () => {
    if(!tempCartProduct.size) return;
    
    addProductToCart(tempCartProduct);

    router.push('/cart')
  }
  
  

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
              <ItemCounter 
                currentValue={tempCartProduct.quantity}
                updatedQuantity={updatedQuantity}
                maxValue={product.inStock}
              />
              <SizeSelector
                selectedSize={tempCartProduct.size}
                sizes={product.sizes}
                onSelectedSize={selectedSize}
              />
            </Box>

            {/* Add to cart */}

            {product.inStock > 0 ? (
              <Button color="secondary" className="circular-btn" onClick={onAddProduct} >
                {tempCartProduct.size
                  ? "Agregar al carrtio"
                  : "Seleccione una talla"}
              </Button>
            ) : (
              <Chip
                label="No hay disponibles"
                color="error"
                variant="outlined"
              />
            )}

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
  const { slug = "" } = params as { slug: string };

  const product = await dbProducts.getProductBySlug(slug);

  if (!product) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
    revalidate: 86400,
  };
};

export default ProductPage;
