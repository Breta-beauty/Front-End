import SalonCustomization from "@/components/SalonCustomization";
import SalonHeader from "@/components/SalonHeader";
import SalonSidebarNavigation from "@/components/SalonSidebarNavigation";
export default function IndexSalon() {
  return (
    <>
      <div className="flex flex-col h-[100vh]">
        <SalonHeader />
        <div className="relative flex flex-1">
          <div className="relative w-1/6">
            <SalonSidebarNavigation />
          </div>
          <div className="w-5/6 h-full">
            <SalonCustomization />
          </div>
        </div>
      </div>
    </>
  );
}
