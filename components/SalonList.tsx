import SalonCard from "./SalonCard";
export default function SalonList(props:{
    salonList:any
}) {
    return(
        <>
        {props.salonList.map((salon:any, index:number) => {
          return (
            <div className="mb-4" key={index}>
              <SalonCard
                title={salon.title}
                address={salon.address}
                grade={salon.grade}
                openState={salon.openState}
                image=""
              />
            </div>
          );
        })}
      </>
    )
};
