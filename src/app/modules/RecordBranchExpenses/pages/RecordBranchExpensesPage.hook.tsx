import { useFormik } from "formik";
import { z } from "zod";
import { useAuth } from "../../_auth";
import { zodTypes } from "../../_common/zodHelpers";

const useRecordBranchExpensesPageHook = () => {
    const { permissions, userProfile } = useAuth();
    const { branchId, employeeCode, fullName } = userProfile ?? {};

    const schema = z.object({
        receiveTypeId: zodTypes.number.supportDropdown({ numberErrorMessage: "กรุณาเลือก" }),
        totalAmount: zodTypes.number.coerce().refine(
            (value) => {
                if (value && (Number.isInteger(value) || value % 1 !== 0) && value !== 0) {
                    return true;
                } else return false;
            },
            {
                message: "กรุณากรอก",
            }
        ),
        detail: z.coerce.string().trim().min(1, "กรุณากรอก"),
    });

    // type Fields = z.infer<typeof schema> &
    //     DebtGroupForGenerateFeeBillRequestDto &
    //     DebtGroupMainForGenerateFeeBillInsertRequestDto;

    const defaultValue = {
        applicationCode: "",
        schoolYear: 2567,
        branchId: branchId,
        branchName: "",
        shcoolName: "",
        payeeAccountName: "",
        payeeBankId: 0,
        payeeBankName: "",
        payeeAccountNumber: "",
        serviceBranchId: 0,
        serviceBranchName: "",
        serviceByUserId: "",
        serviceByCode: "",
        serviceByName: "",
        totalAmount: 0,
        file: null,
        createdByUser: `${employeeCode} - ${fullName}`,
    };

    const formik = useFormik({
        initialValues: defaultValue,

        // validate: toFormikValidate(schema),

        onSubmit: (values) => {},
    });

    return { formik };
};

export default useRecordBranchExpensesPageHook;
