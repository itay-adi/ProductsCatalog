import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './store'
import { Product } from '../Utils/DataModels'
import { initialProductsState } from '../Utils/data'

// Define a type for the slice state
interface ProductsState {
    productsArr: Product[]
}

const initialState: ProductsState = { productsArr: initialProductsState }

const productsSlice = createSlice({
    name: 'products',
    initialState: initialState,
    reducers: {
        addProduct(state: ProductsState, newProduct: { payload: Product }) {
            state.productsArr = [newProduct.payload, ...state.productsArr]
        },

        removeProduct(state: ProductsState, idToRemove: { payload: number}) {
            state.productsArr = [...state.productsArr.filter((product: Product) => product.id !== idToRemove.payload)]
        },

        setNewArray(state: ProductsState, newArray: { payload: Product[]}) {
            state.productsArr = newArray.payload
        }
    }
})

export const productsActions = productsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectProducts = (state: RootState) => state.products.productsArr

export default productsSlice.reducer