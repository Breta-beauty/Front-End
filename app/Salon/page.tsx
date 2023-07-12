import SalonCustomization from "@/components/SalonCustomization";
import SalonHeader from "@/components/SalonHeader";
import SalonSidebarNavigation from "@/components/SalonSidebarNavigation";
export default function Salon() {
  return (
    <>
      <div className="flex flex-col h-[100vh]">
        <SalonHeader />
        <div className="relative flex flex-1">
            <SalonSidebarNavigation />
          <div className="w-5/6 h-full flex-1">
            <SalonCustomization />
          </div>
        </div>
      </div>
    </>
  );
}
