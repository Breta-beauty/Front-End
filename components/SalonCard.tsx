export default function SalonCard() {

  return (
    <>
      <div className="w-full p-1 h-24 shadow-breta-shadow flex gap-4 items-center rounded-lg">
      <div className="overflow-hidden h-full w-1/3 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-lg">
        </div>
        <div className="flex-col w-2/3">
          <div className="text-breta-dark-blue font-bold">Vanity;Hair Salon</div>
          <div>
            <div></div>
            <div className="text-overflow: ellipsis text-breta-blue">
              Av. Ladrón de Guevara #4586 Zapopan
            </div>
          </div>
          <div className=" flex gap-4">
            <div className="text-breta-green">Abierto</div>
            <div>
              <span className="text-breta-yellow">★</span> 4.5
            </div>
            <div>
              <div></div>
              <div className=" text-breta-gray">5 min, 7 km</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
