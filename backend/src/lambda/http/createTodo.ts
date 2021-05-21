import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { getUserId } from '../utils'
import { createTodoItem } from '../../aws_access/createTodo'

//import * as AWS  from 'aws-sdk' -> moved to aws_access
import { createLogger } from '../../utils/logger'
const logger = createLogger('createTODO')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const newTodo: CreateTodoRequest = JSON.parse(event.body)
  const userId: string = getUserId(event)
  logger.info('newTodo', { userId, newTodo})
  if (!userId) {
    return {
      statusCode: 404,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        error: 'Invalid userId'
      })
    }
  }

  if (!newTodo.name) {
    return {
      statusCode: 404,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        error: 'Invalid name'
      })
    }
  }
  if (!newTodo.dueDate) {
    return {
      statusCode: 404,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        error: 'Invalid dueDate'
      })
    }
  }

  const db_result = {
    item: await createTodoItem(userId, newTodo)
  }
  
  // DONE: Implement creating a new TODO item
  /* Mock data:
  const db_result = {
    "item": {
      "todoId": "123",
      "createdAt": "2019-07-27T20:01:45.424Z",
      "name": newTodo.name,
      "dueDate": newTodo.dueDate,
      "done": false,
      "attachmentUrl": "http://example.com/image.png"
    }
  }*/
  
  return  {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(db_result)
  }
}
