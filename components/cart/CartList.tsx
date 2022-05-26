import NextLink from "next/link";
import {
  Box,
  Button,
  CardActionArea,
  CardMedia,
  Grid,
  Link,
  Typography,
} from "@mui/material";

import { ItemCounter } from "../ui";
import { FC, useContext } from 'react';
import { CartContext } from '../../context/cart/CartContext';
import { ICartProduct } from '../../interfaces/cart';
interface Props {
  editable?: boolean
}

export const CartList:FC<Props> = ({ editable = false }) => {

  const { cart, updateCartQuantity, removeProductToCart } = useContext(CartContext)


  const onNewCartQuantityValue = (product: ICartProduct, newQuantityValue: number) => {

    product.quantity = newQuantityValue;

    updateCartQuantity(product)

  }

  const handleRemoveProduct = (product: ICartProduct) => {
    removeProductToCart(product)
  }
  
  

  return (
    <>
      {cart.map((product) => (
        <Grid container spacing={2} sx={{ mb: 1 }} key={`${product.slug}-${product.size}`}>
          <Grid item xs={3}>
            {/* Redirect to product page */}
            <NextLink href={`/product/${product.slug}`} passHref>
              <Link>
                <CardActionArea>
                  <CardMedia
                    image={`/products/${product.image}`}
                    component="img"
                    sx={{ borderRadius: "5px" }}
                  />
                </CardActionArea>
              </Link>
            </NextLink>
          </Grid>
          <Grid item xs={7}>
            <Box display="flex" flexDirection="column">
              <Typography variant="body1">{product.title}</Typography>
              <Typography variant="body1">
                Talla: <strong>{product.size}</strong>
              </Typography>

              {
                editable
                ? <ItemCounter currentValue={product.quantity} maxValue={10} updatedQuantity={(quantity) => onNewCartQuantityValue(product, quantity)} />
                : <Typography variant="h5" >{product.quantity} Product{product.quantity > 1 ? 'Productos' : 'Producto'}</Typography>
              }

            </Box>
          </Grid>
          <Grid
            display="flex"
            alignItems="center"
            flexDirection="column"
            item
            xs={2}
          >
            <Typography variant="subtitle1" >${product.price * product.quantity}</Typography>

            {
              editable && (
                <Button variant="text" color="secondary" onClick={() => handleRemoveProduct(product)} >
                  Remover
                </Button>
              )
            }
          </Grid>
        </Grid>
      ))}
    </>
  );
};
