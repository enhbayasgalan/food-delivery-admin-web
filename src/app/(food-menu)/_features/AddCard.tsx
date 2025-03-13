"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pencil } from "lucide-react";

type Props = {
  category: Category;
};
type Category = {
  categoryName: string;
  _id: string;
};
type food = {
  foodName: string;
  price: null | number;
  image: string;
  ingredients: string;
  category: string;
};

export const AddCards = ({ category }: Props) => {
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
          <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex w-[44px] h-[44px] px-[8px] py-[16px] justify-center items-center gap-[8px] rounded-full bg-[#FFF]">
         <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
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
