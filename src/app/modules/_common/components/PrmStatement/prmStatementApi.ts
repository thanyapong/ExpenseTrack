import axios from "axios";
import { API_PRMSTATEMENT_GW_URL } from "../../../../../Const";
import { useQuery } from "@tanstack/react-query";
import { PremiumsStatementClient } from "../../../../API/prmStatementApi.client";

const prmStatementClient = new PremiumsStatementClient(API_PRMSTATEMENT_GW_URL, axios);

const getBankQueryKey = "getBankQueryKey";
const getBankAccountNoQueryKey = "getBankAccountNoQueryKey";

export const useBankGet = () => {
    return useQuery([getBankQueryKey], () => prmStatementClient.bank(), {
        refetchOnWindowFocus: false,
    });
};

export const useBankAccountNoGet = (
    bankId?: number | undefined,
) => {
    return useQuery(
        [
            getBankAccountNoQueryKey,
            bankId,
        ],
        () =>
            prmStatementClient.bankaccount(
                bankId
            ),
        {
            enabled: bankId ? true : false,
            refetchOnWindowFocus: false
        }
    );
};
