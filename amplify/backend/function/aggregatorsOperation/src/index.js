
const handler = require("./paypal/handler")
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

exports.handler = (event) => handler(event);