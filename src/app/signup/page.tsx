import { authOptions } from "@/lib/authOptions"
import { getServerSession } from "next-auth"

const SignUpPage = async() => {
  const session = await getServerSession(authOptions)
  return (
    <div>
      {session?.accessToken && <pre>{session.accessToken}</pre>}
    </div>
  )
}

export default SignUpPage