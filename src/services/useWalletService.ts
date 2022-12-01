import { useMutation, useQuery } from "@apollo/client";
import { loader } from "graphql.macro";

const createWalletGql = loader("../gql/wallet/createWallet.gql");
const walletsGql = loader("../gql/wallet/wallets.gql");
const deleteWalletByIdGql = loader("../gql/wallet/deleteWallet.gql");

type createWalletType = {
  wallet_type: String;
  // source: String
  label: String;
  address: String;
  // protocol: String
  // network: String
};

type walletsService = {
  page: number;
  limit: number;
  search_text: string;
};

export const useCreateWalletService = () => {
  const [mutation] = useMutation(createWalletGql);
  const createWalletService = async (
    input: createWalletType,
    callback: any
  ) => {
    const {
      data: { createWallet },
    } = await mutation({
      variables: { input },
    });
    if (callback) {
      callback();
    }

    return createWallet;
  };

  return [createWalletService];
};

export const useWalletsService = ({
  page,
  limit,
  search_text,
}: walletsService) => {
  const {
    data: { wallets } = [],
    error,
    loading,
    refetch,
  } = useQuery(walletsGql, {
    variables: {
      filter: {
        search_text,
        page,
        limit,
        sort: "label",
        order: "ASC",
      },
    },
  });

  return {
    data: wallets || [],
    error,
    loading,
    refetch,
  };
};

export const useDeleteWalletByIdService = () => {
  const [mutation, { loading }] = useMutation(deleteWalletByIdGql);

  const deleteWalletById = async (
    id: string
  ): Promise<{ message: string; success: boolean }> => {
    const {
      data: { deleteWallet },
    } = await mutation({ variables: { id } });
    return deleteWallet;
  };
  return { deleteWalletById, loading };
};
