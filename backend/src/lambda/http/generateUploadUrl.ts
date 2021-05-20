import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId
  console.log('generateUploadUrl', todoId)
  // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
  var result_url = {
    "uploadUrl": "https://s3-bucket-name.s3.eu-west-2.amazonaws.com/image.png"
  }  
  return  {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(result_url)
  }
}
