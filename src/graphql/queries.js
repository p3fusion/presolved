/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMerchantsDisputeRules = /* GraphQL */ `
  query GetMerchantsDisputeRules($id: ID!) {
    getMerchantsDisputeRules(id: $id) {
      id
      merchant_id
      rule_name
      rule_data
      rule_result
      createdAt
      updatedAt
    }
  }
`;
export const listMerchantsDisputeRules = /* GraphQL */ `
  query ListMerchantsDisputeRules(
    $filter: ModelMerchantsDisputeRulesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMerchantsDisputeRules(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        merchant_id
        rule_name
        rule_data
        rule_result
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPaymentAggregators = /* GraphQL */ `
  query GetPaymentAggregators($id: ID!) {
    getPaymentAggregators(id: $id) {
      id
      merchant_id
      aggregator
      client_id
      secret_key
      created_at
      createdAt
      updatedAt
    }
  }
`;
export const listPaymentAggregators = /* GraphQL */ `
  query ListPaymentAggregators(
    $filter: ModelPaymentAggregatorsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPaymentAggregators(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        merchant_id
        aggregator
        client_id
        secret_key
        created_at
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getMerchantsProfile = /* GraphQL */ `
  query GetMerchantsProfile($id: ID!) {
    getMerchantsProfile(id: $id) {
      id
      auth_id
      email
      name
      company
      created_at
      createdAt
      updatedAt
    }
  }
`;
export const listMerchantsProfiles = /* GraphQL */ `
  query ListMerchantsProfiles(
    $filter: ModelMerchantsProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMerchantsProfiles(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        auth_id
        email
        name
        company
        created_at
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
