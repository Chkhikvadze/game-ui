import { useMutation, useQuery } from "@apollo/client";
import { loader } from "graphql.macro";

const createPlayerGql = loader("../gql/player/createPlayer.gql");
const playersGql = loader("../gql/player/players.gql");
const deletePlayerGql = loader("../gql/player/deletePlayer.gql");

type createPlayerType = {
  unique_id: string;
  avatar: string;
  name: string;
  project_id: any;
};

type playersService = {
  page: number;
  limit: number;
  search_text: string;
  project_id: any;
};

export const useCreatePlayerService = () => {
  const [mutation] = useMutation(createPlayerGql);
  const createPlayerService = async (
    input: createPlayerType,
    callback: any
  ) => {
    const {
      data: { createPlayer },
    } = await mutation({
      variables: { input },
    });
    if (callback) {
      callback();
    }
    return createPlayer;
  };

  return [createPlayerService];
};

export const usePlayersService = ({
  page,
  limit,
  search_text,
  project_id,
}: playersService) => {
  const {
    data: { players } = [],
    error,
    loading,
    refetch,
  } = useQuery(playersGql, {
    variables: {
      filter: {
        project_id,
        search_text,
        page,
        limit,
        sort: "name",
        order: "ASC",
      },
    },
  });

  return {
    data: players || [],
    error,
    loading,
    refetch,
  };
};

export const useDeletePlayerByIdService = () => {
  const [mutation] = useMutation(deletePlayerGql);

  const deletePlayerById = async (
    id: string
  ): Promise<{ message: string; success: boolean }> => {
    const {
      data: { deletePlayer },
    } = await mutation({ variables: { id } });
    return deletePlayer;
  };
  return [deletePlayerById];
};
