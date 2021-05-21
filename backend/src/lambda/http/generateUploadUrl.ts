import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { generateUploadURL } from '../../aws_access/generateUploadURL'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId
  console.log('generateUploadUrl', todoId)
  // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
  var result_url = {
    "uploadUrl": await generateUploadURL(todoId)
  }
  return  {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(result_url)
  }
}
