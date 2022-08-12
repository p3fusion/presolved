/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMerchantsDisputeRules = /* GraphQL */ `
  subscription OnCreateMerchantsDisputeRules(
    $filter: ModelSubscriptionMerchantsDisputeRulesFilterInput
  ) {
    onCreateMerchantsDisputeRules(filter: $filter) {
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
export const onUpdateMerchantsDisputeRules = /* GraphQL */ `
  subscription OnUpdateMerchantsDisputeRules(
    $filter: ModelSubscriptionMerchantsDisputeRulesFilterInput
  ) {
    onUpdateMerchantsDisputeRules(filter: $filter) {
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
export const onDeleteMerchantsDisputeRules = /* GraphQL */ `
  subscription OnDeleteMerchantsDisputeRules(
    $filter: ModelSubscriptionMerchantsDisputeRulesFilterInput
  ) {
    onDeleteMerchantsDisputeRules(filter: $filter) {
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
export const onCreatePaymentAggregators = /* GraphQL */ `
  subscription OnCreatePaymentAggregators(
    $filter: ModelSubscriptionPaymentAggregatorsFilterInput
  ) {
    onCreatePaymentAggregators(filter: $filter) {
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
export const onUpdatePaymentAggregators = /* GraphQL */ `
  subscription OnUpdatePaymentAggregators(
    $filter: ModelSubscriptionPaymentAggregatorsFilterInput
  ) {
    onUpdatePaymentAggregators(filter: $filter) {
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
export const onDeletePaymentAggregators = /* GraphQL */ `
  subscription OnDeletePaymentAggregators(
    $filter: ModelSubscriptionPaymentAggregatorsFilterInput
  ) {
    onDeletePaymentAggregators(filter: $filter) {
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
export const onCreateMerchantsProfile = /* GraphQL */ `
  subscription OnCreateMerchantsProfile(
    $filter: ModelSubscriptionMerchantsProfileFilterInput
  ) {
    onCreateMerchantsProfile(filter: $filter) {
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
export const onUpdateMerchantsProfile = /* GraphQL */ `
  subscription OnUpdateMerchantsProfile(
    $filter: ModelSubscriptionMerchantsProfileFilterInput
  ) {
    onUpdateMerchantsProfile(filter: $filter) {
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
export const onDeleteMerchantsProfile = /* GraphQL */ `
  subscription OnDeleteMerchantsProfile(
    $filter: ModelSubscriptionMerchantsProfileFilterInput
  ) {
    onDeleteMerchantsProfile(filter: $filter) {
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
