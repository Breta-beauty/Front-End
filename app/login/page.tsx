"use client";
import { data } from "autoprefixer";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import MonochromaticLogo from "@/public/icons/logo";
import LoginSignInCarousel from "@/components/LoginSignInCarousel";
import LoginSigninHeader from "@/components/LoginSigninHeader";

export default function LoginPage() {
  const passwordField = useRef<string>("");
  const emailField = useRef<string>("");
  const [loginError, setLoginError] = useState("")
  const router = useRouter()


   const Login = async (email:string, password:string) => {
    if(password == ""|| email == ""){
      return setLoginError("Por favor, llene ambos campos")
    }
    const URL:string = "https://breta-api.up.railway.app/graphql";
    const graphqlQuerry: string = `mutation{
      login(loginUserInput:{
          email: "${email}"
          password: "${password}"
      }){
          access_token
          user{ 
              username
              email
          }
      }
  }`
    const headers = {
      "content-type": "application/json",
    };
    const options = {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ query: graphqlQuerry }),
    };
    try {
      const response = await fetch(URL,options)
      const data = await response.json() 
      if(data.data.login){
        localStorage.setItem("token", data.data.login.access_token)
        router.push("/user")
      }else{
        setLoginError(data.errors[0].message)
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className="h-full flex overflow-hidden">
        <LoginSigninHeader/>
        <LoginSignInCarousel/>
        <aside className="flex flex-col bg-white absolute right-0 justify-right items-center w-1/3 p-12 z-10 h-full">
          <div className="flex flex-col justify-center h-full w-full">
          <div className="text-breta-blue font-bold text-2xl my-4 text-center tracking-wide ">
            Bienvenido de vuelta a BRETA
          </div>
          <form
            className="flex flex-col gap-8 w-full"
          >
            <div>
              <label
                className="text-breta-blue block text-sm font-semibold leading-6"
                htmlFor="email"
              >
                Correo Electronico
              </label>
              <input
                required
                onChange={(e) => (emailField.current = e.target.value)}
                type="email"
                name="email"
                className="w-full text-sm ring-1 ring-gray-300 rounded-md p-2 bg-breta-light-gray focus:outline-0 placeholder:text-sm placeholder:text-gray-500"
                placeholder="Correo Electronico"
              />
            </div>
            <div>
              <label
                className="block text-sm font-semibold leading-6 text-breta-blue "
                htmlFor="password"
              >
                Contraseña
              </label>
              <input
                required
                onChange={(e) => (passwordField.current = e.target.value)}
                type="password"
                name="password"
                className="w-full text-sm ring-1 ring-gray-300 rounded-md p-2 bg-breta-light-gray focus:outline-0 placeholder:text-sm placeholder:text-gray-500"
                placeholder="Contraseña"
              />
            </div>
            {loginError && <div>{loginError}</div>}
            <button
              type="button"
              onClick={(e) => Login(emailField.current,passwordField.current)}
              className="text-sm ring-1 ring-gray-300 bg-breta-blue rounded-md py-2 px-6 focus:outline-0 placeholder:text-sm text-gray-100"
            >
              Iniciar Sesion
            </button>
          
          </form>
          <div className="flex flex-col items-center gap-4 my-4 w-full">
            <div className="text-breta-blue font-light">
              Tambien puedes crear una <a className="font-bold">Nueva cuenta</a>
            </div>
            <div className="text-breta-blue font-light">
              O puedes iniciar sesion con:
            </div>
            <button
              type="submit"
              className="w-full text-sm ring-1 ring-red-300 text-red-300 rounded-md py-2 px-6 focus:outline-0 placeholder:text-sm"
            >
              Google
            </button>
            <button
              type="submit"
              className="w-full text-sm ring-1 ring-blue-300 text-blue-300  rounded-md py-2 px-6 focus:outline-0 placeholder:text-sm"
            >
              Facebook
            </button>
          </div>
          </div>
        </aside>
      </div>
    </>
  );
}
