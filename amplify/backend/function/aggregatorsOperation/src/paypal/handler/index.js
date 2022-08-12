

const disputesController = require('../controller/disputes');
const txnController = require('../controller/transactions');
const AuthUtils = require('../utility/auth');

const parseInput=(input)=>{
    try{
        let parsedInput=JSON.parse(input)
        return parsedInput.body
    }
    catch(ex){
        return input
    }
}


const handler = async (input) => {
    let response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
        body: JSON.stringify({
            "text": "Please define event_type",
            input
        })
    }
    try {
        console.log({input})
        let event=parseInput(input)
        if (event.event_type === 'transactions') {
            response.body = await txnController.getAllTransactions(event)
        }
        else if (event.event_type === 'disputes') {
            response.body = await disputesController.getAllDisputes(event)
        }
        else if (event.event_type === 'validate') {
            response.body = await AuthUtils.validateCredentials(event)
        }
        response.body=JSON.stringify(response.body)
        return response
    } catch (error) {
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            },
            body:JSON.stringify( error ),
        };
    }

}







module.exports = handler