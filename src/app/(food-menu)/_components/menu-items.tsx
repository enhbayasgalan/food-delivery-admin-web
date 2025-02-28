import { Button } from "@/components/ui/button"

export const MenuItems = () => {
    return(
        <div className="w-full h-fit gap-3">
            <Button className="w-[143px] h-fit rounded-full gap-[8px] text-black bg-[none]">
                <p className=" font-medium text-sm">All Dishes</p>
                <Button className="w-[39px] h-[20px] rounded-full gap-[10px]">
                    <p className="font-semibold text-xs">112</p>
                </Button>
            </Button>
        </div>
    ) 
}