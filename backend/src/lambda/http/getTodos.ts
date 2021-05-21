import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { getUserId } from '../utils'
import { getTodoItems} from '../../business_logic/todoItems'


import { createLogger } from '../../utils/logger'
const logger = createLogger('getTODOs')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const userId: string = getUserId(event)
  logger.info('getTodos',{ userId,event})
  /* mock:
  const db_result = {
    "items": [
      {
        "todoId": "123",
        "createdAt": "2019-07-27T20:01:45.424Z",
        "name": "Buy milk",
        "dueDate": "2019-07-29T20:01:45.424Z",
        "done": false,
        "attachmentUrl": "http://example.com/image.png"
      },
      {
        "todoId": "456",
        "createdAt": "2019-07-27T20:01:45.424Z",
        "name": "Send a letter",
        "dueDate": "2019-07-29T20:01:45.424Z",
        "done": true,
        "attachmentUrl": "http://example.com/image.png"
      },
    ]
  }*/
  const db_result = {
    items: await getTodoItems(userId)
  }
  logger.info('result', db_result);

  return  {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(db_result)
  }

}
