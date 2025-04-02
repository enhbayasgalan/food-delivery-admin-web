"use client";

import { QueryObserverResult, useQuery } from "@tanstack/react-query";
// import { strict } from "assert";
import axios from "axios";
// import { create } from "domain";
import { createContext, ReactNode, useContext } from "react";
type Food = {
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  _id: string;
  category: string;
};
// type Response = {
//     categoryName : string,
//     _id : string
// }
type PutFood = {
  foodName: string;
  price: number;
  image: string | null;
  ingredients: string;
  category: string;
};
type NewFood = {
  foodName: string;
  price: number;
  image: string | null;
  ingredients: string;
  category: string;
};

type FoodProvider = {
  foods: Food[];
  refetchFood: () => Promise<QueryObserverResult<Food[], Error>>;
  putFood: (foodId: string, putfood: PutFood) => Promise<void>;
  postFood: (newFood: NewFood) => Promise<void>;
};

const FoodContext = createContext<FoodProvider | null>(null);

export const FoodProvider = ({
  children,
  categoryId,
}: {
  children: ReactNode;
  categoryId: string;
}) => {
  const getFoods = async (categoryId: string) => {
    try {
      const response = await axios.get(
        `https://food-delivery-service-0wy6.onrender.com/food/${categoryId}`
      );
      console.log("Category fetched:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching category:", error);
      return [];
    }
  };

  const { data: foods = [], refetch: refetchFood } = useQuery({
    queryKey: ["foods", categoryId],
    queryFn: () => getFoods(categoryId),
    enabled: !!categoryId,
  });

  const putFood = async (foodId: string, putfood: PutFood) => {
    try {
      const res = axios.put(
        `https://food-delivery-service-0wy6.onrender.com/food/${foodId}`,
        putfood
      );
      console.log(res);
      await refetchFood();
    } catch (error) {
      console.log(error);
    }
  };
  const postFood = async (newFood: NewFood) => {
    try {
      const res = await axios.post(
        `https://food-delivery-service-0wy6.onrender.com/food`,
        newFood
      );
      console.log(res);
      await refetchFood();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <FoodContext.Provider value={{ foods, refetchFood, putFood, postFood }}>
      {children}
    </FoodContext.Provider>
  );
};
export const useFood = () => {
  const context = useContext(FoodContext);
  if (!context) {
    throw new Error("usefoods");
  }
  return context;
};
