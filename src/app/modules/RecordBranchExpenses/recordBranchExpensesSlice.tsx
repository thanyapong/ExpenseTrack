import { RootState } from "../../../redux";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/** สร้าง Type ของ State และ Intitial State **/
export type RecordBranchExpensesState = {
    payeeList: Array<{
        customerCode?: number;
        customerName?: string;
        levelRoom?: string;
        identificationNo?: string;
        customerTypeId?: string;
        customerTypeName?: string;
        statusId?: string;
        statusName?: string;
        amount?: number;
    }>;

    paginated: {
        page?: number;
        recordsPerPage?: number;
        orderingField?: string;
        ascendingOrder?: boolean | undefined;
    };
};

const initialState: RecordBranchExpensesState = {
    payeeList: [],

    paginated: {
        page: 1,
        recordsPerPage: 99,
        orderingField: "",
        ascendingOrder: true,
    },
};

export type SetSearchValues = {
    customerCode?: number;
    customerName?: string;
    levelRoom?: string;
    identificationNo?: string;
    customerTypeId?: string;
    customerTypeName?: string;
    statusId?: string;
    statusName?: string;
    amount?: number;
};

export type SetPaginated = {
    page?: number;
    recordsPerPage?: number;
    orderingField?: string;
    ascendingOrder?: boolean;
};

const RecordBranchExpensesSlice = createSlice({
    name: "recordBranchExpenses",
    initialState,
    reducers: {
        // ฟังก์ชั่นเพื่อเพิ่มข้อมูลลงใน payeeList
        addPayee: (state, action: PayloadAction<SetSearchValues>) => {
            state.payeeList.push(action.payload); // ใช้ push เพื่อเพิ่มข้อมูลใหม่
        },

        // ฟังก์ชั่นลบข้อมูลใน payeeList ตาม identificationNo
        removePayee: (state, action: PayloadAction<string>) => {
            state.payeeList = state.payeeList.filter((payee) => payee.identificationNo !== action.payload); // ลบรายการที่ identificationNo ตรงกับค่าที่ส่งมา
        },

        updatePaginated: (state, action: PayloadAction<SetPaginated>) => {
            state.paginated = action.payload;
        },

        reset: () => initialState,
    },
});

// สร้าง Action จาก Slice
export const { addPayee, removePayee, updatePaginated } = RecordBranchExpensesSlice.actions;

export const selectRecordBranchExpensesSlice = (state: RootState) => state.recordBranchExpenses;
// สร้าง Reducer จาก Slice
export default RecordBranchExpensesSlice.reducer;
