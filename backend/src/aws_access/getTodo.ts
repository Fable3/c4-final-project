import * as AWS  from 'aws-sdk'
import { TodoItem} from '../models/TodoItem'

const docClient = new AWS.DynamoDB.DocumentClient()
const todosTable = process.env.TODOS_TABLE
const userIdIndex = process.env.USER_ID_INDEX

export const getTodoItems = async (userId: string) : Promise<TodoItem[]> => {
    
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
