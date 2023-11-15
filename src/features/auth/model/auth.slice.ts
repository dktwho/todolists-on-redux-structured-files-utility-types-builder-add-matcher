import {createSlice, isAnyOf} from "@reduxjs/toolkit";
import {appActions} from "app/appSlice";
import {authAPI} from "features/auth/api/auth.api";
import {clearTasksAndTodolists} from "common/actions";
import {createAppAsyncThunk, handleServerAppError, handleServerNetworkError, thunkTryCatch} from "common/utils";
import {ResultCode} from "common/enums";
import {LoginParamsType} from "../api/auth.types";

const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>("auth/login", async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI;
        const res = await authAPI.login(arg);
        if (res.data.resultCode === ResultCode.Success) {
            return {isLoggedIn: true};
        } else {
            return rejectWithValue(res.data);
        }
});

const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, void>("auth/logout", async (_, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
        const res = await authAPI.logout();
        if (res.data.resultCode === ResultCode.Success) {
            dispatch(clearTasksAndTodolists());
            return {isLoggedIn: false};
        } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null);
        }
    });
});

const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }, void>("auth/initializeApp", async (_, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI;
    try {
        const res = await authAPI.me();
        if (res.data.resultCode === ResultCode.Success) {
            return {isLoggedIn: true};
        } else {
            return rejectWithValue(null);
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch);
        return rejectWithValue(null);
    } finally {
        dispatch(appActions.setAppInitialized({isInitialized: true}));
    }
});

const slice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addMatcher(
                isAnyOf(authThunks.login.fulfilled, authThunks.logout.fulfilled, authThunks.initializeApp.fulfilled),
                (state, action) => {
                    state.isLoggedIn = action.payload.isLoggedIn;
                });
    }
});

export const authSlice = slice.reducer;
export const authThunks = {login, logout, initializeApp};
