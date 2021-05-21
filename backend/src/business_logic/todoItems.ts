import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { AWS_createTodoItem } from '../aws_access/createTodo'
import { AWS_deleteTodoItem } from '../aws_access/deleteTodo'
import { AWS_generateUploadURL } from '../aws_access/generateUploadURL'
import { AWS_getTodoItems } from '../aws_access/getTodo'
import { AWS_updateTodoItem } from '../aws_access/updateTodo'

export const createTodoItem = async (userId: string, newTodo: CreateTodoRequest) : Promise<TodoItem> => {
    return await AWS_createTodoItem(userId, newTodo)
}

export const deleteTodoItem = async (userId: string, todoId: string) => {
    await AWS_deleteTodoItem(userId, todoId);
}

export const generateUploadURL = async (userId: string, todoId: string) : Promise<string> => {
    return await AWS_generateUploadURL(userId, todoId);
}

export const getTodoItems = async (userId: string) : Promise<TodoItem[]> => {
    return await AWS_getTodoItems(userId);   
}

export const updateTodoItem = async (userId: string, todoId: string, updatedTodoItem: UpdateTodoRequest) => {
    return await AWS_updateTodoItem(userId, todoId, updatedTodoItem);
}

