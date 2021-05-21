import * as AWS  from 'aws-sdk'
const AWSXRay = require('aws-xray-sdk')
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'

const XAWS = AWSXRay.captureAWS(AWS)
const docClient = new XAWS.DynamoDB.DocumentClient()
const todosTable = process.env.TODOS_TABLE

import { createLogger } from '../utils/logger'
const logger = createLogger('updateTODO')


export const AWS_updateTodoItem = async (userId: string, todoId: string, updatedTodoItem: UpdateTodoRequest) => {
    
    logger.info("updateTodoItem", {userId, todoId, updatedTodoItem})
    
    const result = await docClient.update({
        TableName: todosTable,
        Key: {
            todoId,
            userId
        },
        ExpressionAttributeNames: {
            '#todo_name': 'name',
          },
        UpdateExpression: "set #todo_name = :name, dueDate = :dueDate, done = :done",
        ExpressionAttributeValues: {
            ":name": updatedTodoItem.name,
            ":dueDate": updatedTodoItem.dueDate,
            ":done": updatedTodoItem.done
        }
    }).promise()
    logger.info("update result", result);
}
