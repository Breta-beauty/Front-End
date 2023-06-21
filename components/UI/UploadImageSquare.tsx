'use client'
import { ChangeEvent } from "react";
const IconPack = require("../../public/icons/Icons");
const Icons = new IconPack();

interface UploadImageSquareProps {
  imageNumber:number,
  onFileChange: (file: File | null, imageNumber:number) => void;
}

const UploadImageSquare: React.FC<UploadImageSquareProps> = ({ imageNumber, onFileChange }) => {

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    onFileChange(file || null, imageNumber);
  };

  return (
    <label htmlFor={"ProfilePictureUpload"+imageNumber}>
      <label
        htmlFor={"ProfilePictureUpload"+imageNumber}
        className="flex flex-col relative aspect-square text-breta-blue text-sm font-semibold leading-6 border-2 border-breta-blue border-dashed rounded-lg cursor-pointer"
      >
        <div className="w-full h-full bg-breta-light-gray flex items-center justify-center">
          <Icons.AddImage />
        </div>
        <input
          id={"ProfilePictureUpload"+imageNumber}
          name={"ProfilePictureUpload"+imageNumber}
          className="hidden"
          type="file"
          accept="image/*"
          onChange={handleInputChange}
        />
      </label>
    </label>
  );
};

export default UploadImageSquare;
