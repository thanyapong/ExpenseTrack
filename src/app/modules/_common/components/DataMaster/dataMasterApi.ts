import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { APIGW_DATAMASTER_URL } from "../../../../../Const";
import { AddressClient, FinancialClient, } from "../../../../API/datamasterApi.Client";


const addressClient = new AddressClient(APIGW_DATAMASTER_URL, axios);
const financialClient = new FinancialClient(APIGW_DATAMASTER_URL, axios);

const getBranchsQueryKey = "getBranchsQueryKey";
const getBankQueryKey = "getBankQueryKey";

export const useGetBranchs = () => {
    return useQuery([getBranchsQueryKey], () => addressClient.getBranches(), {
        refetchOnWindowFocus: true,
    });
};

export const useGetBank = () => {
    return useQuery([getBankQueryKey], () => financialClient.getBanks(), {
        refetchOnWindowFocus: true,
    });
};