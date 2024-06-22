import { createSlice } from '@reduxjs/toolkit'

const initialAuthState = { isAuth: false}
const name: string = 'auth'

const authSlice = createSlice({
    name,
    initialState: initialAuthState,
    reducers: {
        login(state){
            state.isAuth = true;
        },

        logout(state){
            state.isAuth = false;
        }
    }
})

export const authActions = authSlice.actions
export default authSlice.reducer