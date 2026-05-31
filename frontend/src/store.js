import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
import cartSliceReducer from "./slices/cartSlice";

const store = configureStore({
  reducer: {
    // 1. DYNAMIC STORE KEY: We use [apiSlice.reducerPath] as the key here.
    // By default, this evaluates to 'api', matching the data compartment in our global state.
    //
    // 2. THE SECRET HANDSHAKE: When RTK Query automatically generates custom hooks
    // (like useGetUsersQuery) for your components, those hooks need to know exactly
    // WHERE in the global Redux store to look for cached network data.
    //
    // 3. WHY NO CUSTOM STRINGS? The auto-generated hooks are hardcoded to look at
    // whatever string is defined inside apiSlice.reducerPath. If you put a custom
    // string here (like 'myCustomApi'), the store will put the data in state.myCustomApi,
    // but your hooks will still blindly look for it in state.api—resulting in an
    // "undefined" crash. Using this variable guarantees the store and hooks stay perfectly synced.
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

/* The below is to sync the cart state with localStorage. 
Whenever the cart state changes, we update localStorage.
We do this here instead of inside the cartSlice reducers
to keep the slice reducers pure and focused on state updates only.
*/
let currentCart = store.getState().cart;
store.subscribe(() => {
  const nextCart = store.getState().cart;

  if (nextCart !== currentCart) {
    currentCart = nextCart;
    localStorage.setItem("cart", JSON.stringify(nextCart));
  }
});
/*...*/
export default store;
