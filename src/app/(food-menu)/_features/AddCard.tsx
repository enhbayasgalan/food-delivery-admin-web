"use client";

import axios from "axios";
import { PureComponent, useEffect, useState } from "react";
import { Newfood } from "./NewFood";

type Props = {
  category: Category;
  categories : Response[]
};
type Category = {
  categoryName: string;
  _id: string;
};
type food = {
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  category: string;
  _id : string
};
type Response = {
  categoryName : string,
  _id : string
}

export const AddCards = ({ category, categories,}: Props) => {
  const [foods, setFoods] = useState<food[]>([]);
  
  const getFood = async () => {
    try {
      const repo = await axios.get(`http://localhost:5000/food/${category._id}`);
      console.log(repo);
      setFoods(repo.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{
    getFood()
  },[])
  return (
    <>
      {foods.map((food: food, index: number) => (
        <div
          key={index}
          className="w-[365px] h-[310px] px-4 py-8 flex-col border border-[#E4E4E7] rounded-md"
        ><div className="w-full h-[60%] overflow-hidden flex items-center rounded-sm ">
          <img src={food.image}  className="w-full h-auto  flex-end gap-[10px]" />
          <Newfood getFood={getFood}  food={food} categories={categories}/>
          </div>
          <div className="w-full flex justify-between gap-[8px] mt-[15px]">
            <p className="text-[#EF4444] text-lg font-semibold">
                {food.foodName}
            </p>
            <p className="font-medium text-lg ">{food.price}$</p>
          </div>
          <div className="text-sm font-normal">{food.ingredients}</div>
        </div> 
      ))}
    </>
  );
};
