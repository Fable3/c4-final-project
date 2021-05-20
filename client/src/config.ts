// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = '...'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`

export const authConfig = {
  domain: 'fable3.us.auth0.com',            // Auth0 domain
  clientId: '63GNUML0m8G1wv1kWeFT4UsWDwHAYtBf',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
