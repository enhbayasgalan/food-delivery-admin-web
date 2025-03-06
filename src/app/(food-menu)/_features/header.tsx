import { MenuItems } from "../_components/menu-items"
import { Button } from "@/components/ui/button"
// import { ProductList } from "./product"


export const Header = () => {
    return(<div>
        <div className="w-[1171px] h-[236px] bg-[#FFFF] rounded-xl mt-[10px]">
            <p className="w-full h-fit  font-semibold text-xl ">Dishes category</p>
            <MenuItems/>
            {/* <ProductList/> */}
        </div>
        <div className="w-full h-fit rounded-xl py-5 gap-4 bg-[#FFFF] mt-[20px]">
            <p className="w-[138px] h-[28px] gap-[8px] font-semibold text-xl">Appetizers</p>
            <div className="w-full h-fit gap-4">
                <div className="w-[270.75px] h-[241px] gap-6 border-[1px] bg-[#EF4444]">
                    <Button className="w-[40px] h-[40px] rounded-full gap-[8px] bg-sky-400 top-[80px] right-[16px] left-[16px] bottom-[8px]"></Button>
                </div>
            </div>
        </div>
        </div>
    )
}