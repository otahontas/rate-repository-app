import { gql } from 'apollo-boost';

import { REPOSITORY_BASE_FIELDS, USER_BASE_FIELDS, REVIEW_BASE_FIELDS } from './fragments';

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
            ...ReviewBaseField
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
  ${REVIEW_BASE_FIELDS}
`;

export const GET_AUTHORIZED_USER = gql`
  query authorizedUser($includeReviews: Boolean = false) {
    authorizedUser {
      ...UserBaseFields,
      reviews @include(if: $includeReviews) {
        edges {
          node {
            ...ReviewBaseField
            repository {
              id
              name
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

  ${USER_BASE_FIELDS}
  ${REVIEW_BASE_FIELDS}
`;
