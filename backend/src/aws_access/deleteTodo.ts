import * as AWS  from 'aws-sdk'
const AWSXRay = require('aws-xray-sdk')

const XAWS = AWSXRay.captureAWS(AWS)
const docClient = new XAWS.DynamoDB.DocumentClient()
const todosTable = process.env.TODOS_TABLE

export const AWS_deleteTodoItem = async (userId: string, todoId: string) => {
    
    await docClient.delete({
        TableName: todosTable,
        Key: {
            todoId,
            userId
        }
      }).promise()
}
