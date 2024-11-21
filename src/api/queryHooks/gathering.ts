import {
  useQuery,
  keepPreviousData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { gatheringAPI } from '../apis/gatheringsApis';
import { QueryKey } from '@/utils/QueryKey';
import {
  IGatheringListRequestProps,
  IKickInfoProps,
} from '@/types/request/GatheringREQ';
import { IGatheringListResponseProps } from '@/types/response/GatheringListRES';
import { IErrorProps } from '@/types/CommonInterface';

export const useGatheringDetails = (id: number) => {
  const query = useQuery({
    queryKey: QueryKey.GATHERING.DETAIL(id),
    queryFn: () => gatheringAPI.getGatheringsInfo(id),
  });

  return { ...query, refetch: query.refetch };
};

export const useGatheringList = (req: IGatheringListRequestProps) => {
  return useQuery<IGatheringListResponseProps, IErrorProps>({
    queryKey: QueryKey.GATHERING.LIST(req),
    queryFn: () => gatheringAPI.gatheringList(req),
    staleTime: 60 * 1000 * 30,
    placeholderData: keepPreviousData,
  });
};

export const usePostJoinGathering = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      return await gatheringAPI.joinGathering(id);
    },
  });
};

export const usePatchCompleteGathering = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      return await gatheringAPI.completeGathering(id);
    },
  });
};

export const usePatchShareGathering = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      return await gatheringAPI.shareGathering(id);
    },
  });
};

export const useGetIsUserTypeQuit = (id: number) => {
  return useQuery({
    queryKey: QueryKey.USER.QUIT(id),
    queryFn: () => gatheringAPI.isUserTypeQuit(id),
  });
};
export const useKickParticipant = (meetingId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (req: IKickInfoProps) => {
      return await gatheringAPI.kickParticipant(req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.GATHERING.DETAIL(meetingId)],
      });
    },
  });
};

export const useDeleteGathering = (gatheringId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (gatheringId: number) => {
      return await gatheringAPI.deleteGathering(gatheringId);
    },
    onSettled: () => {
      queryClient.removeQueries({
        queryKey: [QueryKey.GATHERING.DETAIL(gatheringId)],
      });
    },
  });
};
export const useCreateGathering = () => {
  return useMutation({
    // mutationFn: gatheringAPI.createGathering,
    mutationFn: async (formData: FormData) => {
      return await gatheringAPI.createGathering(formData);
    },
  });
};

export const useUpdateGathering = (gatheringId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: gatheringAPI.updateGathering,
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.GATHERING.DETAIL(gatheringId)],
      });
    },
  });
};
