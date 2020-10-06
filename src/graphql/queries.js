import { gql } from 'apollo-boost';

import { REPOSITORY_BASE_FIELDS, USER_BASE_FIELDS } from './fragments';

export const GET_REPOSITORIES = gql`
  query repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $first: Int, $after: String) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection, first: $first, after: $after) {
      edges {
        node {
          ...RepositoryBaseFields
          ratingAverage
          reviewCount
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        totalCount
        hasNextPage
      }
    }
  }

  ${REPOSITORY_BASE_FIELDS}
`;

export const GET_REPOSITORY = gql`
  query repository($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      ...RepositoryBaseFields
      ratingAverage
      reviewCount
      reviews(first: $first, after: $after) {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          totalCount
          hasNextPage
        }
      }
    }
  }

  ${REPOSITORY_BASE_FIELDS}
`;

export const GET_AUTHORIZED_USER = gql`
  query {
    authorizedUser {
      ...UserBaseFields
    }
  }

  ${USER_BASE_FIELDS}
`;
