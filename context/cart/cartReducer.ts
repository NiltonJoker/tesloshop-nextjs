
import { ICartProduct } from '../../interfaces';
import { CartState } from './';

type CartActionType = 
 | { type: '[Cart] - LoadCart from cookies | storage', payload: ICartProduct[] }
 | { type: '[Cart] - Update Product in cart', payload: ICartProduct[] }
 | { type: '[Cart] - Update Cart Quantity', payload: ICartProduct }
 | { type: '[Cart] - Remove Product in cart', payload: ICartProduct }
 | { 
    type: '[Cart] - Update order summary', 
    payload: {
      numberOfItems: number;
      subTotal: number;
      tax: number;
      total: number;
    } 
  }

export const cartReducer = (state: CartState, action: CartActionType): CartState => {

  switch (action.type) {
    case '[Cart] - LoadCart from cookies | storage' :
      return {
        ...state,
        cart: [...action.payload]
      }
    
    case '[Cart] - Update Product in cart':
      return {
        ...state,
        cart: [...action.payload]
      }
    
    case '[Cart] - Update Cart Quantity':
      return {
        ...state,
        cart: state.cart.map(item => {
          if(item._id !== action.payload._id) return item;
          if(item.size !== action.payload.size) return item;

          return action.payload
        })
      }
    
    case '[Cart] - Remove Product in cart':
      return {
        ...state,
        cart: state.cart.filter(item => !(item._id === action.payload._id && item.size === action.payload.size))
      }

    case '[Cart] - Update order summary':
      return {
        ...state,
        ...action.payload
      }
    default:
      return state;
  }
  
}