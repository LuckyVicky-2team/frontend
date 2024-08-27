import { QueryKey } from '@/utils/QueryKey';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  deleteWishList,
  getWishList,
  postWishList,
} from '../apis/wishListApis';
import { IWishListItemProps } from '@/types/response/WishListRES';

export const useGetWishList = () => {
  return useQuery({
    queryKey: QueryKey.USER.WISHLIST(),
    queryFn: async () => {
      try {
        return await getWishList();
      } catch {
        return [];
      }
    },
  });
};

export const usePostWishList = () => {
  const queryClient = useQueryClient();
  const queryKey = QueryKey.USER.WISHLIST();

  return useMutation({
    mutationFn: async (gatheringsList: number[]) => {
      return await postWishList(gatheringsList);
    },

    onMutate: async gatheringsList => {
      await queryClient.cancelQueries({ queryKey });

      const previousWishlist = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(
        queryKey,
        (prev: IWishListItemProps[] | undefined) => {
          if (prev) {
            return [...prev, { meetingId: gatheringsList[0] }];
          } else {
            return [{ meetingId: gatheringsList[0] }];
          }
        }
      );
      return { previousWishlist };
    },
    onError: (_error, _gatheringsList, context) => {
      queryClient.setQueryData(queryKey, context?.previousWishlist);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};

export const useDeleteWishList = () => {
  const queryClient = useQueryClient();
  const queryKey = QueryKey.USER.WISHLIST();

  return useMutation({
    mutationFn: async (gatheringId: number) =>
      await deleteWishList(gatheringId),

    onMutate: async gatheringId => {
      await queryClient.cancelQueries({ queryKey });

      const previousWishlist = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (prev: IWishListItemProps[]) =>
        prev.filter(item => {
          item.meetingId !== gatheringId;
        })
      );

      return { previousWishlist };
    },
    onError: (_error, _gatheringsList, context) => {
      queryClient.setQueryData(queryKey, context?.previousWishlist);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};
