import { FC, ReactNode, useEffect, useReducer, useRef } from "react";
import Cookie from 'js-cookie';
import { ICartProduct } from "../../interfaces";
import { CartContext, cartReducer } from "./";

interface Props {
  children: ReactNode;
}

export interface CartState {
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;
}

const Cart_INITIAL_STATE: CartState = {
  // cart: Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : [],
  cart: [],
  numberOfItems: 0,
  subTotal: 0,
  tax: 0,
  total: 0
};

export const CartProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, Cart_INITIAL_STATE);

  const isReloading = useRef(true)

  useEffect(() => {

    loadCartFromCookies()

  }, [])
  

  useEffect(() => {
  
    if (isReloading.current){
      
      isReloading.current = false;

    } else {
      
      Cookie.set('cart', JSON.stringify(state.cart));

    }

  }, [state.cart])

  useEffect(() => {
    const numberOfItems =  state.cart.reduce((prev, current) => prev + current.quantity ,0);
    const subTotal = state.cart.reduce((prev, current) =>  prev + (current.quantity * current.price) ,0)
    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0); 


    const orderSummary = {
      numberOfItems,
      subTotal,
      tax: subTotal * taxRate,
      total: subTotal + (subTotal * taxRate)
    }

    dispatch({
      type: '[Cart] - Update order summary',
      payload: orderSummary
    })

  },[state.cart])


  const loadCartFromCookies = () => {
    try {
      const cartItems:ICartProduct[] = JSON.parse(Cookie.get('cart') || '[]') 
  
      dispatch({
        type:'[Cart] - LoadCart from cookies | storage',
        payload: cartItems
      })
      
    } catch (error) {
      
      dispatch({
        type:'[Cart] - LoadCart from cookies | storage',
        payload: []
      })
    }
  }

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

  const updateCartQuantity = (product: ICartProduct) => {
    dispatch({
      type: '[Cart] - Update Cart Quantity',
      payload: product
    })
  }

  const removeProductToCart = (product: ICartProduct) => {
    dispatch({
      type:'[Cart] - Remove Product in cart',
      payload: product
    })
  }
  

  return (
    <CartContext.Provider
      value={{
        ...state,
        addProductToCart,
        updateCartQuantity,
        removeProductToCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
