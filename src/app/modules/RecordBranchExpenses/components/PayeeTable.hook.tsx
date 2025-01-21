import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux";
import { MUIDataTableColumn } from "mui-datatables";
import { cellAlignOptions } from "../../_common/functionHelper";
import { PaginationSortableDto } from "../../_common";
import { updatePaginated } from "../recordBranchExpensesSlice";

const usePayeeTableHook = () => {
    const dispatch = useAppDispatch();
    const { payeeList, paginated } = useAppSelector((state) => state.recordBranchExpenses);
    const [tableData, setTableData] = useState(payeeList ?? []); // Local state for table data

    // Update table data whenever payeeList changes
    useEffect(() => {
        setTableData(payeeList ?? []); // Update tableData with the latest payeeList
    }, [payeeList]);

    const paginatedHandeler: React.Dispatch<React.SetStateAction<PaginationSortableDto>> = (newPaginate) => {
        if (typeof newPaginate == "function") {
            dispatch(updatePaginated(newPaginate(paginated)));
        } else {
            let paginate = {
                ...paginated,
                ...newPaginate,
            };

            dispatch(updatePaginated(paginate));
        }
    };

    const columns: MUIDataTableColumn[] = [
        {
            name: "customerName",
            label: "ชื่อผู้เอาประกัน",
            options: {
                ...cellAlignOptions({ cellWhiteSpace: "nowrap" }),
                customBodyRender: (value) => {
                    return value ?? "-";
                },
            },
        },
        {
            name: "levelRoom",
            label: "ระดับชั้น",
            options: {
                ...cellAlignOptions({ align: "center", cellWhiteSpace: "nowrap" }),
                customBodyRender: (value) => {
                    return value ?? "-";
                },
            },
        },
        {
            name: "identificatiNo",
            label: "เลขบัตรประชาชน/Passport",
            options: {
                ...cellAlignOptions({ align: "center", cellWhiteSpace: "nowrap" }),
                customBodyRender: (value) => {
                    return value ?? "-";
                },
            },
        },
        {
            name: "customerName",
            label: "ประเภทผู้เอาประกัน",
            options: {
                ...cellAlignOptions({ align: "center", cellWhiteSpace: "nowrap" }),
                customBodyRender: (value) => {
                    return value ?? "-";
                },
            },
        },
        {
            name: " ",
            label: "ยอดเบิก",
            options: {
                ...cellAlignOptions({ cellWhiteSpace: "nowrap" }),
                customBodyRender: (value) => {
                    return value ?? "-";
                },
            },
        },
        {
            name: " ",
            label: " ",
            options: {
                ...cellAlignOptions({ cellWhiteSpace: "nowrap" }),
                customBodyRender: (value) => {
                    return value ?? "-";
                },
            },
        },
    ];

    return { columns, payeeList, paginated, paginatedHandeler, tableData };
};

export default usePayeeTableHook;
