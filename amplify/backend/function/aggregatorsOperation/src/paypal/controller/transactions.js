const AuthUtils = require("../utility/auth");
var axios = require('axios').default;
const txnController = {

    getAllTransactions: async (event) => {
        try {
            let token = await AuthUtils.getAccessToken(event);
            var config = {
                method: 'get',
                url: 'https://api-m.sandbox.paypal.com/v1/reporting/transactions?fields=transaction_info,payer_info,shipping_info,auction_info,cart_info,incentive_info,store_info&start_date=2022-02-20T23:59:59.999Z&end_date=2022-03-20T00:00:00.000Z',
                headers: {
                    'Authorization': `Bearer ${token.access_token}`
                }
            };
            let response = await axios(config)
            let result = {
                data: response.data
            }
            return result;
        } catch (error) {
            console.error(error.message);
            let result = {
                error: error.message,
                event
            }
            return result
        }
    }

}

module.exports = txnController;