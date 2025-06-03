import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';

const loadCartState = () => {
  try {
    const serializedState = localStorage.getItem('cart');
    return serializedState ? JSON.parse(serializedState) : [];
  } catch (err) {
    console.error('Failed to load cart state:', err);
    return [];
  }
};

const saveCartState = (items) => {
  try {
    localStorage.setItem('cart', JSON.stringify(items));
  } catch (err) {
    console.error('Failed to save cart state:', err);
  }
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (args, thunkAPI) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER}/api/v1/products/`);
      const data = await response.json();
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    data: [], // Products data
    items: loadCartState(), // Cart items
    loading: false,
    error: null,
  },    reducers: {
        addToCart: (state, action) => {
            const { item, quantity = 1 } = action.payload;
            const existingItem = state.items.find(
                cartItem => cartItem._id === item._id && cartItem.selectedWeight === item.selectedWeight
            );

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                state.items.push({ ...item, quantity });
            }
            saveCartState(state.items);
            toast.success('Item added to cart');
        },
        removeFromCart: (state, action) => {
            const { _id, selectedWeight } = action.payload;
            state.items = state.items.filter(
                item => !(item._id === _id && item.selectedWeight === selectedWeight)
            );
            saveCartState(state.items);
            toast.success('Item removed from cart');
        },
        updateQuantity: (state, action) => {
            const { _id, selectedWeight, quantity } = action.payload;
            const item = state.items.find(
                item => item._id === _id && item.selectedWeight === selectedWeight
            );
            if (item) {
                item.quantity = Math.max(0, quantity);
                if (item.quantity === 0) {
                    state.items = state.items.filter(
                        i => !(i._id === _id && i.selectedWeight === selectedWeight)
                    );
                }
                saveCartState(state.items);
            }
        },
        clearCart: (state) => {
            state.items = [];
            saveCartState(state.items);
            toast.success('Cart cleared');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotal = (state) => 
    state.cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
export const selectCartItemsCount = (state) => 
    state.cart.items.reduce((count, item) => count + item.quantity, 0);

export const { addToCart, removeFromCart, updateQuantity, clearCart } = CartSlice.actions;
export default CartSlice.reducer;