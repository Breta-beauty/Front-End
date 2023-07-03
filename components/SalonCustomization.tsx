"use client";
import { useState, useEffect } from "react";
import { getSalonById } from "@/services/Salons";
import { SendLogo, SendWallpaper } from "@/services/Images";
import { ChangeEvent } from "react";
import { UpdateSalon } from "@/services/Salons";
import DaySelector from "./UI/DaySelector";
import UploadImage from "./UI/UploadImage";
import { Bowlby_One_SC } from "next/font/google";
const IconPack = require("../public/icons/Icons");
const Icons = new IconPack();
interface WeeklykSchedule {
  lunes: {
    open: boolean;
    openFrom: string;
    openTo: string;
  };
  martes: {
    open: boolean;
    openFrom: string;
    openTo: string;
  };
  miercoles: {
    open: boolean;
    openFrom: string;
    openTo: string;
  };
  jueves: {
    open: boolean;
    openFrom: string;
    openTo: string;
  };
  viernes: {
    open: boolean;
    openFrom: string;
    openTo: string;
  };
  sabado: {
    open: boolean;
    openFrom: string;
    openTo: string;
  };
  domingo: {
    open: boolean;
    openFrom: string;
    openTo: string;
  };
}
const scheduleInitialValue: WeeklykSchedule = {
  lunes: {
    open: false,
    openFrom: "0",
    openTo: "0",
  },
  martes: {
    open: false,
    openFrom: "0",
    openTo: "0",
  },
  miercoles: {
    open: false,
    openFrom: "0",
    openTo: "0",
  },
  jueves: {
    open: false,
    openFrom: "0",
    openTo: "0",
  },
  viernes: {
    open: false,
    openFrom: "0",
    openTo: "0",
  },
  sabado: {
    open: false,
    openFrom: "0",
    openTo: "0",
  },
  domingo: {
    open: false,
    openFrom: "0",
    openTo: "0",
  },
};
export interface SalonData {
  full_name: string;
  type: string;
  email: string;
  cellphone: string;
  profile: {
    location: SalonLocation;
    profile_picture: string;
    wallpaper: string;
    schedule: WeeklykSchedule;
    image_gallery: string[];
  };
}
interface SalonLocation {
  street: string;
  city: string;
  interiorNumber: string;
  exteriorNumber: string;
  postalCode: string;
}
const SalonCustomization = () => {
  const salonId = "3b8493e6-f916-4ef2-821b-df3b77a4a431";
  const [imageGalery, setImageGalery] = useState<File[]>([]);
  const [galleryStringImages, setGalleryStringImages] = useState<string[]>([]);
  const [logoImage, setLogoImage] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [logoImageString, setLogoImageString] = useState<string>("");
  const [coverImageString, setCoverImageString] = useState<string>("");
  const [blobs, setBlobs] = useState({wallpaper:"",cover:"",gallery:[]})
  const [weeklykSchedule, setWeeklykSchedule] =
    useState<WeeklykSchedule>(scheduleInitialValue);
  const [salonLocation, setSalonLocation] = useState<SalonLocation>(
    {} as SalonLocation
  );
  const [salonDetails, setSalonDetails] = useState<SalonData>({} as SalonData);

  useEffect(() => {
    fetchSalonData();
  }, []);
  useEffect(() => {
    setSalonDetails((prevSalonDetails) => ({
      ...prevSalonDetails,
      ["profile"]: {
        ...prevSalonDetails["profile"],
        image_gallery: galleryStringImages,
        location: salonLocation,
        schedule: weeklykSchedule,
      },
    }));
  }, [weeklykSchedule, galleryStringImages, salonLocation]);

  const fetchSalonData = async () => {
    const request = await getSalonById(salonId);
    console.log(request);
    setSalonDetails(request.data.user);
  };

  const handleImageUpload = async (
    e: ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    
    if (e.target.files && e.target.files[0]) {
      const image: File = e.target.files[0];
      const imageBlob = createBlob(image)
      if (type == "wallpaper") {
        setCoverImage(image);
        const Wallpaper = await SendWallpaper(image as File, salonId);
        setCoverImageString(Wallpaper);
      } else {
        setLogoImage(image);
        const Logo = await SendLogo(image as File, salonId);
        setLogoImageString(Logo);
      }
    } else {
    }
  };

  const handleImageGaleryUpload = (
    newImage: File | null,
    imageIndex: number
  ) => {
    if (newImage != null) {
      const imageBlob = createBlob(newImage)
      if (imageGalery.length == 0) {
        setImageGalery([newImage]);
        setGalleryStringImages([imageBlob]);
      } else if (imageIndex + 1 > imageGalery.length) {
        setImageGalery([...imageGalery, newImage]);
        setGalleryStringImages([...galleryStringImages, imageBlob]);
      } else {
        const newGalleryArray = imageGalery.map((image, index) => {
          if (imageIndex == index) {
            return newImage;
          } else {
            return image;
          }
        });
        const newGalleryStringImages = galleryStringImages.map(
          (image, index) => {
            if (imageIndex == index) {
              return imageBlob;
            } else {
              return image;
            }
          }
        );
        setImageGalery(newGalleryArray);
        setGalleryStringImages(newGalleryStringImages);
      }
    }
  };

  const handleDayChange = (
    key: string,
    type: string,
    event: boolean | string
  ) => {
    switch (type) {
      case "day":
        setWeeklykSchedule((prevSchedule) => ({
          ...prevSchedule,
          [key]: {
            ...prevSchedule[key as keyof WeeklykSchedule],
            open: event,
          },
        }));
        break;
      case "from":
        setWeeklykSchedule((prevSchedule) => ({
          ...prevSchedule,
          [key]: {
            ...prevSchedule[key as keyof WeeklykSchedule],
            openFrom: event,
          },
        }));
        break;
      case "to":
        setWeeklykSchedule((prevSchedule) => ({
          ...prevSchedule,
          [key]: {
            ...prevSchedule[key as keyof WeeklykSchedule],
            openTo: event,
          },
        }));
        break;
    }
  };
  const createBlob = (image:File, ) =>{
    return URL.createObjectURL(image);
  }
  const updateSalon = async () => {
    try {
      const response = await UpdateSalon(salonDetails, salonId);
      if (response) {
        console.log("something");
        await fetchSalonData();
      }
    } catch (err) {
      await fetchSalonData();
      console.log(err);
      return err;
    }
  };

  return (
    <>
      <div className="flex gap-4 flex-nowrap w-full h-full p-8">
        <div className="flex flex-col justify-around gap-2 h-full w-1/3 p-4 shadow-lg shadow-breta-blue/40 border-2 border-gray-300 rounded-xl">
          <label
            className="block my-0 mx-auto justify-center shrink w-1/2 text-breta-blue text-sm font-semibold leading-6 select-none"
            htmlFor="ProfilePictureUpload"
          >
            Asigna un Logotipo.
            {salonDetails.profile && salonDetails.profile.profile_picture ? (
              <>
                <label className="flex flex-col relative aspect-square text-breta-blue text-sm font-semibold leading-6 cursor-pointer">
                  <div className="overflow-hidden w-full h-full bg-breta-light-gray flex items-center justify-center rounded-lg">
                    <img
                      src={salonDetails.profile.profile_picture}
                      alt="Profile Picture"
                      className="rounded-lg"
                    />
                  </div>
                  <input
                    className="hidden"
                    name="ProfilePictureUpload"
                    type="file"
                    onChange={(e) => handleImageUpload(e, "logo")}
                  />
                </label>
              </>
            ) : (
              <>
                <label className="flex flex-col relative aspect-square text-breta-blue text-sm font-semibold leading-6 cursor-pointer border-2 border-breta-gray border-dashed rounded-lg">
                  <div className=" overflow-hidden w-full h-full bg-breta-light-gray flex items-center justify-center">
                    <Icons.AddImage />
                  </div>
                  <input
                    className="hidden"
                    name="ProfilePictureUpload"
                    type="file"
                    onChange={(e) => handleImageUpload(e, "logo")}
                  />
                </label>
              </>
            )}
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
              value={salonDetails.full_name ? salonDetails.full_name : ""}
              onChange={(e) =>
                setSalonDetails({ ...salonDetails, full_name: e.target.value })
              }
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
              type="number"
              value={salonDetails.cellphone ? salonDetails.cellphone : ""}
              onChange={(e) =>
                setSalonDetails({ ...salonDetails, cellphone: e.target.value })
              }
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
              value={salonDetails.email ? salonDetails.email : ""}
              onChange={(e) =>
                setSalonDetails({ ...salonDetails, email: e.target.value })
              }
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
              value={salonDetails.full_name ? salonDetails.full_name : ""}
              onChange={(e) =>
                setSalonDetails({ ...salonDetails, full_name: e.target.value })
              }
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
              value={salonLocation.street ? salonLocation.street : ""}
              onChange={(e) =>
                setSalonLocation({ ...salonLocation, street: e.target.value })
              }
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
              value={salonLocation.city ? salonLocation.city : ""}
              onChange={(e) =>
                setSalonLocation({ ...salonLocation, city: e.target.value })
              }
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
                type="number"
                value={
                  salonLocation.exteriorNumber
                    ? salonLocation.exteriorNumber
                    : ""
                }
                onChange={(e) =>
                  setSalonLocation({
                    ...salonLocation,
                    exteriorNumber: e.target.value,
                  })
                }
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
                type="number"
                value={
                  salonLocation.interiorNumber
                    ? salonLocation.interiorNumber
                    : ""
                }
                onChange={(e) =>
                  setSalonLocation({
                    ...salonLocation,
                    interiorNumber: e.target.value,
                  })
                }
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
                type="number"
                value={salonLocation.postalCode ? salonLocation.postalCode : ""}
                onChange={(e) =>
                  setSalonLocation({
                    ...salonLocation,
                    postalCode: e.target.value,
                  })
                }
              />
            </label>
          </div>
        </div>
        <div className="flex flex-col justify-between h-full w-1/3 p-4 shadow-lg shadow-breta-blue/40 border-2 border-gray-300 rounded-xl">
          {salonDetails.profile && salonDetails.profile.profile_picture ? (
            <>
              <label className="flex flex-col relative aspect-video text-breta-blue text-sm font-semibold leading-6 rounded-lg cursor-pointer">
                Asigna una Portada
                <div className="w-full h-full bg-breta-light-gray flex items-center justify-center rounded-lg">
                  <img
                    src={salonDetails.profile.wallpaper}
                    alt="Profile Picture"
                    className="rounded-lg"
                  />
                </div>
                <input
                  className="hidden"
                  name="WallpaperPictureUpload"
                  type="file"
                  onChange={(e) => handleImageUpload(e, "wallpaper")}
                />
              </label>
            </>
          ) : (
            <>
              <label className="flex flex-col relative aspect-video text-breta-blue text-sm font-semibold leading-6 border-2 border-breta-gray border-dashed rounded-lg cursor-pointer">
                <div className="w-full h-full bg-breta-light-gray flex items-center justify-center">
                  <Icons.AddImage />
                </div>
                <input
                  className="hidden"
                  name="WallpaperPictureUpload"
                  type="file"
                  onChange={(e) => handleImageUpload(e, "wallpaper")}
                />
              </label>
            </>
          )}
          <label className="text-breta-blue text-sm font-semibold leading-6 select-none flex-0">
            Escoge hasta 9 fotografías para tu galería
            <div className="grid grid-cols-3 gap-4">
              {Array(9)
                .fill(0)
                .map((_, index) => (
                  <>
                    {galleryStringImages[index] == null ? (
                      <div className="aspect-square">
                        <UploadImage
                          key={"square" + index}
                          imageNumber={index}
                          onFileChange={handleImageGaleryUpload}
                        />
                      </div>
                    ) : (
                      <div className="aspect-square">
                        <UploadImage
                          image={galleryStringImages[index]}
                          key={index}
                          imageNumber={index}
                          onFileChange={handleImageGaleryUpload}
                        />
                      </div>
                    )}
                  </>
                ))}
            </div>
          </label>
        </div>
        <div className="flex flex-col justify-around gap-2 h-full w-1/3 p-4 shadow-lg shadow-breta-blue/40 border-2 border-gray-300 rounded-xl">
          <div className=" justify-center shrink w-full text-breta-blue text-sm font-semibold leading-6 select-none">
            Horario
          </div>
          <div className="flex flex-col justify-around gap-2 h-full">
            <DaySelector day="lunes" handleDayChange={handleDayChange} />
            <DaySelector day="martes" handleDayChange={handleDayChange} />
            <DaySelector day="miercoles" handleDayChange={handleDayChange} />
            <DaySelector day="jueves" handleDayChange={handleDayChange} />
            <DaySelector day="viernes" handleDayChange={handleDayChange} />
            <DaySelector day="sabado" handleDayChange={handleDayChange} />
            <DaySelector day="domingo" handleDayChange={handleDayChange} />
          </div>
          <button
            onClick={updateSalon}
            className="text-sm py-5 ring-1 tracking-wide font-bold ring-gray-300 bg-breta-blue hover:bg-breta-dark-blue rounded-md px-6 focus:outline-0 placeholder:text-sm text-gray-100"
          >
            Guardar Cambios
          </button>
        </div>
      </div>
    </>
  );
};
export default SalonCustomization;
