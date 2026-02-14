import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSubscriptions = createAsyncThunk(
  "subscriptions/fetch",
  async () => {
    const res = await fetch('/api/subscriptions');
    return res.json();
  }
);

export const addSubscription = createAsyncThunk(
  "subscriptions/add",
  async () => {
    const res = await fetch('/api/subscriptions', { method: 'POST' });
    return res.json();
  }
);

export const cancelSubscription = createAsyncThunk(
  "subscriptions/cancel",
  async () => {
    const res = await fetch('/api/subscriptions', { method: 'PATCH' });
    return res.json();
  }
);

type Subscription = {
  id: string;
  status: 'active' | 'cancelled';
};

type SubscriptionsState = {
  data: Subscription[];
  loading: boolean;
  activeCount: number;
};

const initialState: SubscriptionsState = {
  data: [],
  loading: false,
  activeCount: 0
};

const subscriptionsSlice = createSlice({
  name: 'subscriptions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubscriptions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSubscriptions.fulfilled, (state, action) => {
        state.data = action.payload;
        state.activeCount = action.payload.filter(
          (s: Subscription) => s.status === 'active'
        ).length;
        state.loading = false;
      }).addCase(addSubscription.fulfilled, (state, action) => {
         state.data.push(action.payload);
         state.activeCount = state.data.filter(s => s.status === 'active').length;
      }).addCase(cancelSubscription.fulfilled, (state, action) => {
         if (action.payload) {
           const sub = state.data.find(s => s.id === action.payload.id);
           if (sub) sub.status = 'cancelled';
           state.activeCount = state.data.filter(s => s.status === 'active').length;
         }
      });
  }
});

export default subscriptionsSlice.reducer;
