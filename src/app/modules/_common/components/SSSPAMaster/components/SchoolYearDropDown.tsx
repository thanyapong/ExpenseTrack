import FormikDropdown, { FormikDropdownProps } from "../../CustomFormik/FormikDropdown";
import { useGetSchoolYear } from "../ssspaApi";

type SchoolYearDropDownProps = Omit<
    FormikDropdownProps,
    "data" | "isLoading" | "valueFieldName" | "label" | "displayFieldName" | "filterSelectedOptions"
>;

interface SchoolYear {
    year?: string | undefined;
}

const SchoolYearDropDown = ({ formik, ...props }: SchoolYearDropDownProps) => {
    const { data, isLoading } = useGetSchoolYear();

    const sortedData: SchoolYear[] = data?.data?.sort((a: SchoolYear, b: SchoolYear) => {
        // Handle undefined values
        if (a.year === undefined && b.year === undefined) return 0;
        if (a.year === undefined) return 1;
        if (b.year === undefined) return -1;

        // Sort as numbers if both are defined
        return parseInt(b.year) - parseInt(a.year);
    }) ?? [];

    return (
        <>
            <FormikDropdown
                data={ sortedData ?? []}
                label=""
                fullWidth
                {...props}
                formik={formik}
                valueFieldName="year"
                displayFieldName="year"
                isLoading={isLoading}
            />
        </>
    );
};

export default SchoolYearDropDown;
