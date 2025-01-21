import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import layoutSlice, { persistConfig } from "../app/layout/layoutSlice";
import recordBranchExpensesSlice from "../app/modules/RecordBranchExpenses/recordBranchExpensesSlice";

export const rootReducer = combineReducers({
    layout: persistReducer(persistConfig, layoutSlice),
    recordBranchExpenses: recordBranchExpensesSlice,
});
