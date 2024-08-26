import { QueryKey } from '@/utils/QueryKey';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  deleteWishList,
  getWishList,
  postWishList,
} from '../apis/wishListApis';

export const useGetWishList = () => {
  return useQuery({
    queryKey: QueryKey.USER.WISHLIST(),
    queryFn: async () => await getWishList(),
  });
};

export const usePostWishList = () => {
  return useMutation({
    mutationFn: async (gatheringsList: number[]) =>
      await postWishList(gatheringsList),
  });
};

export const useDeleteWishList = () => {
  return useMutation({
    mutationFn: async (gatheringId: number) => {
      await deleteWishList(gatheringId);
    },
  });
};
