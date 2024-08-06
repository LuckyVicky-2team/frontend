import { QueryKey } from '@tanstack/react-query';

export const isEqual = (stringA: QueryKey, stringB: QueryKey) => {
  return stringA === stringB;
};
