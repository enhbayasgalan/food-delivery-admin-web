/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import { Newfood } from "./NewFood";
import { useFood } from "@/provider/FoodProvider";

type Props = {
  categories: Response[];
};

type Response = {
  categoryName: string;
  _id: string;
};

export const AddCards = ({ categories }: Props) => {
  const { foods } = useFood();
  return (
    <>
      {foods.map((food, index: number) => (
        <div
          key={index}
          className="w-[365px] h-[310px] px-4 py-8 flex-col border border-[#E4E4E7] rounded-md"
        >
          <div className="w-full h-[60%] overflow-hidden flex items-center rounded-sm ">
            <img
              src={food.image}
              className="w-full h-auto  flex-end gap-[10px]"
            />
            <Newfood food={food} categories={categories} />
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
