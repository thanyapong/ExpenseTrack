import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { APIGW_CLAIM_URL } from "../../../../../Const";
import { ClaimOnLineClient, MasterClient } from "../../../../API/uatncolApii.Client";
import { useMemo } from "react";


const claimMasterClient = new MasterClient(APIGW_CLAIM_URL, axios);
const claimOnlineClient = new ClaimOnLineClient(APIGW_CLAIM_URL, axios);

const getProviceAllQueryKey = "getProviceAllQueryKey";
const getSchoolQueryKey = "getSchoolQueryKey"
const getReceiveTypeQueryKey = "getReceiveTypeQueryKey";

export const useGetProviceAll = () => {
    return useQuery([getProviceAllQueryKey], () => claimMasterClient.getProviceAll(), {
        refetchOnWindowFocus: true,
    });
};

export const useGetReceiveType = () => {
    return useQuery([getReceiveTypeQueryKey], () => claimMasterClient.getReceiveDocType(), {
        refetchOnWindowFocus: true,
    });
};

export const useGetSchool = (
    body: ApplicationRequestDto,
    searchValue: string | undefined,
    defaultId: string
) => useQuery([getSchoolQueryKey, body, searchValue], async () => {
    const { data } = await claimOnlineClient.getSchool(
        body?.year,
        body?.provinceId,
        searchValue ?? defaultId
    )

    return data ?? [];
}, {
    enabled: body?.year && body?.provinceId ? true : false
});

export interface ApplicationRequestDto {
    year?: number | undefined,
    provinceId?: number | undefined,
    searchDetail?: string | undefined,
    orderingField?: string | undefined,
    ascendingOrder?: boolean | undefined,
    page?: number | undefined,
    recordsPerPage?: number | undefined,
}