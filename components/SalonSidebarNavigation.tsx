const IconPack = require("../public/icons/Icons");
const Icons = new IconPack();
export default function SalonSidebarNavigation() {
  return (
    <>
      <aside className="absolute left-0 bottom-0 h-full w-full flex flex-col bg-breta-light-gray px-4">
        <div className="flex flex-col justify-between gap-4 h-full font-semibold tracking-wide text-breta-blue">
          <div>
            <div className="w-full h-16 flex justify-center items-center rounded-md cursor-pointer hover:bg-breta-gray">
              <div>Menu</div>
            </div>
            <hr className="bg-breta-gray text-breta-gray h-[2px] mb-5" />
            <hr className="solid" />
            <div className="flex flex-col gap-10">
              <div>
                <div className="relative w-full p-2 pl-20 mb-5 rounded-md hover:bg-breta-gray cursor-pointer">
                  <div className="">Citas</div>
                  <div className="absolute left-8 top-2">
                    <Icons.Calendar />
                  </div>
                </div>
                <hr className="bg-breta-gray text-breta-gray h-[2px]" />
              </div>
              <div className="flex flex-col gap-10">
                <div className="relative w-full p-2 rounded-md pl-20 cursor-pointer hover:bg-breta-gray">
                  <div className="">Servicios</div>
                  <div className="absolute left-5 top-2">
                    <Icons.SalonChairIconSmall />
                  </div>
                </div>
                <div className="relative w-full p-2 rounded-md pl-20 cursor-pointer hover:bg-breta-gray">
                  <div className="">Promociones</div>
                  <div className="absolute left-6 top-2">
                    <Icons.Sale />
                  </div>
                </div>
                <div className="relative w-full p-2 rounded-md pl-20 cursor-pointer hover:bg-breta-gray">
                  <div className="">Clientes</div>
                  <div className="absolute left-6 top-2">
                    <Icons.Calendar />
                  </div>
                </div>
                <div className="relative w-full p-2 rounded-md pl-20 cursor-pointer hover:bg-breta-gray">
                  <div className="">Equipo</div>
                  <div className="absolute left-6 top-2">
                    <Icons.Team />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>Soporte</div>
      </aside>
    </>
  );
}
