import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../api/authService";

const user = JSON.parse(localStorage.getItem("user")!);

// interface Interface {
//    user: any;
//    isError: boolean;
//    isLoading: boolean;
//    isSuccess: boolean;
//    message: string;
// }
const initialState = {
   user: user ? user : null,
   isError: false,
   isLoading: false,
   isSuccess: false,
   message: "",
};

// Register user

export const register = createAsyncThunk(
   "auth/register",
   async (user: any, thunkAPI: any) => {
      try {
         return await authService.register(user);
      } catch (error: any) {
         const message =
            (error.respone &&
               error.respone.data &&
               error.respone.data.message) ||
            error.message ||
            error;
         return thunkAPI.rejectWithValue(message);
      }
   }
);

export const login = createAsyncThunk(
   "auth/login",
   async (user: any, thunkAPI: any) => {
      try {
         return await authService.login(user);
      } catch (error: any) {
         const message =
            (error.respone &&
               error.respone.data &&
               error.respone.data.message) ||
            error.message ||
            error;
         return thunkAPI.rejectWithValue(message);
      }
   }
);

export const logout = createAsyncThunk("auth/logout", async () => {
   return await authService.logout();
});

export const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {
      reset: (state) => {
         state.isLoading = false;
         state.isSuccess = false;
         state.isError = false;
         state.message = "";
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(register.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(register.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
         })
         .addCase(register.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
            // state.message = action.payload;
            state.user = null;
         })
         .addCase(login.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
         })
         .addCase(login.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
            // state.message = action.payload;
            state.user = null;
         })
         .addCase(logout.fulfilled, (state) => {
            state.user = null;
         });
   },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
