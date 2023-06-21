"use client";
import { useState, useRef, useEffect } from "react";
import { getSalonById } from "@/services/Salons";
import DaySelector from "./UI/DaySelector";
import UploadImageSquare from "./UI/UploadImageSquare";
import { convertToObject } from "typescript";
const IconPack = require("../public/icons/Icons");
const Icons = new IconPack();
interface ParentComponentProps {}
interface OpenSalonDays {
  day:string, open:boolean, openFrom:string, openTo:string
}

interface OpenSalonDays extends Array<OpenSalonDays>{}
interface SalonData{
  full_name:string,
  type:string,
  profile:{
    description:string,
    location?:string | null,
    profilePicture:string,
    services?:string[] | null,
    wallpaper:string,
  }
}

const SalonCustomization = () => {
  const salonId:string = "7aeba000-26a9-426f-a8d3-a7e9f227376d"
  const fetchSalonData = async() =>{
    const request = await getSalonById(salonId)
    setSalonDetails(request.data.user) 
  }
  useEffect(()=>{
    fetchSalonData()
  },[])

  const [imageSelected, setImageSelected] = useState<number>(0);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [logoImage, setLogoImage] = useState<string>("");
  const [coverImage, setCoverImage] = useState<string>("");
  const [openSalonDays, setOpenSalonDays] = useState<OpenSalonDays>();
  const [salonDetails, setSalonDetails] = useState<any>();
  


  const handleFileChange = (file: File | null, imageNumber: number) => {
    setImageSelected(imageNumber);
    console.log(imageNumber);
  };

  const handleLogoImage = (file: File | null) => {};
  const handleCoverImage = (file: File | null) => {};

  const [dayState, setDayState] = useState<OpenSalonDays[]>([]);  
  const handleDayChange = (
    active: boolean | null,
    name: string,
    openFrom: string,
    openTo: string
  ) => {
    console.log(active, name, openFrom, openTo);
  };

  return (
    <>
      <div className="flex gap-4 flex-nowrap w-full h-full p-8">
        <div className="flex flex-col justify-around gap-2 h-full w-1/3 p-4 shadow-lg shadow-breta-blue/40 border-2 border-gray-300 rounded-xl">
        <label
            className="block my-0 mx-auto justify-center shrink w-1/2 text-breta-blue text-sm font-semibold leading-6 select-none"
            htmlFor=""
          >
            Asigna un Logotipo.
            <label
              className="flex flex-col relative aspect-square text-breta-blue text-sm font-semibold leading-6 border-2 border-breta-blue border-dashed rounded-lg cursor-pointer"
              htmlFor="ProfilePictureUpload"
            >
              <div className="w-full h-full bg-breta-light-gray flex items-center justify-center">
                <Icons.AddImage />
              </div>
              <input
                className="hidden"
                name="ProfilePictureUpload"
                placeholder=""
                type="file"
                onChange={() => handleLogoImage}
              />
            </label>
          </label>
          <label
            className="relative text-breta-blue block text-sm font-semibold leading-6 select-none"
            htmlFor=""
          >
            Nombre*
            <input
              placeholder="Nombre del Salón..."
              className="w-full px-2 text-sm ring-1 ring-gray-300 rounded-md p-2 bg-breta-light-gray focus:outline-0 placeholder:text-sm tracking-wider placeholder:text-gray-500 "
              type="teFxt"
              value={salonDetails?.full_name}
              onChange={(e)=> setSalonDetails({salonDetails:e.target.value})}
            />
          </label>
          <label
            className="relative text-breta-blue block text-sm font-semibold leading-6 select-none"
            htmlFor=""
          >
            Teléfono*
            <input
              placeholder="Número de contacto... "
              className="w-full px-2 text-sm ring-1 ring-gray-300 rounded-md p-2 bg-breta-light-gray focus:outline-0 placeholder:text-sm tracking-wider placeholder:text-gray-500 "
              type="text"
            />
          </label>
          <label
            className="relative text-breta-blue block text-sm font-semibold leading-6 select-none"
            htmlFor=""
          >
            Email*
            <input
              placeholder="Correo electrónico..."
              className="w-full px-2 text-sm ring-1 ring-gray-300 rounded-md p-2 bg-breta-light-gray focus:outline-0 placeholder:text-sm tracking-wider placeholder:text-gray-500 "
              type="text"
            />
          </label>
          <label
            className="relative text-breta-blue block text-sm font-semibold leading-6 select-none"
            htmlFor=""
          >
            Responsable
            <input
              placeholder="Administrador..."
              className="w-full px-2 text-sm ring-1 ring-gray-300 rounded-md p-2 bg-breta-light-gray focus:outline-0 placeholder:text-sm tracking-wider placeholder:text-gray-500 "
              type="text"
            />
          </label>
          <label
            className="relative text-breta-blue block text-sm font-semibold leading-6 select-none"
            htmlFor=""
          >
            Calle/Avenida*
            <input
              placeholder="Calle/Avenida/Andador..."
              className="w-full px-2 text-sm ring-1 ring-gray-300 rounded-md p-2 bg-breta-light-gray focus:outline-0 placeholder:text-sm tracking-wider placeholder:text-gray-500 "
              type="text"
            />
          </label>
          <label
            className="relative text-breta-blue block text-sm font-semibold leading-6 select-none"
            htmlFor=""
          >
            Ciudad*
            <input
              placeholder="Ciudad..."
              className="w-full px-2 text-sm ring-1 ring-gray-300 rounded-md p-2 bg-breta-light-gray focus:outline-0 placeholder:text-sm tracking-wider placeholder:text-gray-500 "
              type="text"
            />
          </label>
          <div className="flex gap-4">
            <label
              className="relative text-breta-blue block text-sm font-semibold leading-6 select-none"
              htmlFor=""
            >
              Número*
              <input
                placeholder="Ext..."
                className="w-full px-2 text-sm ring-1 ring-gray-300 rounded-md p-1 bg-breta-light-gray focus:outline-0 placeholder:text-sm tracking-wider placeholder:text-gray-500 "
                type="text"
              />
            </label>
            <label
              className="relative text-breta-blue block text-sm font-semibold leading-6 select-none"
              htmlFor=""
            >
              Interior
              <input
                placeholder="Int..."
                className="w-full px-2 text-sm ring-1 ring-gray-300 rounded-md p-1 bg-breta-light-gray focus:outline-0 placeholder:text-sm tracking-wider placeholder:text-gray-500 "
                type="text"
              />
            </label>
            <label
              className="relative text-breta-blue block text-sm font-semibold leading-6 select-none"
              htmlFor=""
            >
              Código Postal
              <input
                placeholder="C.P."
                className="w-full px-2 text-sm ring-1 ring-gray-300 rounded-md p-1 bg-breta-light-gray focus:outline-0 placeholder:text-sm tracking-wider placeholder:text-gray-500 "
                type="text"
              />
            </label>
          </div>
        </div>
        <div className="flex flex-col justify-around gap-2 h-full w-1/3 p-4 shadow-lg shadow-breta-blue/40 border-2 border-gray-300 rounded-xl">
          <label
            className="block my-0 mx-auto justify-center shrink w-full text-breta-blue text-sm font-semibold leading-6 select-none"
            htmlFor=""
          >
            Asigna una Portada
            <label
              className="flex flex-col relative aspect-video text-breta-blue text-sm font-semibold leading-6 border-2 border-breta-blue border-dashed rounded-lg cursor-pointer"
              htmlFor="ProfilePictureUpload"
            >
              <div className="w-full h-full bg-breta-light-gray flex items-center justify-center">
                <Icons.AddImage />
              </div>
              <input
                className="hidden"
                name="ProfilePictureUpload"
                placeholder=""
                type="file"
                onChange={() => handleCoverImage}
              />
            </label>
          </label>
          <label
            className="relative text-breta-blue block text-sm font-semibold leading-6 select-none"
            htmlFor=""
          >
            Escoge hasta 9 fotografías para tu galería
            <div className="grid grid-cols-3 gap-4">
              {Array(9)
                .fill(0)
                .map((_, index) => (
                  <UploadImageSquare
                    key={index}
                    imageNumber={index}
                    onFileChange={handleFileChange}
                  />
                ))}
            </div>
          </label>
        </div>
        <div className="flex flex-col justify-around gap-2 h-full w-1/3 p-4 shadow-lg shadow-breta-blue/40 border-2 border-gray-300 rounded-xl">
          <div className=" justify-center shrink w-full text-breta-blue text-sm font-semibold leading-6 select-none">
            Horario
          </div>
          <div className="flex flex-col justify-around gap-2 h-full">
            <DaySelector 
              day="Lunes"
              handleDayChange={handleDayChange}
              />
            <DaySelector 
              day="Martes"
              handleDayChange={handleDayChange}
              />
            <DaySelector 
              day="Miercoles"
              handleDayChange={handleDayChange}
              />
            <DaySelector 
              day="Jueves"
              handleDayChange={handleDayChange}
              />
            <DaySelector 
              day="Viernes"
              handleDayChange={handleDayChange}
              />
            <DaySelector 
              day="Sabado"
              handleDayChange={handleDayChange}
              />
            <DaySelector 
              day="Domingo"
              handleDayChange={handleDayChange}
              />
            {/* <label className="relative inline-flex items-center mb-5 cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="w-9 h-5 bg-breta-gray peer-focus:outline-none rounded-full peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-breta-blue"></div>
              <span className="ml-3 text-sm font-medium text-breta-blue">
                Lunes
              </span>
            </label>
            <label className="relative inline-flex items-center mb-5 cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="w-9 h-5 bg-breta-gray peer-focus:outline-none rounded-full peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-breta-blue"></div>
              <span className="ml-3 text-sm font-medium text-breta-blue">
                Martes
              </span>
            </label>
            <label className="relative inline-flex items-center mb-5 cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="w-9 h-5 bg-breta-gray peer-focus:outline-none rounded-full peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-breta-blue"></div>
              <span className="ml-3 text-sm font-medium text-breta-blue">
                Miercoles
              </span>
            </label>
            <label className="relative inline-flex items-center mb-5 cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="w-9 h-5 bg-breta-gray peer-focus:outline-none rounded-full peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-breta-blue"></div>
              <span className="ml-3 text-sm font-medium text-breta-blue">
                Jueves
              </span>
            </label>
            <label className="relative inline-flex items-center mb-5 cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="w-9 h-5 bg-breta-gray peer-focus:outline-none rounded-full peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-breta-blue"></div>
              <span className="ml-3 text-sm font-medium text-breta-blue">
                Viernes
              </span>
            </label>
            <label className="relative inline-flex items-center mb-5 cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="w-9 h-5 bg-breta-gray peer-focus:outline-none rounded-full peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-breta-blue"></div>
              <span className="ml-3 text-sm font-medium text-breta-blue">
                Sabado
              </span>
            </label>
            <label className="relative inline-flex items-center mb-5 cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="w-9 h-5 bg-breta-gray peer-focus:outline-none rounded-full peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-breta-blue"></div>
              <span className="ml-3 text-sm font-medium text-breta-blue">
                Domingo
              </span>
            </label> */}
          </div>
          <button className="text-sm py-5 ring-1 tracking-wide font-bold ring-gray-300 bg-breta-blue hover:bg-breta-dark-blue rounded-md px-6 focus:outline-0 placeholder:text-sm text-gray-100">
            Guardar Cambios
          </button>
        </div>
      </div>
    </>
  );
};
export default SalonCustomization;
