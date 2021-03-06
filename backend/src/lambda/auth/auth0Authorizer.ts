import { CustomAuthorizerEvent, CustomAuthorizerResult } from 'aws-lambda'
import 'source-map-support/register'

import { verify, decode } from 'jsonwebtoken'
import { createLogger } from '../../utils/logger'
import { Jwt } from '../../auth/Jwt'
import { JwtPayload } from '../../auth/JwtPayload'

const logger = createLogger('auth')

const cert = "-----BEGIN CERTIFICATE-----\n\
MIIDATCCAemgAwIBAgIJCaIYWET2jgBZMA0GCSqGSIb3DQEBCwUAMB4xHDAaBgNV\n\
BAMTE2ZhYmxlMy51cy5hdXRoMC5jb20wHhcNMjEwNTIwMTQxNTQzWhcNMzUwMTI3\n\
MTQxNTQzWjAeMRwwGgYDVQQDExNmYWJsZTMudXMuYXV0aDAuY29tMIIBIjANBgkq\n\
hkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA2JAJdAX8lCCSTuJIdElNfMZjYEgtq8c7\n\
khgWadg51QEGGCXwMx4anIdL62wokXkj4HL+Ti435Z6aKb/ckGOmvrmaTjURUshs\n\
T6F5Mf32L2DlQgOT1oxfyYOaXuCVdYt3ihWIsWv2nE+nhJfzL3MnJ5d+6IRpABNm\n\
HVL+/7ejwe1UNiJTJx1UvbUpAnXN6MKyIPcaXSawDjFld9ppDplauCFUskZlARmZ\n\
A7Mz+9sR3nUXl7QGMTD1tpUdlyH+mOSeZ54SD2qa5MtWGlS+b9zw2OgZqulX73Uu\n\
9U79k0RFlVS19eZ17pVBryv1dM74Lgo1zaNyj8MoMAKZB3QODeJtOwIDAQABo0Iw\n\
QDAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBSFSJXcE3IxbkhWu/zSwSdCwqFG\n\
9TAOBgNVHQ8BAf8EBAMCAoQwDQYJKoZIhvcNAQELBQADggEBAFeGQj+KbFROkXTy\n\
7Ea+vxh7nrfFNpAfsIBD9tDLkzaFA9GksHHVQ0czP7NAz69Id2D3EljiYZD9GXiz\n\
2NMY1JhMLatsE7k7fNLYUwv9nDpdaiOEjG9J5CAt2pkX3Y87MmNiKZ2xWR3twKvm\n\
TjpZ4bAoHwWHu3uZGi82jwBg8UhC7dd7Igxju290czBgZz8Yz3+7G+mndbkvUo7x\n\
oo0j6Rzv22pMjkltxOJ+TroBWKBbBPpezKhfQbLyjbpyZ/bPPIgPvHxL4a/7vTra\n\
CRS2Tc0ECp1+IKcw8bg+NrJ4QYf8X+hpSZ8y3PqJPcK+TUFLImauMlqaPa6lEu3I\n\
FfLVYBY=\n\
-----END CERTIFICATE-----"

// DONE: Provide a URL that can be used to download a certificate that can be used
// to verify JWT token signature.
// To get this URL you need to go to an Auth0 page -> Show Advanced Settings -> Endpoints -> JSON Web Key Set

export const handler = async (
  event: CustomAuthorizerEvent
): Promise<CustomAuthorizerResult> => {
  logger.info('Authorizing a user', event.authorizationToken)
  try {
    const jwtToken = await verifyToken(event.authorizationToken)
    logger.info('User was authorized', jwtToken)

    return {
      principalId: jwtToken.sub,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: '*'
          }
        ]
      }
    }
  } catch (e) {
    logger.error('User not authorized', { error: e.message })

    return {
      principalId: 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Deny',
            Resource: '*'
          }
        ]
      }
    }
  }
}

async function verifyToken(authHeader: string): Promise<JwtPayload> {
  const token = getToken(authHeader)
  const jwt: Jwt = decode(token, { complete: true }) as Jwt

  // DONE: Implement token verification
  // You should implement it similarly to how it was implemented for the exercise for the lesson 5
  // You can read more about how to do this here: https://auth0.com/blog/navigating-rs256-and-jwks/

  if (jwt.header.alg !== 'RS256') {
      // we are only supporting RS256 so fail if this happens.
      throw new Error('Invalid authentication algorithm');
  }

  return verify(token, cert, { algorithms: ['RS256'] }) as JwtPayload
}

function getToken(authHeader: string): string {
  if (!authHeader) throw new Error('No authentication header')

  if (!authHeader.toLowerCase().startsWith('bearer '))
    throw new Error('Invalid authentication header')

  const split = authHeader.split(' ')
  const token = split[1]

  return token
}
