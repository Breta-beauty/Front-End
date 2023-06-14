import BottomNavDrawer from "@/components/BottomNavDrawer";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
      <BottomNavDrawer />
    </div>
  );
}
