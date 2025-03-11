import { MenuItems } from "../_components/menu-items";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import  {AddFoods}  from "./AddFood";

type Category = {
  categoryName: string;
  _id : string
};
type food ={
    foodName: string
    price: null | number
    image: string
    ingredients: string
    category : string
}

export const Header = () => {
  const [categories, setcategory] = useState<Category[]>([]);

  const getCategory = async () => {
    try {
      const response = await axios.get("http://localhost:5000/category");
      console.log(response.data);
      setcategory(response.data);
    } catch (error) {
      console.log("Error fetching food data:", error);
    }
  };
  useEffect(() => {
    getCategory();
  },[]);

  
  return (
    <div className="w-full h-fit ">
      <div className="w-[1171px] h-fit bg-[#FFFF] rounded-xl mt-[10px]">
        <p className="w-full h-fit  font-semibold text-xl ">Dishes category</p>
        <MenuItems />
      </div>
      {categories?.map((category: Category, index) => (
        <div
          key={index}
          className="bg-[#FFFF] w-[1171px] h-[300px] mt-[15px] rounded-xl px-4 py-5"
        >
          <div className="w-full h-fit gap-[8px]">
            <p className="font-medium text-xl">{category.categoryName}</p>
            <div className="flex gap-8">
            <div className="w-[270px] border border-red-500 border-dashed items-center rounded-[12px] flex flex-col px-2 py-[80px]">
              <AddFoods category={category}/>
              <p className="font-medium text-sm ">
                Add new Dish to {category.categoryName}
              </p>
            </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};


