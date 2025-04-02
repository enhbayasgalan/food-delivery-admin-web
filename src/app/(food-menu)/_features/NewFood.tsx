/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { Button } from "@/components/ui/button";
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
import axios from "axios";
import { Pencil } from "lucide-react";
import { Trash } from "lucide-react";
import { useState } from "react";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import { useFood } from "@/provider/FoodProvider";

type Props = {
  food: Food;
  categories: Response[];
};

type Food = {
  foodName: string;
  price: number;
  image: string | null;
  ingredients: string;
  _id: string;
  category: string;
};

type Response = {
  categoryName: string;
  _id: string;
};
export const Newfood = ({ food, categories }: Props) => {
  const { putFood } = useFood();
  const [putfood, setPutfood] = useState({
    foodName: food.foodName,
    price: food.price,
    image: food.image,
    ingredients: food.ingredients,
    category: food.category,
  });

  const PutImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type == "file" && e.target.files) {
      const file = e.target.files[0];
      try {
        if (file) {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "foodimage");

          const response = await fetch(
            `https://api.cloudinary.com/v1_1/dovchxnto/auto/upload`,
            {
              method: "POST",
              body: formData,
            }
          );

          const result = await response.json();
          console.log(result);
          setPutfood({ ...putfood, image: result.secure_url });
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  const deleteFood = async () => {
    try {
      const res = await axios.delete(
        `https://food-delivery-service-0wy6.onrender.com/food/${food._id}`
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  const notify = () => toast("Food Updated");
  const notify2 = () => toast("Dish successfully deleted.");
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex w-[44px] h-[44px] px-[8px] py-[16px] justify-center absolute items-center rounded-full bg-[#FFF]"
        >
          <Pencil stroke="#EF4444" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Dishes info</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Dish name
            </Label>
            <Input
              id="name"
              placeholder="Pedro Duarte"
              className="col-span-3"
              value={putfood.foodName}
              onChange={(e) =>
                setPutfood({ ...putfood, foodName: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Ingredients
            </Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
              value={putfood.ingredients}
              onChange={(e) =>
                setPutfood({ ...putfood, ingredients: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Dish Catgeory
            </Label>
            <select
              name="category"
              value={putfood.category}
              onChange={(e) =>
                setPutfood({ ...putfood, category: e.target.value })
              }
            >
              {categories.map((category: Response, index) => (
                <option key={index} value={category._id}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Dish Price
            </Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
              value={putfood.price}
              onChange={(e) =>
                setPutfood({ ...putfood, price: parseInt(e.target.value) })
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              image
            </Label>
            <>
              {putfood.image === null && (
                <input
                  className="p-4 border h-[150px] w-full rounded-md"
                  type="file"
                  placeholder="Choose a file or drag & drop it here"
                  onChange={(e) => PutImage(e)}
                />
              )}
              {putfood.image && (
                <div className="w-[120px] h-[150px]  flex items-center relative overflow-hidden rounded-md">
                  <img src={putfood.image} className="w-full" />
                  <Button
                    className="absolute rounded-full w-4 h-8 top-2 right-2 z-20"
                    onClick={() => setPutfood({ ...putfood, image: null })}
                  >
                    <X />
                  </Button>
                </div>
              )}
            </>
          </div>
        </div>
        <DialogFooter className="flex justify-between">
          <Button onClick={deleteFood} onClickCapture={notify2}>
            <Trash />
          </Button>
          <Button
            type="submit"
            onClick={() => putFood(food._id, putfood)}
            onClickCapture={notify}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
