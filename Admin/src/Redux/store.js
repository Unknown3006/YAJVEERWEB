  // src/redux/store.js
  import { configureStore } from '@reduxjs/toolkit';
  import CartSlice from "./CartSlice.js";
  import ReviewsSlice from "./Reviews.js";
  import ContactusSlice from "./Contactus.js";

  const store = configureStore({
    reducer: {
      cart: CartSlice,
      reviews: ReviewsSlice,
      contactus : ContactusSlice
    },
  });

  export default store;
