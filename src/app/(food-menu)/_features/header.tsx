
import { MenuItems } from "../_components/menu-items"
import { Button } from "@/components/ui/button"
import { ProductList } from "./product"



export const Header = () => {
    return(<div>
        <div className="w-[1171px] h-fit bg-[#FFFF] rounded-xl mt-[10px]">
            <p className="w-full h-fit  font-semibold text-xl ">Dishes category</p>
            <MenuItems/>
        </div>
        </div>
        
    )
}