import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import { APIGW_SSSPA_URL } from "../../../../../Const";
import { ApplicationResponseDto, CustomerClient, SchoolYearClient } from "../../../../API/ssspaApi.Client";
import { useMemo } from "react";


const schoolYearClient = new SchoolYearClient(APIGW_SSSPA_URL, axios);
const customerClient = new CustomerClient(APIGW_SSSPA_URL, axios);

const getSchoolYearQueryKey = "getSchoolYearQueryKey";
const getApplicationQueryKey = "getApplicationQueryKey";

export const useGetSchoolYear = () => {
    return useQuery([getSchoolYearQueryKey], () => schoolYearClient.schoolYear(), {
        refetchOnWindowFocus: true,
    });
};

// export const useGetApplication = (
//     body: ApplicationRequesDto,
// ) => {
//     return useQuery(
//         [
//             getApplicationQueryKey,
//         ],
//         () =>
//             customerClient.application(
//                 body?.applicationCode,
//                 body?.schoolName,
//                 body?.branchId,
//                 body?.year,
//                 body?.searchDetail,
//             ),
//         {
//             refetchOnWindowFocus: true,
//         }
//     );
// };

export const useGetApplication = () => {
    return useQuery([getApplicationQueryKey], () => customerClient.application(), {
        cacheTime: 1000 * 60 * 60 * 24,
        refetchOnWindowFocus: false,
    });
};

export const getApplicationFilter = (
    searchValue: string,
    defaultId?: any
): UseQueryResult<ApplicationRequesDto[], unknown> => {
    const key = searchValue.substring(0, 5);
    const { data, isLoading, ...rest } = useGetApplication();

    return useMemo(() => {
        if (isLoading) return { data, isLoading, ...rest } as UseQueryResult<ApplicationRequesDto[], unknown>;

        const filteredData = data?.data?.filter(
            (item: ApplicationResponseDto) => item.applicationCode?.includes(key)).slice(0, 10);


        return { data: filteredData, isLoading, ...rest } as UseQueryResult<ApplicationRequesDto[], unknown>;
    }, [key, defaultId, data, isLoading]);
};

export interface ApplicationRequesDto {
    applicationCode?: string | undefined,
    schoolName?: string | undefined,
    branchId?: number | undefined,
    year?: number | undefined,
    searchDetail?: string | undefined,
};