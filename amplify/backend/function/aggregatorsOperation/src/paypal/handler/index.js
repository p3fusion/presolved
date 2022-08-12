

const disputesController = require('../controller/disputes');
const txnController = require('../controller/transactions');
const AuthUtils = require('../utility/auth');

const handler = async (event) => {
    let response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
        body: {
            "text": "Please define event_type",
            event
        }
    }
    try {
        if (event.event_type === 'transactions') {
            response.body = await txnController.getAllTransactions(event)
        }
        else if (event.event_type === 'disputes') {
            response.body = await disputesController.getAllDisputes(event)
        }
        else if (event.event_type === 'validate') {
            response.body = await AuthUtils.validateCredentials(event)
        }

        return response
    } catch (error) {
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            },
            body: { error },
        };
    }

}







module.exports = handler