import LogoNomNom from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { LayoutDashboardIcon, SettingsIcon, TruckIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export const Navigation = () => {

  const router = useRouter()

  return (
    <div className="w-[205px] h-screen sticky top-0 flex items-center gap-10 flex-col py-9 px-5 bg-[#FFFF]">
      <div className="w-full flex gap-[10]">
        <LogoNomNom />
        <div className="flex flex-col">
          <p className="font-semibold">NomNom</p>
          <h4 className="text-[#71717A] font-normal text-xs">NomNom</h4>
        </div>
      </div>
      <div className="flex flex-col w-full h-fit gap-6">
        <Button onClick={()=> router.push('/')} className="w-full  rounded-full ">
          <LayoutDashboardIcon />
          <p className="w-[75px] h-[20px] font-medium text-sm">Food menu</p>
        </Button>
        <Button onClick={()=> router.push('/orders')} className="w-[165px]  rounded-full text-black bg-[none]">
          <TruckIcon />
          <p className="w-[75px] h-[20px] font-medium text-sm">Orders</p>
        </Button>
        <Button className="w-[165px]  rounded-full text-black bg-[none]">
          <SettingsIcon />
          <p className="w-[75px] h-[20px] font-medium text-sm">Settings</p>
        </Button>
      </div>
    </div>
  );
};
