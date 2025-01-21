import { Grid } from "@mui/material";
import { FormikProps } from "formik";
import { FormikTextField } from "../../_common";
import FormikAutocompleteApi from "../../_common/components/CustomFormik/FormikAutocompleteApi";
import BranchsDropDown from "../../_common/components/DataMaster/components/BranchsDropDown";
import MainAccordion from "../../_common/components/ProjectDesign/MainAccordion";
import { getApplicationFilter } from "../../_common/components/SSSPAMaster/ssspaApi";
import { ResetButton, TypographyStyled } from "../../_common/functionHelper";
import PayeeTable from "./PayeeTable";
import useSchoolDetailsHook from "./SchoolDetails.hook";

type SchoolDetailsType = {
    formik: FormikProps<any>;
};

const SchoolDetails = ({ formik }: SchoolDetailsType) => {
    const { handleReset } = useSchoolDetailsHook(formik);

    return (
        <MainAccordion title="รายละเอียดโรงเรียน :">
            <FormRow
                label="ปีการศึกษา"
                component={<FormikTextField name="schoolYear" label="" formik={formik} size="small" disabled />}
            />
            <FormRow label="สาขา" component={<BranchsDropDown fullWidth formik={formik} name="branchId" />} />
            <FormRow
                label="AppID/สถานศึกษา"
                component={
                    <FormikAutocompleteApi
                        fullWidth
                        name="applicationCode"
                        valueFieldName="applicationCode"
                        displayFieldName="fullDetail"
                        useQueryGet={getApplicationFilter}
                        label=""
                        formik={formik}
                        required
                    />
                }
            />
            <Grid container item alignItems="center" spacing={2}>
                <Grid item xs={3} sm={3} md={2} lg={2}>
                    <TypographyStyled>ชื่อผู้เอาประกัน :</TypographyStyled>
                </Grid>
                <Grid item xs={9} sm={9} md={3} lg={3}>
                    <BranchsDropDown fullWidth formik={formik} name="branchId" disabled />
                </Grid>
                <Grid item xs={9} sm={9} md={3} lg={2}>
                    <ResetButton fullWidth variant="outlined" onClick={() => handleReset()}>
                        ล้างค่า
                    </ResetButton>
                </Grid>
            </Grid>
            <PayeeTable />
        </MainAccordion>
    );
};

export default SchoolDetails;

type FormRowProps = {
    label: string;
    component: React.ReactNode;
};

const FormRow: React.FC<FormRowProps> = ({ label, component }) => (
    <Grid container item alignItems="center" spacing={2}>
        <Grid item xs={3} sm={3} md={2} lg={2}>
            <TypographyStyled>{label} :</TypographyStyled>
        </Grid>
        <Grid item xs={9} sm={9} md={3} lg={3}>
            {component}
        </Grid>
    </Grid>
);
