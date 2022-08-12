// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { PaymentAggregators, MerchantsProfile } = initSchema(schema);

export {
  PaymentAggregators,
  MerchantsProfile
};