import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { CreateTodoRequest } from '../../requests/CreateTodoRequest'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const newTodo: CreateTodoRequest = JSON.parse(event.body)
  console.log('newTodo', newTodo)

  // TODO: Implement creating a new TODO item
  const db_result = {
    "item": {
      "todoId": "123",
      "createdAt": "2019-07-27T20:01:45.424Z",
      "name": newTodo.name,
      "dueDate": newTodo.dueDate,
      "done": false,
      "attachmentUrl": "http://example.com/image.png"
    }
  }
  return  {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(db_result)
  }
}
