import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import { updateTodoItem } from '../../business_logic/todoItems'
import { createLogger } from '../../utils/logger'
import { getUserId } from '../utils'
const logger = createLogger('updateTODO')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId
  const userId: string = getUserId(event)
  const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)
  logger.info('updateTodo', {userId, todoId, updatedTodo})

  // DONE: Update a TODO item with the provided id using values in the "updatedTodo" object
  await updateTodoItem(userId, todoId, updatedTodo);
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: ""
  }
}
