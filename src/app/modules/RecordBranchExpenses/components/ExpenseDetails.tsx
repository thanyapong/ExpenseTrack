import { Grid } from "@mui/material";
import { FormikProps } from "formik";
import MainAccordion from "../../_common/components/ProjectDesign/MainAccordion";
import { TypographyStyled } from "../../_common/functionHelper";
import { FormikFileUploader, FormikTextField } from "../../_common";
import "../../_common/CSSStyle.css";
import BankDropDown from "../../_common/components/PrmStatement/components/BankDropDown";
import BranchsDropDown from "../../_common/components/DataMaster/components/BranchsDropDown";
import ReceiveTypeDropDown from "../../_common/components/ClaimMaster/components/ReceiveTypeDropDown";

type ExpenseDetailsProps = {
    formik: FormikProps<any>;
};

const ExpenseDetails = ({ formik }: ExpenseDetailsProps) => {
    return (
        <MainAccordion title="รายละเอียดค่าใช้จ่าย :" accordionSx={{ mt: 2 }}>
            <Grid container item alignItems="center" spacing={2}>
                <Grid item xs={3} sm={3} md={2} lg={2}>
                    <TypographyStyled>
                        ชื่อบัญชีผู้รับเงิน :<span className="required-asterisk">*</span>
                    </TypographyStyled>
                </Grid>
                <Grid item xs={9} sm={9} md={3} lg={3}>
                    <FormikTextField
                        name="payeeAccountName"
                        label="ชื่อบัญชีผู้รับเงิน"
                        formik={formik}
                        size="small"
                        required
                    />
                </Grid>
            </Grid>
            <Grid container item alignItems="center" spacing={2}>
                <Grid item xs={3} sm={3} md={2} lg={2}>
                    <TypographyStyled>
                        ธนาคารผู้รับเงิน :<span className="required-asterisk">*</span>
                    </TypographyStyled>
                </Grid>
                <Grid item xs={9} sm={9} md={3} lg={3}>
                    <BankDropDown
                        fullWidth
                        name="payeeBankId"
                        formik={formik}
                        firstItemText=""
                        disableFirstItem={true}
                        required
                    />
                </Grid>
            </Grid>
            <Grid container item alignItems="center" spacing={2}>
                <Grid item xs={3} sm={3} md={2} lg={2}>
                    <TypographyStyled>
                        เลขบัญชีผู้รับเงิน :<span className="required-asterisk">*</span>
                    </TypographyStyled>
                </Grid>
                <Grid item xs={9} sm={9} md={3} lg={3}>
                    <FormikTextField
                        name="payeeAccountNumber"
                        label="เลขบัญชีผู้รับเงิน"
                        formik={formik}
                        size="small"
                        required
                    />
                </Grid>
            </Grid>
            <Grid container item alignItems="center" spacing={2}>
                <Grid item xs={3} sm={3} md={2} lg={2}>
                    <TypographyStyled>
                        สาขาบริการ :<span className="required-asterisk">*</span>
                    </TypographyStyled>
                </Grid>
                <Grid item xs={9} sm={9} md={3} lg={3}>
                    <BranchsDropDown name="serviceBranchId" formik={formik} size="small" required />
                </Grid>
            </Grid>
            <Grid container item alignItems="center" spacing={2}>
                <Grid item xs={3} sm={3} md={2} lg={2}>
                    <TypographyStyled>
                        ผู้รับเอกสาร :<span className="required-asterisk">*</span>
                    </TypographyStyled>
                </Grid>
                <Grid item xs={9} sm={9} md={3} lg={3}>
                    <ReceiveTypeDropDown name="receiveDocTypeId" formik={formik} size="small" required />
                </Grid>
            </Grid>
            <Grid container item alignItems="center" spacing={2}>
                <Grid item xs={3} sm={3} md={2} lg={2}>
                    <TypographyStyled>
                        เจ้าของรถ :<span className="required-asterisk">*</span>
                    </TypographyStyled>
                </Grid>
                <Grid item xs={9} sm={9} md={3} lg={3}>
                    <ReceiveTypeDropDown name="receiveDocTypeId" formik={formik} size="small" required />
                </Grid>
            </Grid>
            <Grid container item alignItems="center" spacing={2}>
                <Grid item xs={3} sm={3} md={2} lg={2}>
                    <TypographyStyled>
                        ผู้ให้บริการ :<span className="required-asterisk">*</span>
                    </TypographyStyled>
                </Grid>
                <Grid item xs={9} sm={9} md={3} lg={3}>
                    <FormikTextField
                        name="payeeAccountName"
                        label="ระบุผู้ให้บริการ"
                        formik={formik}
                        size="small"
                        required
                    />
                </Grid>
            </Grid>
            <Grid container item alignItems="center" spacing={2}>
                <Grid item xs={3} sm={3} md={2} lg={2}>
                    <TypographyStyled>ผู้ทำรายการ :</TypographyStyled>
                </Grid>
                <Grid item xs={9} sm={9} md={3} lg={3}>
                    <FormikTextField name="createdByUser" label="" formik={formik} size="small" required disabled />
                </Grid>
            </Grid>
            <Grid container item alignItems="center" spacing={2}>
                <Grid item xs={3} sm={3} md={2} lg={2}>
                    <TypographyStyled>
                        เอกสาร :<span className="required-asterisk">*</span>
                    </TypographyStyled>
                </Grid>
                <Grid item xs={9} sm={9} md={3} lg={3}>
                    <FormikFileUploader
                        icon="cloud_upload"
                        maxFiles={1}
                        // accept={{
                        //     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
                        // }}
                        formik={formik}
                        name="file"
                        fullWidth
                        dropzoneText="ลาก/วางไฟล์ที่นี่ หรือ คลิกที่นี่เพื่อเลือก"
                        // captionText={"หมายเหตุ: รองรับไฟล์ .xlsx เท่านั้น"}
                        border="2px dashed"
                    />
                </Grid>
            </Grid>
        </MainAccordion>
    );
};

export default ExpenseDetails;
