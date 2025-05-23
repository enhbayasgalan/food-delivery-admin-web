import { MenuItems } from "../_components/menu-items";
import { useEffect, useState } from "react";
import axios from "axios";
import { AddFoods } from "./AddFood";
import { AddCards } from "./AddCard";
import { FoodProvider } from "@/provider/FoodProvider";
type Category = {
  categoryName: string;
  _id: string;
  food: food;
};
type food = {
  foodName: string;
  price: null | number;
  image: string;
  ingredients: string;
  category: string;
};

export const Header = () => {
  const [categories, setcategory] = useState<Category[]>([]);

  const getCategory = async () => {
    try {
      const response = await axios.get(
        "https://food-delivery-service-0wy6.onrender.com/category"
      );
      console.log(response.data);
      setcategory(response.data);
    } catch (error) {
      console.log("Error fetching food data:", error);
    }
  };
  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className="w-full h-fit  px-8 py-4">
      <div className="w-full h-fit bg-[#FFFF] rounded-xl mt-[10px] px-5 py-2">
        <p className="w-full h-fit  font-semibold text-xl ">Dishes category</p>
        <MenuItems />
      </div>
      {categories?.map((category: Category, index) => (
        <FoodProvider categoryId={category._id} key={index}>
          <div
            key={index}
            className="bg-[#FFFF] w-full h-fit mt-[15px] rounded-xl px-4 py-5"
          >
            <div className="w-full h-fit gap-[8px]">
              <p className="font-medium text-xl">{category.categoryName}</p>
              <div className="flex gap-8 flex-wrap">
                <div className="w-[270px]  border border-red-500 border-dashed items-center rounded-[12px] flex flex-col px-2 py-[80px]">
                  <AddFoods category={category} />
                  <p className="font-medium text-sm ">
                    Add new Dish to {category.categoryName}
                  </p>
                </div>
                <AddCards categories={categories} />
              </div>
            </div>
          </div>
        </FoodProvider>
      ))}
    </div>
  );
};
