import * as AWS  from 'aws-sdk'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'

const docClient = new AWS.DynamoDB.DocumentClient()
const todosTable = process.env.TODOS_TABLE

import { createLogger } from '../utils/logger'
const logger = createLogger('updateTODO')


export const updateTodoItem = async (todoId: string, updatedTodoItem: UpdateTodoRequest) => {
    logger.info("updateTodoItem", {todoId, updatedTodoItem})
    const result = await docClient.update({
        TableName: todosTable,
        Key: {
            todoId
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
