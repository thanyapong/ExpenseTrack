import FormikDropdown, { FormikDropdownProps } from "../../CustomFormik/FormikDropdown";
import { useGetProviceAll } from "../claimMasterApi";

type ProvincesDropDownProps = Omit<
    FormikDropdownProps,
    "data" | "isLoading" | "valueFieldName" | "label" | "displayFieldName" | "filterSelectedOptions"
>;

const ProvincesDropDown = ({ formik, ...props }: ProvincesDropDownProps) => {
    const { data, isLoading } = useGetProviceAll();

    return (
        <>
            <FormikDropdown
                data={data?.data ?? []}
                label="กรุณาเลือก"
                fullWidth
                {...props}
                formik={formik}
                valueFieldName="code"
                displayFieldName="detail"
                isLoading={isLoading}
            />
        </>
    );
};

export default ProvincesDropDown;
