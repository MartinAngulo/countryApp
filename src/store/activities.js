import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiConfig from '../config/api';
import axios from 'axios';

export const createActivity = createAsyncThunk('activities/create', async (activityData, thunkAPI) => {
    const data = await axios.post(`${apiConfig.api_domain}/activities`, activityData);
    return data.data;
})

export const getActivity = createAsyncThunk('activities/getAll', async (thunkAPI) => {
    const data = await axios.get(`${apiConfig.api_domain}/activities`);
    return data.data;
});

export const removeActivity = createAsyncThunk('activities/remove', async (idAct, thunkAPI) => {
    const data = await axios.get(`${apiConfig.api_domain}/activities/delete/idAct`);
    return data.data;
})

const activitiesSlice = createSlice({
    name: "activities",
    initialState: {
        status: 'not_loaded',
        postStatus: 'not_loaded',
        charge: false,
        activities: [],
        deleteStatus: 'false'
    },
    reducers: {
        addCharge: (state) => {
            state.charge = true;
        },
        resetCharge: (state) => {
            state.charge = false
        }
    },
    extraReducers: {
        [createActivity.fulfilled]: (state, action) => {
            state.status = 'success';
        },
        [createActivity.rejected]: (state, action) => {
            state.postStatus = action.payload;
        },
        [getActivity.fulfilled]: (state, action) => {
            state.activities = action.payload;
        },
        [getActivity.rejected]: (state, action) => {
            state.status = 'rejected';
        },
        [removeActivity.fulfilled]: (state, action) => {
            state.deleteStatus = true;
        },
    }
});

export const { addCharge, resetCharge } = activitiesSlice.actions;

export default activitiesSlice.reducer;