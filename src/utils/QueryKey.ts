import { IReviewMeetingList } from '@/types/request/ReviewREQ';

export const QueryKey = {
  LIST: 'list',
  DETAIL: 'detail',
  INFO: 'info',
  USER: {
    KEY: 'user',
    LIST: (filters: any) => [QueryKey.USER.KEY, QueryKey.LIST, filters],
    INFO: (id: number) => [QueryKey.USER.KEY, QueryKey.INFO, id],
    COORDINATE: () => [QueryKey.USER.KEY, 'coordinate'],
    WISHLIST: () => [QueryKey.USER.KEY, 'wish-list'],
  },
  GATHERING: {
    KEY: 'gathering',
    LIST: (filters: any) => [QueryKey.GATHERING.KEY, QueryKey.LIST, filters],
    DETAIL: (id: number) => [QueryKey.GATHERING.KEY, id],
  },
  REVIEW: {
    KEY: 'review',
    LIST: (filters: IReviewMeetingList) => [
      QueryKey.REVIEW.KEY,
      QueryKey.LIST,
      filters,
    ],
    TAGLIST: () => [QueryKey.REVIEW.KEY, QueryKey.LIST, 'tags'],
    DETAIL: (id: number) => [QueryKey.REVIEW.KEY, id],
  },
};
