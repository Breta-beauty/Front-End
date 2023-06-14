import OpenStateTag from "./OpenStateTag";
const IconPack = require("../public/icons/Icons");
const Icons = new IconPack();

export default function SalonCard(props:{
  title:string;
  address:string,
  grade:number,
  openState:string,
  image:string
}) {

  return (
    <>
      <div className="w-full p-1 h-24 shadow-lg shadow-breta-shadow/50 flex gap-4 rounded-lg">
        <div className="overflow-hidden h-full w-1/3 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-lg">
        </div>
        <div className="flex flex-col justify-around w-2/3">
          <div className="text-breta-dark-blue font-bold">{props.title}</div>
          <div className="flex items-center gap-2">
            <Icons.MapPoint/>
            <div>
              <div className="grow-0 line-clamp-1 text-breta-blue text-sm">
              {props.address}
              </div>
            </div>
          </div>
          <div className=" flex gap-4 text-sm">
            <OpenStateTag state={props.openState}/>
            <div className="flex items-center">
              <span className="text-breta-yellow">★</span> {props.grade}
            </div>
            {/* <div className="flex gap-2 items-center">
              <Icons.Car/>
              <div className=" text-breta-gray">5 min</div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
