import { MenuItems } from "../_components/menu-items"


export const Header = () => {
    return(
        <div className="w-[1171px] h-[236px] bg-[#FFFF] rounded-xl mt-[10px]">
            <p className="w-full h-fit  font-semibold text-xl ">Dishes category</p>
            <MenuItems/>
        </div>
    )
}