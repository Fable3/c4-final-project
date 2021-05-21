import * as AWS  from 'aws-sdk'
const AWSXRay = require('aws-xray-sdk')
import { TodoItem} from '../models/TodoItem'

const XAWS = AWSXRay.captureAWS(AWS)
const docClient = new XAWS.DynamoDB.DocumentClient()
const todosTable = process.env.TODOS_TABLE
const userIdIndex = process.env.USER_ID_INDEX

export const AWS_getTodoItems = async (userId: string) : Promise<TodoItem[]> => {
    
    const result = await docClient.query({
        TableName: todosTable,
        IndexName: userIdIndex,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
          ':userId': userId
        }
      }).promise()
    
    return result.Items as TodoItem[]
}
