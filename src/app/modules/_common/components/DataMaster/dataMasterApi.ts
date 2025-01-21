import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { APIGW_DATAMASTER_URL } from "../../../../../Const";
import { AddressClient } from "../../../../API/datamasterApi.Client";


const addressClient = new AddressClient(APIGW_DATAMASTER_URL, axios);

const getBranchsQueryKey = "getBranchsQueryKey";

export const useGetBranchs = () => {
    return useQuery([getBranchsQueryKey], () => addressClient.getBranches(), {
        refetchOnWindowFocus: true,
    });
};
