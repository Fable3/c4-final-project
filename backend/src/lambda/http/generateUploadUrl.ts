import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { generateUploadURL } from '../../business_logic/todoItems'
import { getUserId } from '../utils'
import { createLogger } from '../../utils/logger'
const logger = createLogger('generateUploadURL')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId
  const userId: string = getUserId(event)

  logger.info('generateUploadUrl', {userId, todoId})
  // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
  var result_url = {
    "uploadUrl": await generateUploadURL(userId, todoId)
  }
  logger.info('result', result_url);
  return  {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(result_url)
  }
}
