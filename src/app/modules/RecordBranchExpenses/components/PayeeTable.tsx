import { Grid, LinearProgress } from "@mui/material";
import usePayeeTableHook from "./PayeeTable.hook";
import { StandardDataTable } from "../../_common";
import { defaultOptionStandardDataTable } from "../../_common/functionHelper";

const PayeeTable = () => {
    const { columns, payeeList, paginated, paginatedHandeler, tableData } = usePayeeTableHook();

    return (
        <Grid sx={{ mt: 3 }}>
            {!payeeList ? (
                <LinearProgress />
            ) : payeeList?.length > 0 ? (
                <StandardDataTable
                    name="payeeTable"
                    title=""
                    data={tableData ?? []}
                    // isLoading={!payeeList}
                    columns={columns}
                    paginated={paginated}
                    setPaginated={paginatedHandeler}
                    color="primary"
                    displayToolbar={false}
                    options={defaultOptionStandardDataTable}
                    displayFooter={false}
                />
            ) : (
                <></>
            )}
        </Grid>
    );
};

export default PayeeTable;
