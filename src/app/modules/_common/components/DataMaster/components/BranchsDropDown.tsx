import FormikDropdown, { FormikDropdownProps } from "../../CustomFormik/FormikDropdown";
import { useGetBranchs } from "../dataMasterApi";

type BranchsDropDownProps = Omit<
    FormikDropdownProps,
    "data" | "isLoading" | "valueFieldName" | "label" | "displayFieldName" | "filterSelectedOptions"
>;

const BranchsDropDown = ({ formik, ...props }: BranchsDropDownProps) => {
    const { data, isLoading } = useGetBranchs();

    return (
        <>
            <FormikDropdown
                data={ data?.data ?? []}
                label=""
                fullWidth
                {...props}
                formik={formik}
                displayFieldName="branchName"
                valueFieldName="branchId"
                isLoading={isLoading}
            />
        </>
    );
};

export default BranchsDropDown;
