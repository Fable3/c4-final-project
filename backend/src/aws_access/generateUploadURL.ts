import * as AWS  from 'aws-sdk'
import * as uuid from 'uuid'

const docClient = new AWS.DynamoDB.DocumentClient()
const todosTable = process.env.TODOS_TABLE
const bucketName = process.env.IMAGES_S3_BUCKET
const urlExpiration = process.env.SIGNED_URL_EXPIRATION

const s3 = new AWS.S3({
    signatureVersion: 'v4'
  })

export interface CreateTodoRequest {
    imageId: string
    uploadURL: string
}
  

export const generateUploadURL = async (todoId: string) : Promise<string> => {
    const imageId = uuid.v4()
    const uploadURL : string = s3.getSignedUrl('putObject', {
        Bucket: bucketName,
        Key: imageId,
        Expires: urlExpiration
    })
    const attachmentURL : string = `https://${bucketName}.s3.amazonaws.com/${imageId}`
    await docClient.update({
        TableName: todosTable,
        Key: {
            todoId
        },
        UpdateExpression: "set attachmentUrl = :attachmentUrl",
        ExpressionAttributeValues: {
            ":attachmentUrl": attachmentURL
        }
    }).promise()
    return uploadURL
}
