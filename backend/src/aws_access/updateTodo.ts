import * as AWS  from 'aws-sdk'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'

const docClient = new AWS.DynamoDB.DocumentClient()
const todosTable = process.env.TODOS_TABLE

export const updateTodoItem = async (todoId: string, updatedTodoItem: UpdateTodoRequest) => {
    console.log("updateTodoItem", {todoId, updatedTodoItem})
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
    console.log("update result", result);
}
