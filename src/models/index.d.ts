import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type PaymentAggregatorsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type MerchantsProfileMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class PaymentAggregators {
  readonly id: string;
  readonly merchant_id?: string | null;
  readonly aggregator?: string | null;
  readonly client_id?: string | null;
  readonly secret_key?: string | null;
  readonly created_at?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<PaymentAggregators, PaymentAggregatorsMetaData>);
  static copyOf(source: PaymentAggregators, mutator: (draft: MutableModel<PaymentAggregators, PaymentAggregatorsMetaData>) => MutableModel<PaymentAggregators, PaymentAggregatorsMetaData> | void): PaymentAggregators;
}

export declare class MerchantsProfile {
  readonly id: string;
  readonly auth_id?: string | null;
  readonly email?: string | null;
  readonly name?: string | null;
  readonly company?: string | null;
  readonly created_at?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<MerchantsProfile, MerchantsProfileMetaData>);
  static copyOf(source: MerchantsProfile, mutator: (draft: MutableModel<MerchantsProfile, MerchantsProfileMetaData>) => MutableModel<MerchantsProfile, MerchantsProfileMetaData> | void): MerchantsProfile;
}