import { createSlice } from '@reduxjs/toolkit';

const initialCounterState = { counter: 0, showCounter: true };
const name: string = 'counter'

const counterSlice = createSlice({
    name,
    initialState: initialCounterState,
    reducers: {
        increment(state) {
            state.counter++;
        },

        decrement(state) {
            state.counter--;
        },

        increase(state, action) {
            state.counter = state.counter + action.payload;
        },

        toggleCounter(state) {
            console.log(state.showCounter);
            state.showCounter = !state.showCounter;
        }
    }
});

export const counterActions = counterSlice.actions;
export default counterSlice.reducer;