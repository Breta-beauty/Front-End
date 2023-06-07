import SalonList from "@/components/SalonList";
import BottomNavDrawer from "@/components/BottomNavDrawer";

export default function UserPage() {
  //Fetch Salon Data and pass it to the List component
  const salonList = [
    {
      title: "Sunset SPA",
      address: "Av. Ladrón de Guevara #4586 Zapopan ",
      grade: 4.4,
      openState: "Abierto",
    },
    {
      title: "Lovely Lather",
      address: "Av. Ladrón de Guevara #4586 Zapopan ",
      grade: 4.4,
      openState: "Por Cerrar",
    },
    {
      title: "Andrew’s  Salon",
      address: "Av. Ladrón de Guevara #4586 Zapopan ",
      grade: 4.4,
      openState: "Cerrado",
    },
  ];

  return (
    <>
    <BottomNavDrawer/>
    <SalonList
      salonList={salonList}
      />
    </>
  );
}
