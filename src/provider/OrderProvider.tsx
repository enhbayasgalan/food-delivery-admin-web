'use client'

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, ReactNode, useContext } from "react";

type OrderProviderType ={
    orders : Order[];
    refetchOrder :()=> void
}
type Order = {
    foodOrderItems : item[],
    status: string,
    createdAt: Date,
    user : User,
    totalPrice: number
  }
  
  type item = {
    food: food
    quantity: number
  }
  
  type food = {
    foodName: string;
    price: number;
    image: string;
    ingredients: string;
    _id : string
  }
  type User = {
    email :string
    address : string
  }
  

const getOrder:() =>void = async () => {
    try {
        const response = await axios.get(`http://localhost:5000/order/all`)
        console.log(response);
        
        return response.data
    } catch (error) {
        console.log(error);
        
    }
}

const OrderContext = createContext<OrderProviderType | undefined>(undefined);
export const OrderProvider = ({children}:{children : ReactNode})=>{
    const {data : orders=[], refetch : refetchOrder} = useQuery({
        queryKey: ["orders"],
        queryFn :()=> getOrder()
    })
return(
<OrderContext.Provider value={{orders, refetchOrder}}>
    {children}
</OrderContext.Provider>
)
}
export const useOrder = () => {
    const context = useContext(OrderContext);
    if (!context) {
      throw new Error("useCategory must be used within a CategoryProvider");
    }
    return context;
  };