import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';


// export const add_banner = createAsyncThunk(
//   'banner/add_banner',
//   async (info, {fulfillWithValue,rejectWithValue}) => {
//     try {
//       const {data} = await api.post('/banner/add', info, {  withCredentials: true }); 
//       return fulfillWithValue(data)
//     } catch (error) {
//       console.log(error)
//       return rejectWithValue(error.message.data)
//     }
//   }
// );
export const add_banner = createAsyncThunk(
  'banner/add_banner',
  async (info, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.post('/banner/add', info, { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error);
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        return rejectWithValue(error.response.data);
      } else if (error.request) {
        console.log(error.request);
        return rejectWithValue("No response was received");
      } else {
        console.log('Error', error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);


export const update_banner = createAsyncThunk(
  'banner/update_banner',
  async (bannerId, {fulfillWithValue,rejectWithValue}) => {
    try {
      const {data} = await api.put(`/banner/update/${bannerId}`, { withCredentials: true }); 
      return fulfillWithValue(data)
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.message.data)
    }
  }
);
export const get_banners = createAsyncThunk(
  'banner/get_banners',
  async (productId, {fulfillWithValue,rejectWithValue}) => {
    try {
      const {data} = await api.get(`/banner/get/${productId}`, { withCredentials: true }); 
      return fulfillWithValue(data)
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.message.data)
    }
  }
);



export const bannerReducer = createSlice({
  name: 'category',
  initialState: {
    successMessage: '',
    errorMessage: '',
    loader: false,
    banners: [], 
    banner: "" 
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(add_banner.pending, (state) => {
        state.loader = true;
      })
      .addCase(add_banner.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload;
      })
      .addCase(add_banner.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        state.banner = payload.banner;
      })
      .addCase(update_banner.pending, (state) => {
        state.loader = true;
      })
      .addCase(update_banner.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload;
      })
      .addCase(update_banner.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
      })
  },
});

export const { messageClear } = bannerReducer.actions;
export default bannerReducer.reducer;
