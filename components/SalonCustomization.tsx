"use client";
import { useState, useEffect } from "react";
import { getSalonById } from "@/services/Salons";
import { SendLogo, SendWallpaper } from "@/services/Images";
import { ChangeEvent } from "react";
import { UpdateSalon } from "@/services/Salons";
import DaySelector from "./UI/DaySelector";
import UploadImage from "./UI/UploadImage";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
const IconPack = require("../public/icons/Icons");
const Icons = new IconPack();
interface ScheduleDays {
  day: string;
  open: boolean;
  from: string;
  to: string;
}
const scheduleInitialValue: ScheduleDays[] = [
  { day: "lunes", open: false, from: "", to: "" },
  { day: "martes", open: false, from: "", to: "" },
  { day: "miercoles", open: false, from: "", to: "" },
  { day: "jueves", open: false, from: "", to: "" },
  { day: "viernes", open: false, from: "", to: "" },
  { day: "sabado", open: false, from: "", to: "" },
  { day: "domingo", open: false, from: "", to: "" },
];
export interface SalonData {
  salon_name: string;
  type: string;
  email: string;
  cellphone: string;
  description: string;
  location: {};
  main_picture: string;
  schedule: [];
  wallpaper: string;
  image_gallery: string[];
}
interface SalonLocation {
  street: string;
  ciudad: string;
  interiorNumber: string;
  exteriorNumber: string;
  postalCode: string;
}
const SalonCustomization = () => {
  const salonId = localStorage.getItem("salon_id") as string;
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [imageGalery, setImageGalery] = useState<File[]>([]);
  const [galleryStringImages, setGalleryStringImages] = useState<string[]>([]);
  const [logoImage, setLogoImage] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [logoImageString, setLogoImageString] = useState<string>("");
  const [coverImageString, setCoverImageString] = useState<string>("");
  const [blobs, setBlobs] = useState({ wallpaper: "", cover: "", gallery: [] });
  const [weeklykSchedule, setWeeklykSchedule] = useState(scheduleInitialValue);
  const [salonLocation, setSalonLocation] = useState<SalonLocation>(
    {} as SalonLocation
  );
  const [salonDetails, setSalonDetails] = useState<SalonData>({} as SalonData);

  useEffect(() => {
    setLoading(true);
    if (!localStorage.getItem("token")) {
      router.push("/");
      setLoading(false);
    } else {
      fetchSalonData();
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // setSalonDetails((prevSalonDetails) => ({
    //   ...prevSalonDetails,
    //   wallpaper: coverImageString,
    //   image_gallery: galleryStringImages,
    //   main_picture: logoImageString,
    // }));
  }, [galleryStringImages, salonLocation]);

  const fetchSalonData = async () => {
    const request = await getSalonById(salonId);
    setSalonDetails(request.data.salon);
  };

  const handleImageUpload = async (
    e: ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    if (e.target.files && e.target.files[0]) {
      const image: File = e.target.files[0];
      const imageBlob = createBlob(image);
      setBlobs((prevBlobs) => ({ ...prevBlobs, cover: imageBlob }));
      if (type == "wallpaper") {
        setCoverImage(image);
        const Wallpaper = await SendWallpaper(image as File, salonId);
        setSalonDetails((prevSalonDetails) => ({
          ...prevSalonDetails,
          wallpaper: Wallpaper,
        }));
      } else {
        setLogoImage(image);
        const Logo = await SendLogo(image as File, salonId);
        setSalonDetails((prevSalonDetails) => ({
          ...prevSalonDetails,
          main_picture: Logo,
        }));
      }
    } else {
    }
  };

  const handleImageGaleryUpload = (
    newImage: File | null,
    imageIndex: number
  ) => {
    if (newImage != null) {
      const imageBlob = createBlob(newImage);
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
        const newDayChangeSchedule = weeklykSchedule.map((day) => {
          if (day.day == key) {
            return {
              ...day,
              open: event,
            };
          }
          return day;
        });
        setWeeklykSchedule(newDayChangeSchedule as ScheduleDays[]);
        break;
      case "from":
        const newFromChangeSchedule = weeklykSchedule.map((day) => {
          if (day.day == key) {
            return {
              ...day,
              from: event,
            };
          }
          return day;
        });
        setWeeklykSchedule(newFromChangeSchedule as ScheduleDays[]);
        break;
      case "to":
        const newToChangeSchedule = weeklykSchedule.map((day) => {
          if (day.day == key) {
            return {
              ...day,
              to: event,
            };
          }
          return day;
        });
        setWeeklykSchedule(newToChangeSchedule as ScheduleDays[]);
        break;
    }
  };
  const createBlob = (image: File) => {
    return URL.createObjectURL(image);
  };
  const updateSalon = async () => {
    try {
      setLoading(true);
      const response = await UpdateSalon(salonDetails, salonId);
      if (response) {
        await fetchSalonData();
        console.log(response, "bien");
      }
    } catch (err) {
      await fetchSalonData();
      console.log(err);
      return err;
    } finally {
      setLoading(false);
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
            {salonDetails && salonDetails.main_picture ? (
              <>
                <label className="flex flex-col relative aspect-square text-breta-blue text-sm font-semibold leading-6 cursor-pointer">
                  <div className="overflow-hidden w-full h-full bg-breta-light-gray flex items-center justify-center rounded-lg">
                    <img
                      src={salonDetails.main_picture}
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
              value={salonDetails.salon_name ? salonDetails.salon_name : ""}
              onChange={(e) =>
                setSalonDetails({ ...salonDetails, salon_name: e.target.value })
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
              value={salonDetails.salon_name ? salonDetails.salon_name : ""}
              onChange={(e) =>
                setSalonDetails({ ...salonDetails, salon_name: e.target.value })
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
              value={salonLocation.ciudad ? salonLocation.ciudad : ""}
              onChange={(e) =>
                setSalonLocation({ ...salonLocation, ciudad: e.target.value })
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
          {salonDetails.wallpaper && salonDetails.wallpaper ? (
            <>
              <label className="flex flex-col relative aspect-video text-breta-blue text-sm font-semibold leading-6 rounded-lg cursor-pointer">
                Asigna una Portada
                <div className="w-full h-full bg-breta-light-gray flex items-center justify-center rounded-lg">
                  <img
                    src={salonDetails.wallpaper}
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
            {loading == true ? (
              <div className="flex justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Cargando...
              </div>
            ) : (
              "Guardar Cambios"
            )}
          </button>
        </div>
      </div>
    </>
  );
};
export default SalonCustomization;
