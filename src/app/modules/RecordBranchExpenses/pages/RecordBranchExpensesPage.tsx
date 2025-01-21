import MainPaper from "../../_common/components/ProjectDesign/MainPaper";
import MainAlertText from "../../_common/components/ProjectDesign/MainAlertText";
import SchoolDetails from "../components/SchoolDetails";
import useRecordBranchExpensesPageHook from "./RecordBranchExpensesPage.hook";
import ExpenseDetails from "../components/ExpenseDetails";

const RecordBranchExpensesPage = () => {
    const { formik } = useRecordBranchExpensesPageHook();

    return (
        <MainPaper>
            <MainAlertText
                headerText={"หมายเหตุ : "}
                text={"ไม่สามารถบันทึกรายการที่สิ้นสุดคุ้มครองแล้วได้"}
                // marginTop={10}
            />
            <SchoolDetails formik={formik} />
            <ExpenseDetails formik={formik} />
        </MainPaper>
    );
};

export default RecordBranchExpensesPage;
