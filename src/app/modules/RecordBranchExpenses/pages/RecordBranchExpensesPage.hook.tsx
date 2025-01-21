import { useFormik } from "formik";
import { z } from "zod";
import { useAuth } from "../../_auth";
import { zodTypes } from "../../_common/zodHelpers";
import { toFormikValidate } from "zod-formik-adapter";
import { DebtGroupForGenerateFeeBillRequestDto } from "../recordBranchExpensesApi";

const useRecordBranchExpensesPageHook = () => {
    const { permissions, userProfile } = useAuth();
    const { employeeCode, fullName } = userProfile ?? {};

    const schema = z.object({
        branchId: zodTypes.number.supportDropdown({ numberErrorMessage: "กรุณาเลือก" }),
        // totalAmount: zodTypes.number.coerce().refine(
        //     (value) => {
        //         if (value && (Number.isInteger(value) || value % 1 !== 0) && value !== 0) {
        //             return true;
        //         } else return false;
        //     },
        //     {
        //         message: "กรุณากรอก",
        //     }
        // ),
        // detail: z.coerce.string().trim().min(1, "กรุณากรอก"),
    });

    type Fields = z.infer<typeof schema> & DebtGroupForGenerateFeeBillRequestDto;

    // type Fields = z.infer<typeof schema> &
    //     DebtGroupForGenerateFeeBillRequestDto &
    //     DebtGroupMainForGenerateFeeBillInsertRequestDto;

    const defaultValue: Fields = {
        applicationCode: "",
        schoolYear: 2567,
        branchId: "",
        branchName: "",
        shcoolName: "",
        payeeAccountName: "",
        payeeBankId: undefined,
        payeeBankName: "",
        payeeAccountNumber: "",
        serviceBranchId: undefined,
        serviceBranchName: "",
        serviceByUserId: "",
        serviceByCode: "",
        serviceByName: "",
        totalAmount: 0,
        file: undefined,
        createdByUser: `${employeeCode} - ${fullName}`,
        zebraId: undefined,
        zebraName: "",
        receiveDocTypeId: 2,
        receiveDocTypeName: "",
        detail: [],
    };

    const formik = useFormik({
        initialValues: defaultValue,

        validate: toFormikValidate(schema),

        onSubmit: (values) => {},
    });

    return { formik };
};

export default useRecordBranchExpensesPageHook;
