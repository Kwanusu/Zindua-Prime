import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

import { db, auth } from "@/firebase/config";


// Get authenticated user
const getCurrentUser = () => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("You must be logged in to use the cart.");
  }

  return user;
};


// ===============================
// FETCH CART
// ===============================

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",

  async (_, thunkAPI) => {
    try {
      const user = getCurrentUser();

      const cartRef = collection(
        db,
        "users",
        user.uid,
        "cart"
      );

      const snapshot = await getDocs(cartRef);

      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message
      );
    }
  }
);


// ===============================
// ADD TO CART
// ===============================

export const addToCart = createAsyncThunk(
  "cart/addToCart",

  async (product, thunkAPI) => {
    try {
      const user = getCurrentUser();

      const productRef = doc(
        db,
        "users",
        user.uid,
        "cart",
        String(product.id)
      );

      const cart = thunkAPI.getState().cart.items;

      const existingItem = cart.find(
        (item) => String(item.id) === String(product.id)
      );

      const quantity = existingItem
        ? existingItem.quantity + 1
        : 1;

      const cartItem = {
        id: product.id,
        title: product.title || product.name,
        price: Number(product.price),
        image: product.image,
        quantity,
      };

      await setDoc(productRef, cartItem);

      return cartItem;

    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message
      );
    }
  }
);


// ===============================
// REMOVE FROM CART
// ===============================

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",

  async (productId, thunkAPI) => {
    try {
      const user = getCurrentUser();

      const productRef = doc(
        db,
        "users",
        user.uid,
        "cart",
        String(productId)
      );

      await deleteDoc(productRef);

      return productId;

    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message
      );
    }
  }
);


// ===============================
// INCREASE QUANTITY
// ===============================

export const increaseQuantity = createAsyncThunk(
  "cart/increaseQuantity",

  async (productId, thunkAPI) => {
    try {
      const user = getCurrentUser();

      const cart = thunkAPI.getState().cart.items;

      const item = cart.find(
        (item) => String(item.id) === String(productId)
      );

      if (!item) {
        throw new Error("Cart item not found.");
      }

      const updatedItem = {
        ...item,
        quantity: item.quantity + 1,
      };

      const productRef = doc(
        db,
        "users",
        user.uid,
        "cart",
        String(productId)
      );

      await setDoc(productRef, updatedItem);

      return updatedItem;

    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message
      );
    }
  }
);


// ===============================
// DECREASE QUANTITY
// ===============================

export const decreaseQuantity = createAsyncThunk(
  "cart/decreaseQuantity",

  async (productId, thunkAPI) => {
    try {
      const user = getCurrentUser();

      const cart = thunkAPI.getState().cart.items;

      const item = cart.find(
        (item) => String(item.id) === String(productId)
      );

      if (!item) {
        throw new Error("Cart item not found.");
      }

      // Remove item if quantity reaches zero
      if (item.quantity <= 1) {
        const productRef = doc(
          db,
          "users",
          user.uid,
          "cart",
          String(productId)
        );

        await deleteDoc(productRef);

        return {
          deleted: true,
          productId,
        };
      }

      const updatedItem = {
        ...item,
        quantity: item.quantity - 1,
      };

      const productRef = doc(
        db,
        "users",
        user.uid,
        "cart",
        String(productId)
      );

      await setDoc(productRef, updatedItem);

      return {
        deleted: false,
        item: updatedItem,
      };

    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message
      );
    }
  }
);


// ===============================
// CLEAR CART
// ===============================

export const clearCart = createAsyncThunk(
  "cart/clearCart",

  async (_, thunkAPI) => {
    try {
      const user = getCurrentUser();

      const cartRef = collection(
        db,
        "users",
        user.uid,
        "cart"
      );

      const snapshot = await getDocs(cartRef);

      await Promise.all(
        snapshot.docs.map((item) =>
          deleteDoc(item.ref)
        )
      );

      return [];

    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message
      );
    }
  }
);


// ===============================
// SLICE
// ===============================

const cartSlice = createSlice({
  name: "cart",

  initialState: {
    items: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {

    // FETCH CART
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })

      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });


    // ADD TO CART
    builder
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;

        const existingIndex = state.items.findIndex(
          (item) =>
            String(item.id) ===
            String(action.payload.id)
        );

        if (existingIndex >= 0) {
          state.items[existingIndex] =
            action.payload;
        } else {
          state.items.push(action.payload);
        }
      })

      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });


    // REMOVE
    builder
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;

        state.items = state.items.filter(
          (item) =>
            String(item.id) !==
            String(action.payload)
        );
      });


    // INCREASE
    builder
      .addCase(increaseQuantity.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.items.findIndex(
          (item) =>
            String(item.id) ===
            String(action.payload.id)
        );

        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });


    // DECREASE
    builder
      .addCase(decreaseQuantity.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload.deleted) {
          state.items = state.items.filter(
            (item) =>
              String(item.id) !==
              String(action.payload.productId)
          );

          return;
        }

        const index = state.items.findIndex(
          (item) =>
            String(item.id) ===
            String(action.payload.item.id)
        );

        if (index !== -1) {
          state.items[index] =
            action.payload.item;
        }
      });


    // CLEAR
    builder
      .addCase(clearCart.pending, (state) => {
        state.loading = true;
      })

      .addCase(clearCart.fulfilled, (state) => {
        state.loading = false;
        state.items = [];
      })

      .addCase(clearCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export default cartSlice.reducer;