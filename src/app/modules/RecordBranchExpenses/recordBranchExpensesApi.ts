import { FileParameter } from "../../API/uatncolApii.Client";

export interface DebtGroupForGenerateFeeBillRequestDto {
    applicationCode: string | undefined,
    schoolYear: number | undefined,
    branchId: string | undefined,
    branchName: string | undefined,
    shcoolName: string | undefined,
    payeeAccountName: string | undefined,
    payeeBankId: number | undefined,
    payeeBankName: string | undefined,
    payeeAccountNumber: string | undefined,
    serviceBranchId: number | undefined,
    serviceBranchName: string | undefined,
    serviceByUserId: string | undefined,
    serviceByCode: string | undefined,
    serviceByName: string | undefined,
    totalAmount: number | undefined,
    file: FileParameter | undefined,
    createdByUser: string | undefined,
    zebraId: number | undefined,
    zebraName: string | undefined,
    receiveDocTypeId: number | undefined,
    receiveDocTypeName: string | undefined,
    detail: [] | undefined
};