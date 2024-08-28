export const QueryKey = {
  LIST: 'list',
  DETAIL: 'detail',
  INFO: 'info',
  GAME: 'game',
  USER: {
    ME: 'me',
    KEY: 'user',
    QUIT: (id: number) => ['quit', id],
    LIST: (filters: any) => [QueryKey.USER.KEY, QueryKey.LIST, filters],
    INFO: (id: number) => [QueryKey.USER.KEY, QueryKey.INFO, id],
    COORDINATE: () => [QueryKey.USER.KEY, 'coordinate'],
    WISHLIST: () => [QueryKey.USER.KEY, 'wish-list'],
  },
  OTHER_USER: {
    KEY: 'other-user',
    INFO: (id: number) => [QueryKey.OTHER_USER.KEY, QueryKey.INFO, id],
    EVALUATION_TAGS: (id: number) => [
      QueryKey.OTHER_USER.KEY,
      'evaluation-tags',
      id,
    ],
  },
  GATHERING: {
    KEY: 'gathering',
    LIST: (filters: any) => [QueryKey.GATHERING.KEY, QueryKey.LIST, filters],
    DETAIL: (id: number) => [QueryKey.GATHERING.KEY, id],
  },
  REVIEW: {
    KEY: 'review',
    MEETING_LIST: () => [QueryKey.REVIEW.KEY, QueryKey.LIST, 'pre-progress'],
    WRITTEN_MEETING_LIST: () => [
      QueryKey.REVIEW.KEY,
      QueryKey.LIST,
      'finished',
    ],
    WRITTEN_MEETING_LIST_REVIEWEE_LIST: (id: number) => [
      QueryKey.REVIEW.KEY,
      QueryKey.LIST,
      id,
    ],
    TAG_LIST: () => [QueryKey.REVIEW.KEY, QueryKey.LIST, 'tags'],
    REVIEWEE_LIST: (id: number) => [QueryKey.REVIEW.KEY, id, QueryKey.LIST],
    DETAIL: (id: number) => [QueryKey.REVIEW.KEY, id],
  },
};
