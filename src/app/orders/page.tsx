'use client'

import { Navigation } from "../(food-menu)/_components/navigation"
import { OrderHeader } from "./_features/order"

const Home = () => {
    return(
        <div className="bg-[#F4F4F5] w-full flex">
             <Navigation/>
            <OrderHeader/>
        </div>
    )
}
export default Home