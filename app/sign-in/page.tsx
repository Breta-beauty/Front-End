import LoginSignInCarousel from "@/components/LoginSignInCarousel";
import LoginSigninHeader from "@/components/LoginSigninHeader";
import { SignIn } from "@clerk/nextjs";
export default function SigninPage() {
  return (
    <>
      <div className="flex flex-col h-[100vh]">
        <LoginSigninHeader />
        <div className="relative flex flex-col flex-1">
          <div className="w-full md:w-4/5 h-full">
            <LoginSignInCarousel />
          </div>
          <aside className="absolute right-0 rounded-t-[3rem] h-4/5 bottom-0 flex flex-col bg-white w-full md:h-full md:w-[40%] xl:w-[25%] z-10 md:rounded-l-[3rem] md:rounded-tr-[0rem]">
            <div className="relative flex flex-col justify-center items-center p-4 h-full w-full md:p-4 lg:p-6">
              <SignIn />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
