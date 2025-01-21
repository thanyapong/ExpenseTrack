import { FormikProps } from "formik";

const useSchoolDetailsHook = (formik: FormikProps<any>) => {
    const handleReset = () => formik.resetForm(); // Reset the form to its initial values

    return { handleReset };
};

export default useSchoolDetailsHook;
