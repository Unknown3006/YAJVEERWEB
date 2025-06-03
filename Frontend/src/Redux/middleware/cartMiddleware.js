import { toast } from 'react-hot-toast';

export const cartMiddleware = store => next => action => {
  try {
    // List of actions that require authentication
    const protectedActions = ['cart/addToCart', 'cart/removeFromCart', 'cart/updateQuantity'];
    
    if (protectedActions.includes(action.type)) {
      const state = store.getState();
      const isAuthenticated = state.auth?.isAuthenticated; // Using isAuthenticated flag
      
      if (!isAuthenticated) {
        toast.error('Please login to manage cart items');
        return next({ ...action, type: 'cart/AUTH_REQUIRED' }); // Send a modified action
      }
    }
    
    return next(action);
  } catch (error) {
    console.error('Cart middleware error:', error);
    return next(action);
  }
};
