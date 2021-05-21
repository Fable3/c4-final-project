import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { deleteTodoItem } from '../../business_logic/todoItems'
import { getUserId } from '../utils'
import { createLogger } from '../../utils/logger'
const logger = createLogger('deleteTODO')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId
  const userId: string = getUserId(event)
  
  logger.info('deleteTodo', { userId, todoId })
  await deleteTodoItem(userId, todoId)
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: ""
  }
}
