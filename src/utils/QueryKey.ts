export const QueryKey = {
  LIST: 'list',
  DETAIL: 'detail',
  INFO: 'info',
  USER: {
    KEY: 'user',
    LIST: (filters: any) => [QueryKey.USER.KEY, QueryKey.LIST, filters],
    INFO: (id: number) => [QueryKey.USER.KEY, QueryKey.INFO, id],
    COORDINATE: () => [QueryKey.USER.KEY, 'coordinate'],
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
};
