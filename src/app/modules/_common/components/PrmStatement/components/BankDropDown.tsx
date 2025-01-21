import { FormikDropdown } from "../..";
import { FormikDropdownProps } from "../../CustomFormik/FormikDropdown";
import { useMemo, useState } from "react";
import { useBankGet } from "../prmStatementApi";

type BankDropDownProps = Omit<
    FormikDropdownProps,
    "data" | "isLoading" | "valueFieldName" | "label" | "displayFieldName" | "filterSelectedOptions"
>;

const BankDropDown = ({ formik, ...props }: BankDropDownProps) => {
    const { data, isLoading } = useBankGet();
    const [bankData, setBankData] = useState<any>([]);

    useMemo(() => {
        if (data?.data !== undefined) {
            const newArr = data.data.filter((e) => e.bankShortName !== null);
            newArr.map((item) => {
                let Bankname = item.bankName.replace("ธ.ก.ส", "เพื่อการเกษตรและสหกรณ์การเกษตร");
                let Bank_Name = Bankname.replace("ธนาคาร", "");
                let BankShortNameUpper =
                    item.bankShortName == null ? item.bankShortName : item.bankShortName.toUpperCase();
                let payload = {
                    bankId: item.bankId,
                    bankName: `ธนาคาร${Bank_Name} (${BankShortNameUpper})`,
                    bankShortName: item.bankShortName,
                };
                setBankData((bankData: any) => [...bankData, payload]);
            });
        }
    }, [data?.data]);

    return (
        <>
            <FormikDropdown
                data={bankData ?? []}
                label="ธนาคารผู้รับเงิน"
                fullWidth
                {...props}
                formik={formik}
                displayFieldName="bankName"
                valueFieldName="bankId"
                isLoading={isLoading}
            />
        </>
    );
};

export default BankDropDown;
