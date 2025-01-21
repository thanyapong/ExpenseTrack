import { useMemo, useState } from "react";
import { FormikDropdown } from "../..";
import { FormikDropdownProps } from "../../CustomFormik/FormikDropdown";
import { useGetBank } from "../dataMasterApi";

type BankDropDownProps = Omit<
    FormikDropdownProps,
    | "data"
    | "isLoading"
    | "valueFieldName"
    | "label"
    | "displayFieldName"
    | "filterSelectedOptions"
    | "displayFieldName"
    | "valueFieldName"
> & {
    valueFieldName?: string;
    displayFieldName?: string;
};

const BankDropDown = ({ formik, valueFieldName, displayFieldName, ...props }: BankDropDownProps) => {
    const { data, isLoading } = useGetBank();
    const [bankData, setBankData] = useState<any>([]);

    useMemo(() => {
        if (data?.data !== undefined) {
            const newArr = data.data.filter((e) => e.bankName !== undefined);

            newArr.map((item) => {
                if (item.bankName !== undefined) {
                    let Bankname = item.bankName.replace("ธ.ก.ส", "เพื่อการเกษตรและสหกรณ์การเกษตร");
                    let Bank_Name = Bankname.replace("ธนาคาร", "");
                    let BankShortNameUpper = item.bankName == null ? item.bankName : item.bankName.toUpperCase();
                    let payload = {
                        bankId: item.bankId,
                        bankName: `ธนาคาร${Bank_Name} (${BankShortNameUpper})`,
                        bankShortName: item.bankName,
                    };
                    setBankData((bankData: any) => [...bankData, payload]);
                }
            });
        }
    }, [data?.data]);

    return (
        <>
            <FormikDropdown
                data={bankData ?? []}
                label=""
                fullWidth
                {...props}
                formik={formik}
                displayFieldName={displayFieldName ?? "bankShortName"}
                valueFieldName={valueFieldName ?? "bankId"}
                isLoading={isLoading}
            />
        </>
    );
};

export default BankDropDown;
