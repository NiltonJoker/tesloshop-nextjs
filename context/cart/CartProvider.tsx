import { FC, ReactNode, useReducer } from "react";
import { ICartProduct } from "../../interfaces";
import { CartContext, cartReducer } from "./";

interface Props {
  children: ReactNode;
}

export interface CartState {
  cart: ICartProduct[];
}

const Cart_INITIAL_STATE: CartState = {
  cart: [],
};

export const CartProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, Cart_INITIAL_STATE);

  const addProductToCart = (product: ICartProduct) => {

    const existInCart = state.cart.some(item => item._id === product._id && item.size === product.size)

    if(!existInCart) {
      return dispatch({
        type:'[Cart] - Update Product in cart',
        payload: [...state.cart, product]
      })
    }

    const updatedProducts = state.cart.map(item => {
      if(item._id === product._id && item.size === product.size){
        return {
          ...item,
          quantity: item.quantity + product.quantity
        }
      }
      return item
    })
  
    dispatch({
      type: '[Cart] - Update Product in cart',
      payload: updatedProducts
    })

  }
  

  return (
    <CartContext.Provider
      value={{
        ...state,
        addProductToCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
