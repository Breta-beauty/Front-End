"use client";
import Link from 'next/link';
import { useState } from 'react';
const IconPack = require("../public/icons/Icons");
const Icons = new IconPack();

export default function Services( props: {
  services: any
}) {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

    return (
      <>
        <div className="w-full h-[10%] bg-breta-light-gray border-b-2 border-breta-gray">
          <div className='flex items-center justify-end'>
            <label htmlFor="toggle" className="flex items-center cursor-pointer mt-7 mr-16">
              <span className={`mr-[-6rem]  font-bold z-50 ${isChecked ? 'text-white' : 'text-breta-blue'}`}>Servicios</span>
                <div className="relative">
                  <input
                    type="checkbox"
                    id="toggle"
                    className="sr-only"
                    checked={isChecked}
                    onChange={handleToggle}
                  />
                  <div className="w-64 h-8 bg-white rounded-full shadow-inner"></div>
                  <div className={`toggle-dot absolute w-32 h-8 mt-[-2rem] bg-breta-blue rounded-full shadow left-0.5 transition-transform ${isChecked ? 'translate-x-0' : 'translate-x-32'}`}></div>
                </div>
              <span className={`ml-[-6rem] font-bold z-50 ${isChecked ? 'text-breta-blue' : 'text-white'}`}>Equipos</span>
            </label>
          </div>
        </div>
        <div className="mt-5">
          {isChecked == true ? (
            <div>
              <div className='flex'>
                <div className="text-[26px] text-breta-blue font-bold ml-10">
                  Servicios
                </div>
                <div className="ml-auto mr-4">
                  <Link href={"/Salon/Servicios/AddService"}>
                    <button className="flex w-[200px] gap-4 rounded-lg bg-breta-blue text-white font-bold py-2 px-4">
                      <Icons.New />
                      Nuevo Servicio
                    </button>
                  </Link>
                </div>
              </div>
              <div className='flex flex-col items-center justify-center mt-6'>
                <div className='flex w-[90%] mb-2'>
                  <div className='w-[25%] text-breta-dark-gray text-[10px]'>
                      Nombre del servicio
                  </div>
                  <div className='w-[12.5%] text-breta-dark-gray text-[10px] ml-9'>
                    Categoria
                  </div>
                  <div className='w-[12.5%] text-breta-dark-gray text-[10px] ml-8'>
                     Locales
                  </div>
                  <div className='w-[12.5%] text-breta-dark-gray text-[10px] ml-[-.5rem]'>
                      Empleados
                  </div>
                  <div className='w-[12.5%] text-breta-dark-gray text-[10px] ml-2'>
                      Tiempo
                  </div>
                  <div className='w-[12.5%] text-breta-dark-gray text-[10px] ml-2'>
                      Precio
                  </div>
                  <div className='ml-[-4.5rem]'>
                      <Icons.Print />
                  </div>
                </div>
                {props.services.map((item: any, index: number) => {
                  const timespanValues = Object.values(item.timespan) as number[];
                  const totalSum = timespanValues.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
                  return (
                  <div className='w-full ml-36'>
                    <div className='flex w-[90%] mb-2 mt-2 key={index}'>
                      <div className='w-[25%] text-breta-dark-blue text-[14px] ml-2 mt-4 font-bold'> 
                        {item.service_name}
                      </div>
                      <div className='w-[12.5%] text-breta-dark-green text-[14px] mt-4 text-center'>
                        <div className='w-[70%] bg-breta-light-green rounded-full px-2 font-bold'>
                          {item.category}
                        </div>  
                      </div>
                      <div className='w-[12.5%] text-breta-blue text-[14px] text-center mt-4'>
                          Locales
                      </div>
                      <div className='w-[12.5%] text-breta-dark-blue text-[14px] text-center mt-4'>
                        Empleados
                      </div>
                      <div className='w-[12.5%] text-breta-dark-blue text-[14px] text-center mt-4'>
                        {totalSum} min
                      </div>
                      <div className='w-[12.5%] text-breta-dark-blue text-[14px] mt-4 text-center'>
                          $ {item.price} MXN
                      </div>
                      <div className='cursor-pointer mt-4'>
                        <Icons.Options />
                      </div>
                    </div>
                    <div>
                      <hr className='w-[85%] border-breta-light-gray top-6 sm:top-7 border-[1px] margin-2' />
                    </div>
                  </div>
                  )
                })}
              </div>
            </div>
          ): (
            <div className='flex'>
              <div className="text-[26px] text-breta-blue font-bold ml-10">
            Equipos
          </div>
          <div className="ml-auto mr-4">
            <Link href={"/Salon/Servicios/AddTeam"}>
            <button className="flex w-[200px] gap-4 rounded-lg bg-breta-blue text-white font-bold py-2 px-4">
              <Icons.New />
              Nuevo Equipo
            </button>
            </Link>
          </div>
            </div>
          )}
        </div>
      </>
    );
  }