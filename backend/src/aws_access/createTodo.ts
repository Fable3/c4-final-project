import * as AWS  from 'aws-sdk'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { TodoItem} from '../models/TodoItem'
import * as uuid from 'uuid'

const docClient = new AWS.DynamoDB.DocumentClient()
const todosTable = process.env.TODOS_TABLE

export const createTodoItem = async (userId: string, newTodo: CreateTodoRequest) : Promise<TodoItem> => {
    
    const todoId = uuid.v4()

    const newItem : TodoItem = {
        todoId,
        userId,
        createdAt: new Date().toISOString(),
        done: false,
        ...newTodo
    }
    
    await docClient.put({
        TableName: todosTable,
        Item: newItem
      }).promise()
    return newItem;
}
