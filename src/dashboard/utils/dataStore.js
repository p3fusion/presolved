import { DataStore } from '@aws-amplify/datastore';
import { MerchantsProfile, PaymentAggregators } from '../../models/';


export const getUserData = async (email) => {

    let userModel = await DataStore.query(MerchantsProfile, (profile) => profile.email('eq', email))
    let userData = userModel[0]
    let aggregatorData = []

    if (userModel.length > 0) {
        aggregatorData = await DataStore.query(PaymentAggregators, (aggregator) => aggregator.merchant_id('eq', userData.id))
    }

    let reduxData = {
        aggregatorCompleted: false,
        profile: [],
        transactions: [],
        disputes: [],
        aggregators: []
    }
    if (aggregatorData.length > 0) {
        reduxData.aggregatorCompleted = true
        reduxData.aggregators = aggregatorData
    }

    if (userModel.length > 0) {
        reduxData = {
            ...reduxData,
            id: userData.id,
            email: userData.email,
            authID: userData.auth_id,
            company: userData.company,
            name: userData.name,
            profile: userModel,
        }
    }

    return reduxData
}

export const getTransactionsData = async (userId) => {
}

export const getDisputesData = async (userId) => {

}

export const getAggregatorsData = async (userId) => {

}