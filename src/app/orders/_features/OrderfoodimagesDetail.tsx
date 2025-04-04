/* eslint-disable @next/next/no-img-element */


import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ChevronDown } from "lucide-react"

type Props = {
    item : item[]
}
type item = {
    food : food
    quantity: number
}
type food = {
    foodName : string,
    image : string
}
 
export const OrderfoodImage = ({item} : Props) => {
    return(
        <Popover>
      <PopoverTrigger asChild>
        <ChevronDown/>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        {item.map((item: item, index ) => (
            <div key={index} className="flex w-[263px] justify-between items-center mt-[10px]">
                <div className="flex h-full gap-2 ">
                    <div className="overflow-hidden w-[80px] h-[60px] rounded-md flex ">
                        <img src={item.food?.foodName ? item.food.image : "" } alt="food" />
                    </div>
                    <div className="h-[60px] flex items-center ">
                        <p>{item.food?.foodName}</p>
                    </div>
                </div>
                <div>x{item.quantity}</div>
            </div>
        ))}
      </PopoverContent>
    </Popover>
    )
}