import FormikDropdown, { FormikDropdownProps } from "../../CustomFormik/FormikDropdown";
import { useGetReceiveType } from "../claimMasterApi";

type ReceiveTypeDropDownProps = Omit<
    FormikDropdownProps,
    "data" | "isLoading" | "valueFieldName" | "label" | "displayFieldName" | "filterSelectedOptions"
>;

const ReceiveTypeDropDown = ({ formik, ...props }: ReceiveTypeDropDownProps) => {
    const { data, isLoading } = useGetReceiveType();

    return (
        <>
            <FormikDropdown
                data={data?.data ?? []}
                label="ผู้รับเอกสาร"
                fullWidth
                {...props}
                formik={formik}
                valueFieldName="receiveDocTypeId"
                displayFieldName="receiveDocTypeName"
                isLoading={isLoading}
            />
        </>
    );
};

export default ReceiveTypeDropDown;
