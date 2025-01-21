import axios, { AxiosResponse } from "axios";
import dayjs from "dayjs";
import th from "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
import timezone from "dayjs/plugin/timezone";
import { MUIDataTableColumnOptions } from "mui-datatables";
import { PermissionList } from "../../../Const";
import { PermissionCondition, checkPermissions } from "../_auth";
import { encodeURLWithParams } from "../_common";
import { Button, Chip, DialogTitle, Divider, Grid, IconButton, Popover, Typography, createTheme, styled } from "@mui/material";
import { InsertDriveFile } from "@mui/icons-material";
// import { FileParameter } from "../../api/bddbApi.Client";
// import { UploadFileCertificationResultResponseDtoListServiceResponse } from "../PremiumProcess/AccountVerification/BankAccountUpload/bankAccountUploadApi";

dayjs.locale(th);
dayjs.extend(buddhistEra);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Bangkok");

export const numberWithCommas = (x: number | string, decimalPlaces: number = 2): string => {
    const numberValue = typeof x === "number" ? x.toFixed(decimalPlaces) : parseFloat(x).toFixed(decimalPlaces);
    const [integerPart, decimalPart] = numberValue.split(".");
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return decimalPart ? `${formattedIntegerPart}.${decimalPart}` : formattedIntegerPart;
};

export const formatDateString = (
    dateString: string | undefined,
    format: string = "DD/MM/BBBB HH:mm:ss"
): string | undefined => {
    if (dateString) {
        return dayjs(dateString).format(format);
    }
    return undefined;
};

export const debitColorMapStatus: Record<number, "#F61717" | "#18B920" | "#ECAE02"> = {
    0: "#F61717", // หักไม่ได้
    1: "#18B920", // หักได้
    2: "#ECAE02", // undefined
};

export const paymentStatusColorMapStatus: Record<number, "#000" | "#ECAE02" | "#18B920" | "#F61717" | "#F61717"> = {
    0: "#000", // default
    2: "#ECAE02", // รอรับชำระ
    3: "#18B920", // รับชำระ
    4: "#F61717", // ยกเลิก
    5: "#F61717", // เกินกำหนด
};

export const paymentColorMapStatus: Record<string, "#000" | "#ECAE02" | "#18B920" | "#F61717" | "#F61717"> = {
    'รอชำระ': "#ECAE02", // รอรับชำระ
    'รอรับชำระ': "#ECAE02", // รอรับชำระ
    'ชำระแล้ว': "#18B920", // รับชำระ
    'รับชำระแล้ว': "#18B920", // รับชำระแล้ว
    'ยกเลิก': "#F61717", // ยกเลิก
    'เกินระยะเวลาชำระ': "#F61717", // เกินกำหนด
};

export const recurringSMSHeaderStatusIdColorMapStatus: Record<number, "blue" | "green" | "#d32f2f"> = {
    2: "blue", // ไม่รับรอง
    3: "blue", // ไม่รับรอง
    4: "green", // ไม่รับรอง
    5: "#d32f2f", // ไม่รับรอง
};

export const recurringSMSHeaderStatusIdBackGroundColorMapStatus: Record<number, "lightblue" | "#C4FFC7" | "#FFE2D9"> = {
    2: "lightblue", // ไม่รับรอง
    3: "lightblue", // ไม่รับรอง
    4: "#C4FFC7", // ไม่รับรอง
    5: "#FFE2D9", // ไม่รับรอง
};

export const bankApproveColorMapStatus: Record<number, "#d32f2f" | "#388e3c" | "#ECAE02"> = {
    0: "#388e3c", // รับรอง
    2: "#d32f2f", // ไม่รับรอง
    3: "#d32f2f", // ไม่รับรอง
};

export const bankApproveBackGroundColorMapStatus: Record<number, "#FFE2D9" | "#C4FFC7" | "#ECAE02"> = {
    0: "#C4FFC7", // รับรอง
    2: "#FFE2D9", // ไม่รับรอง
    3: "#FFE2D9", // ไม่รับรอง
};

export const handleMapColorAndBackgroundColor = (isColor: boolean, productGroupName: string) => {
    if (isColor) {
        if (productGroupName.toLowerCase().includes("ph")) return "#1975D0";

        if (productGroupName.toLowerCase().includes("30")) return "#FF4343";

        if (productGroupName.toLowerCase().includes("pl")) return "#18DD82";

        if (productGroupName.toLowerCase().includes("house")) return "#DD8918";

        if (productGroupName.toLowerCase().includes("smilepa")) return "#435CFF";

        if (productGroupName.toLowerCase().includes("ta")) return "#B72066";

        if (productGroupName.toLowerCase().includes("golf")) return "#8B481B";

        if (productGroupName.toLowerCase().includes("home")) return "#119DA1";

        if (productGroupName.toLowerCase().includes("criticalillness")) return "#707070";

        if (productGroupName.toLowerCase().includes("paนักเรียน")) return "#9A00B9";

        if (productGroupName === "ภาคบังคับ CMI" || productGroupName === "ภาคสมัครใจ VMI") return "#000000";
    } else {
        if (productGroupName.toLowerCase().includes("ph")) return "#C7ECF9";

        if (productGroupName.toLowerCase().includes("30")) return "#FFE2FE";

        if (productGroupName.toLowerCase().includes("pl")) return "#E2FFED";

        if (productGroupName.toLowerCase().includes("house")) return "#FFF1E2";

        if (productGroupName.toLowerCase().includes("smilepa")) return "#E2E3FF";

        if (productGroupName.toLowerCase().includes("ta")) return "#FEC7D6";

        if (productGroupName.toLowerCase().includes("golf")) return "#FAFFE2";

        if (productGroupName.toLowerCase().includes("home")) return "#C7FAF2";

        if (productGroupName.toLowerCase().includes("criticalillness")) return "#E2E2E2";

        if (productGroupName.toLowerCase().includes("paนักเรียน")) return "#F4E4FF";

        if (productGroupName === "ภาคบังคับ CMI" || productGroupName === "ภาคสมัครใจ VMI") return "#85B5FF";
    }
};

export const productMapColor: Record<string, "#1975D0" | "#FF4343" | "#18DD82" | "#DD8918" | "#435CFF" | "#B72066" | "#8B481B" | "#119DA1" | "#707070" | "#9A00B9" | "#000000"> = {
    "PH": "#1975D0",
    "ph": "#1975D0",
    "PA30": "#FF4343",
    "P30": "#FF4343",
    "pa30": "#FF4343",
    "p30": "#FF4343",
    "30": "#FF4343",
    "PL": "#18DD82",
    "pl": "#18DD82",
    "House": "#DD8918",
    "house": "#DD8918",
    "ประกันบ้าน": "#DD8918",
    "SmilePA": "#435CFF",
    "smilepa": "#435CFF",
    "TA": "#B72066",
    "ta": "#B72066",
    "Golf": "#8B481B",
    "golf": "#8B481B",
    "Home": "#119DA1",
    "home": "#119DA1",
    "CriticalIllness": "#707070",
    "criticalillness": "#707070",
    "PA": "#9A00B9",
    "paนักเรียน": "#9A00B9",
    "ภาคบังคับ cmi": "#000000",
    "ภาคสมัครใจ vmi": "#000000",
};

export const productMapBackgroundColor: Record<string, "#C7ECF9" | "#FFE2FE" | "#E2FFED" | "#FFF1E2" | "#E2E3FF" | "#FEC7D6" | "#FAFFE2" | "#C7FAF2" | "#E2E2E2" | "#F4E4FF" | "#85B5FF"> = {
    "PH": "#C7ECF9",
    "ph": "#C7ECF9",
    "PA30": "#FFE2FE",
    "P30": "#FFE2FE",
    "pa30": "#FFE2FE",
    "p30": "#FFE2FE",
    "30": "#FFE2FE",
    "PL": "#E2FFED",
    "pl": "#E2FFED",
    "House": "#FFF1E2",
    "house": "#FFF1E2",
    "ประกันบ้าน": "#FFF1E2",
    "SmilePA": "#E2E3FF",
    "smilepa": "#E2E3FF",
    "TA": "#FEC7D6",
    "ta": "#FEC7D6",
    "Golf": "#FAFFE2",
    "golf": "#FAFFE2",
    "Home": "#C7FAF2",
    "home": "#C7FAF2",
    "CriticalIllness": "#E2E2E2",
    "criticalillness": "#E2E2E2",
    "PA": "#F4E4FF",
    "paนักเรียน": "#F4E4FF",
    "ภาคบังคับ cmi": "#85B5FF",
    "ภาคสมัครใจ vmi": "#85B5FF",
};

export const smsDetailBorderColorMapStatus: Record<number, "#000" | "#8E8E8E" | "#FFAF33" | "#6ABF69" | "#B32615"> = {
    0: "#000", // default
    3: "#8E8E8E", // รอผล SMS
    2: "#FFAF33", // รอส่ง SMS
    4: "#6ABF69", // ส่งสําเร็จ
    5: "#B32615", // ส่งไม่สําเร็จ
};

export const smsDetailColorMapStatus: Record<number, "#000" | "#8E8E8E" | "#FFAF33" | "#6ABF69" | "#B32615"> = {
    0: "#000", // default
    3: "#8E8E8E", // รอผล SMS
    2: "#FFAF33", // รอส่ง SMS
    4: "#6ABF69", // ส่งสําเร็จ
    5: "#B32615", // ส่งไม่สําเร็จ
};

export const smsResendTextMapHeader: Record<number, "แจ้งทำการชำระเบี้ย" | "ขอบคุณการชำระเบี้ย" | "ยกเลิกรายการชำระ" | "ใบรับฝากเช็ค"> = {
    2: "แจ้งทำการชำระเบี้ย",
    3: "ขอบคุณการชำระเบี้ย",
    4: "ยกเลิกรายการชำระ",
    5: "ใบรับฝากเช็ค",
};

export const handleClickLink = (redirectURL?: string) => {
    if (redirectURL) {
        window.open(redirectURL, "_blank");
    }
};

export const handleNumberInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // กรอกให้เป็นตัวเลขเท่านั้น
    event.target.value = event.target.value.replace(/[^0-9]/g, "");
};

export const handleFloatingInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // กรอกให้เป็นตัวเลขเท่านั้น
    event.target.value = event.target.value.replace(/[^0-9.]/g, "");
};

export const setBankLogo = (bankId?: number): string | undefined => {
    let avatarSrc: string | undefined;
    const basePath = "/images/bankLogo";

    switch (bankId) {
        case 3:
            avatarSrc = `${basePath}/ICONBANK_KTB.png`;
            break;
        case 4:
            avatarSrc = `${basePath}/ICONBANK_SCB.png`;
            break;
        case 5:
        case 93468:
            avatarSrc = `${basePath}/ICONBANK_TTB.png`;
            break;
        case 6:
            avatarSrc = `${basePath}/ICONBANK_GSB.png`;
            break;
        case 7:
            avatarSrc = `${basePath}/ICONBANK_BBL.png`;
            break;
        case 8:
            avatarSrc = `${basePath}/ICONBANK_KBANK.png`;
            break;
        case 9:
            avatarSrc = `${basePath}/ICONBANK_BAY.png`;
            break;
        case 10:
            avatarSrc = `${basePath}/ICONBANK_BAAC.png`;
            break;
        case 11:
            avatarSrc = `${basePath}/ICONBANK_TBANK.png`;
            break;
        case 12:
            avatarSrc = `${basePath}/ICONBANK_CIMB.png`;
            break;
        case 13:
            avatarSrc = `${basePath}/ICONBANK_LHBANK.png`;
            break;
        case 31501:
            avatarSrc = `${basePath}/ICONBANK_KKB.png`;
            break;
        case 32692:
            avatarSrc = `${basePath}/ICONBANK_UOB.png`;
            break;
        case 75751:
            avatarSrc = `${basePath}/ICONBANK_ISBT.png`;
            break;
        case 93435:
            avatarSrc = `${basePath}/ICONBANK_GHB.png`;
            break;
        default:
            // Handle default case if needed
            break;
    }
    return avatarSrc;
};

export const setInsuranceLogo = (insuranceId?: number): string | undefined => {
    let avatarSrc: string | undefined;
    const basePath = "/images/insuranceLogo";


    switch (insuranceId) {
        case 18:
            avatarSrc = `${basePath}/chubb_Logo.png`;
            break;
        case 27:
            avatarSrc = `${basePath}/buiPublic_Logo.png`;
            break;
        case 389190:
            avatarSrc = `${basePath}/ergo_Logo.png`;
            break;
        case 699804:
            avatarSrc = `${basePath}/smi_Logo.png`;
            break;
        default:
            // Handle default case if needed
            break;
    }
    return avatarSrc;
};

export const formatPhone = (phone: string | undefined) => {
    const formatPattern = "%%%-%%%%%%%";
    let formattedNumber = "";
    let numberIndex = 0;
    if (phone == undefined || phone.length != 10) return "-";

    for (let i = 0; i < formatPattern.length; i++) {
        if (formatPattern[i] === "%") {
            formattedNumber += phone[numberIndex];
            numberIndex++;
        } else {
            formattedNumber += formatPattern[i];
        }
    }
    return formattedNumber;
};

export const encodeToBase64 = (str: string): string => {
    return btoa(encodeURIComponent(str));
};

export const decodeFromBase64 = (str: string): string => {
    return decodeURIComponent(atob(str));
};

export const styleColLeft = { textAlign: "left", fontSize: 14, fontWeight: 500 };
export const styleColCenter = { textAlign: "center", fontSize: 14, fontWeight: 500 };
export const styleColRight = { textAlign: "right", fontSize: 14, fontWeight: 500 };

type CellAlignOptions = {
    align?: "right" | "center" | "left";
    sort?: boolean;
    width?: string;
    headerWhiteSpace?: "normal" | "nowrap" | "pre" | "pre-line" | "pre-wrap" | "initial" | "inherit";
    cellWhiteSpace?: "normal" | "nowrap" | "pre" | "pre-line" | "pre-wrap" | "initial" | "inherit";
};

export const cellAlignOptions = (options: CellAlignOptions = {}): MUIDataTableColumnOptions => {
    const { align = "left", sort = false, width = "", headerWhiteSpace = "nowrap", cellWhiteSpace = "" } = options;

    return {
        filter: true,
        sort,
        setCellHeaderProps: () => ({
            style: { textAlign: align, width, whiteSpace: headerWhiteSpace },
        }),
        setCellProps: () => ({
            style: {
                textAlign: align,
                width,
                whiteSpace: cellWhiteSpace,
                overflow: "hidden",
            },
        }),
    };
};

export const defaultOptionStandardDataTable = {
    setTableProps: () => {
        return {
            size: "medium",
        };
    },
    print: true,
    download: true,
};

// // Define types for your state and components
// interface TableOptions {
//     setTableProps: () => { size: string };
//     expandableRowsOnClick: boolean;
//     expandableRows: boolean;
//     rowsExpanded: any[];
//     renderExpandableRow: (_rowData: any, rowMeta: { dataIndex: number; rowIndex: number }) => React.ReactNode;
//     onTableChange: (action: string) => void;
// }

// interface ExpandableRowProps {
//     debtHeaderId: number;
// }

// // Update the function to use React.ComponentType correctly
// export const defaultOptionExpandableDataTable = (
//     expandableRows: any[],
//     setExpandableRows: React.Dispatch<React.SetStateAction<any[]>>,
//     ExpandableRowComponent: React.ComponentType<ExpandableRowProps> // Correctly type as a React component
// ): TableOptions => ({
//     setTableProps: () => ({
//         size: "medium",
//     }),
//     expandableRowsOnClick: true,
//     expandableRows: true,
//     rowsExpanded: expandableRows,
//     renderExpandableRow: (_rowData, rowMeta) => {
//         return (<>
//             <ExpandableRowComponent debtHeaderId= { _rowData.debtHeaderId } />;
//         </>)
//     },
//     onTableChange: (action) => {
//         if (action === "changePage" || action === "changeRowsPerPage") {
//             setExpandableRows([]); // Clear expanded rows on pagination changes
//         }
//     },
// });

interface AuthCheckPermissionProps {
    userPermissions: string[];
    permissions?: PermissionList[];
    condition?: PermissionCondition;
}

export const AuthCheckPermission = ({
    userPermissions,
    permissions,
    condition = "OR",
}: AuthCheckPermissionProps): boolean => {
    if (!permissions) {
        return true;
    }

    return checkPermissions(userPermissions, permissions as PermissionList[], condition);
};

export interface Payload {
    [key: string]: any;
}

export const cleanPayload = (payload: Payload): void => {
    for (const key in payload) {
        if (payload[key] === null || payload[key] === undefined) {
            delete payload[key];
        } else if (typeof payload[key] === "object") {
            cleanPayload(payload[key] as Payload);
        }
    }
};

export const toExcel = async <TRequest extends Payload>(
    payload: TRequest,
    url: string,
    apigw: string,
): Promise<AxiosResponse<Blob>> => {
    cleanPayload(payload);
    const _url = encodeURLWithParams(apigw + url, payload); //APIGW_PRM_URL ยิงไป uat
    return await axios
        .get(`${_url}`, { responseType: "blob" })
        .then((res: AxiosResponse<Blob>) => {
            if (res.status === 200) {
                return res;
            } else {
                throw Error(res.statusText);
            }
        })
        .catch((err) => {
            throw err;
        });
};

export const toExcelPost = async <TRequest extends Payload>(
    payload: TRequest,
    url: string,
    apigw: string,
): Promise<AxiosResponse<Blob>> => {
    const _url = apigw + url;
    return await axios
        .post(_url, payload)
        .then((res) => {
            if (res.status !== 200) {
                throw new Error(res.data.message);
            } else {
                return axios.post(_url, payload, { responseType: "blob" });
            }
        })
        .catch((err) => {
            throw err;
        });
};

const capitalizeFirstLetter = (str: string): string => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
};

// export const toExcelPostV2 = async <TRequest extends Payload>(
//     payload: TRequest,
//     url: string,
//     apigw: string,
//     toAppend?: boolean
// ): Promise<UploadFileCertificationResultResponseDtoListServiceResponse> => {
//     const _url = apigw + url;
//     const content_ = new FormData();
//     const { payload: data } = payload ?? {};

//     if (toAppend) {
//         for (const key in data) {
//             if (data.hasOwnProperty(key)) {
//                 const value = data[key];
//                 if (value && typeof value === 'object' && value.data instanceof File) {
//                     content_.append(capitalizeFirstLetter(key), value.data, value.fileName ? value.fileName : 'File');
//                 } else {
//                     content_.append(capitalizeFirstLetter(key), value.toString());
//                 }
//             }
//         }
//     }

//     return await axios
//         .post(_url, content_)
//         .then((res) => {
//             if (res.status === 200) {
//                 if (res?.data?.data?.tempCertificationId) { return res.data; }
//                 else { return axios.post(_url, content_, { responseType: 'blob' }); }
//             } else {
//                 throw new Error(res.data.message);
//             }
//         })
//         .catch((err) => {
//             throw err;
//         });
// };

export const [startOfMonth, endOfMonth] = [
    dayjs().local().utcOffset(0).startOf("month"),
    dayjs().local().utcOffset(0).endOf("month"),
];

export const toUtcOffset = (date: dayjs.ConfigType, keepLocalTime?: boolean): dayjs.Dayjs | undefined => {
    if (!date) return undefined;

    const result = keepLocalTime
        ? dayjs(date)?.utcOffset(0, keepLocalTime).startOf("day")
        : dayjs(date)?.utcOffset(0).startOf("day");

    return result;
};

// export const toAppend = (value: string | number | boolean | FileParameter, appendName: string) => {
//     const content_ = new FormData();

//     const result = content_.append(appendName, value.toString());

//     return result;
// };

export const TypographyStyled = styled(Typography)(({ }) => ({
    fontSize: 14,
    marginTop: 2,
}));

export const Caption = styled(Typography)(({ }) => ({
    fontSize: 13,
    marginTop: 2,
    color: 'grey'
}));

export const SearchButton = styled(Button)(({ }) => ({
    height: 40,
    fontSize: 14,
}));

export const ResetButton = styled(Button)(() => ({
    height: 40,
    fontSize: 14,
}));

export const RedResetButton = styled(Button)(({ theme }) => ({
    height: 40,
    marginTop: 1,
    fontSize: 14,
    color: theme.palette.error.main,
    borderColor: theme.palette.error.main,
    "&:hover": {
        borderColor: theme.palette.error.main,
    },
    "&:focus": {
        backgroundColor: "white",
    },
}));

export const SaveButton = styled(Button)(({ theme }) => ({
    height: 40,
    marginTop: 1,
    fontSize: 14,
    backgroundColor: theme.palette.success.main,
    "&:hover": {
        backgroundColor: theme.palette.success.light,
    },
}));

export const ExportButton = styled(Button)(({ theme }) => ({
    height: 40,
    marginTop: 1,
    fontSize: 14,
    backgroundColor: theme.palette.success.main,
    "&:hover": {
        backgroundColor: theme.palette.success.light,
    },
}));

export const UploadButton = styled(Button)(({ theme }) => ({
    height: 40,
    marginTop: 1,
    fontSize: 14,
    backgroundColor: theme.palette.success.main,
    "&:hover": {
        backgroundColor: theme.palette.success.light,
    },
}));

export const CancelButton = styled(Button)(({ theme }) => ({
    height: 40,
    marginTop: 1,
    fontSize: 14,
    backgroundColor: theme.palette.error.main,
    "&:hover": {
        backgroundColor: theme.palette.error.light,
    },
}));

export const GenarateButton = styled(Button)(({ }) => ({
    height: 40,
    marginTop: 1,
    fontSize: 14,
    textTransform: "none",
    backgroundColor: "#FBC02D",
    "&:hover": {
        backgroundColor: "#f9a825",
    },
}));

// export const EditButton = styled(IconButton)(({ theme }) => ({
//     color: theme.palette.edit.main,
//     backgroundColor: theme.palette.edit.light,
//     "&:hover": {
//         backgroundColor: theme.palette.edit.dark,
//     },
// }));

// export const DetailButton = styled(IconButton)(({ theme }) => ({
//     color: theme.palette.primary.main,
//     backgroundColor: theme.palette.primary.light,
//     "&:hover": {
//         backgroundColor: theme.palette.primary.dark,
//     },
// }));

export const TranferManualButton = styled(Button)(({ theme }) => ({
    height: 39.5,
    fontSize: 14,
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
        backgroundColor: theme.palette.primary.dark,
    },
}));

export const ChipStyled = styled(Chip)(({ theme }) => ({
    pl: 1,
    pr: 1,
    fontSize: 14,
    borderRadius: theme.shape.borderRadius,
    width: 80
}));

export const DialogFooterStyled = styled(DialogTitle)(() => ({
    backgroundColor: "#f2f2f2",
}));

export const DialogCloseStyled = styled(Button)(() => ({
    color: "#1DB0E6",
    borderColor: "#1DB0E6",
    backgroundColor: "#ffffff",
}));

export const EditButton = styled(IconButton)(({ }) => ({
    color: "#FBC336",
    backgroundColor: "#FFF1CD",
    "&:hover": {
        backgroundColor: "#ffe0b2",
    },
}));

export const DetailButton = styled(IconButton)(({ }) => ({
    color: "#1565c0",
    backgroundColor: "#E2F2FF",
    "&:hover": {
        backgroundColor: "#bbdefb",
    },
}));

export const GridTable = styled(Grid)(({ }) => ({
    marginTop: 30,
}));

export const GridChild = styled(Grid)(({ }) => ({
    marginTop: 0.6,
    alignItems: "center"
}));

export const DocumentButton = styled(InsertDriveFile)(({ }) => ({
    fontSize: 25,
    color: "#03a9f4",
}));

export const PayButton = styled(Button)(({ }) => ({
    fontSize: 14,
    fontFamily: 'sarabun',
    color: '#000',
    "&:hover": {
        color: "#fff",
        backgroundColor: "#1db0e6",
    },
}));

export const DividerStyled = styled(Divider)(({}) => ({
    border: "0.1px regular",
    backgroundColor: "#1DB0E6",
}));

export const popoverTheme = createTheme({
    components: {
        MuiPopover: {
            styleOverrides: {
                paper: {
                    boxShadow: "none",
                    border: "1px solid #1DB0E6",
                    borderRadius: 7
                },
            },
        },
    },
})
