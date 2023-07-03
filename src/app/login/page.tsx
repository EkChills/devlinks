import LoginInputs from "@/components/LoginInputs";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import Image from "next/image";

interface Props {}

const LoginPage = async ({}: Props) => {
  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <>
    <div className="p-[2rem] sm:hidden">
      <div className="flex flex-col">
        <Image src={"/images/logo-devlinks-large.svg"} className="mb-[4rem]" alt="logo" width={170} height={40}/>
        <h2 className="text-[1.5rem] font-bold text-[#333)] capitalize">
          login
        </h2>
        <p className="text-[#737373] mt-[.5rem] text-base font-medium  mb-[2.5rem]">
          Add your details below to get back into the app
        </p>
        <LoginInputs />
      </div>
    </div>
    <div className="hidden sm:flex items-center justify-center bg-[#FAFAFA] min-h-screen w-full">
      <div className="rounded-lg">
    <Image src={"/images/logo-devlinks-large.svg"} className="mb-[4rem] mx-auto" alt="logo" width={170} height={40}/>
    <div className="p-[2.5rem] min-w-[29.75rem] w-full max-w-[29.75rem] bg-white rounded-lg">
      <div className="flex flex-col">
        <h2 className="text-[1.5rem] font-bold text-[#333)] capitalize">
          login
        </h2>
        <p className="text-[#737373] mt-[.5rem] text-base font-medium  mb-[2.5rem]">
          Add your details below to get back into the app
        </p>
        <LoginInputs />
      </div>
    </div>

      </div>
    </div>
    </>
  );
};

export default LoginPage;
