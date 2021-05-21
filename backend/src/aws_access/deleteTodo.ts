import * as AWS  from 'aws-sdk'

const docClient = new AWS.DynamoDB.DocumentClient()
const todosTable = process.env.TODOS_TABLE

export const deleteTodoItem = async (todoId: string) => {
    
    await docClient.delete({
        TableName: todosTable,
        Key: {
            todoId
        }
      }).promise()
}
