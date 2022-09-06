import { configureStore, combineReducers } from "@reduxjs/toolkit";
import activitiesReducer from "./activities";
import countriesReducer from './countriesShow';


const reducer = combineReducers({
    activities: activitiesReducer,
    countriesShow: countriesReducer,
})

export const store = configureStore({
    reducer: reducer
})