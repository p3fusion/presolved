const AuthUtils = require("../utility/auth");
var axios = require('axios').default;
const disputesController = {

    getAllDisputes: async (event) => {
        try {
            let token = await AuthUtils.getAccessToken(event);
            var config = {
                method: 'get',
                url: 'https://api-m.sandbox.paypal.com/v1/customer/disputes',
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
module.exports = disputesController;