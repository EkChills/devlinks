import LoginInputs from "@/components/LoginInputs";
import RegisterInputs from "@/components/RegisterInputs";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import Image from "next/image";

interface Props {}

const RegisterPage = async ({}: Props) => {
  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <>
      <div className="p-[2rem] sm:hidden">
        <div className="flex flex-col">
          <Image
            src={"/images/logo-devlinks-large.svg"}
            className="mb-[4rem]"
            alt="logo"
            width={170}
            height={40}
          />
          <h2 className="text-[1.5rem] font-bold text-[#333)] ">
            Create account
          </h2>
          <p className="text-[#737373] mt-[.5rem] text-base font-medium  mb-[2.5rem]">
            Let&apos;s get you started sharing your links!
          </p>
          <RegisterInputs />
        </div>
      </div>
      <div className="hidden sm:flex items-center justify-center bg-[#FAFAFA] min-h-screen w-full">
        <div className="rounded-lg">
        <Image
                src={"/images/logo-devlinks-large.svg"}
                className="mb-[3.19rem] mx-auto"
                alt="logo"
                width={170}
                height={40}
              />
          <div className="p-[2.5rem] min-w-[29.75rem] w-full max-w-[29.75rem] bg-white rounded-xl">
            <div className="flex flex-col">
           
              <h2 className="text-[1.5rem] font-bold text-[#333)] ">
                Create account
              </h2>
              <p className="text-[#737373] mt-[.5rem] text-base font-medium  mb-[2.5rem]">
                Let&apos;s get you started sharing your links!
              </p>
              <RegisterInputs />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
