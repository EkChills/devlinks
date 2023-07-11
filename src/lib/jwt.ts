import jwt, {JwtPayload} from 'jsonwebtoken'

type SignOption = {
  expiresIn?:string | number
}

const DEFAULT_SIGN_OPTION:SignOption = {
  expiresIn:"1d"
}

export function signJwt(payload:JwtPayload, option = DEFAULT_SIGN_OPTION) {
  const secret = 'vuyhijfghjnjoighvblpokiutfryg'
  const token = jwt.sign(payload, secret!, option)
  return token
}


export function verifyJwt(token:string) {
  try {
    const secret = process.env.JWT_SECRET
    const decoded = jwt.verify(token, secret!)
    return decoded as JwtPayload
  } catch (error) {
    console.log(error);
    return null
  }
}