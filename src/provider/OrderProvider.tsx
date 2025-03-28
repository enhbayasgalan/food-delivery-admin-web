"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, ReactNode, useContext } from "react";

type OrderProviderType = {
    orders: Order[];
    refetchOrder: () => void;
};

type Order = {
    foodOrderItems: Item[];
    status: string;
    createdAt: Date;
    user: User;
    totalPrice: number;
    _id: string;
};

type Item = {
    food: Food;
    quantity: number;
};

type Food = {
    foodName: string;
    price: number;
    image: string;
    ingredients: string;
    _id: string;
};

type User = {
    email: string;
    address: string;
};

const getOrder = async (): Promise<Order[]> => {
    try {
        const response = await axios.get("https://food-delivery-service-0wy6.onrender.com/order/all");
        console.log("Orders fetched:", response.data); 
        return response.data; 
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw new Error("Failed to fetch orders"); 
    }
};

const OrderContext = createContext<OrderProviderType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
    const { data: orders = [], refetch: refetchOrder } = useQuery({
        queryKey: ["orders"],
        queryFn: getOrder, 
    });

    return (
        <OrderContext.Provider value={{ orders, refetchOrder }}>
            {children}
        </OrderContext.Provider>
    );
};

export const useOrder = () => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error("useOrder must be used within an OrderProvider"); 
    }
    return context;
};
