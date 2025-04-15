/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
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
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "react-toastify";
import { useFood } from "@/provider/FoodProvider";
type Props = {
  category: Category;
};

type Category = {
  categoryName: string;
  _id: string;
};

type Food = {
  foodName: string;
  price: number;
  image: string | null;
  ingredients: string;
  category: string;
};

export const AddFoods = ({ category }: Props) => {
  const { postFood, refetchFood } = useFood();
  const [newFood, setNewfood] = useState<Food>({
    foodName: "",
    price: 0,
    image: "",
    ingredients: "",
    category: category._id,
  });
  const imageOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
          setNewfood({ ...newFood, image: result.secure_url });
        }
      } catch (err) {
        console.log(err);
        await refetchFood()
      }
    }
  };

  const notify = () => toast("New dish is being added to the menu");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-[40px] h-[40px] rounded-full bg-[#EF4444]"
        >
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new Dish to {category.categoryName}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Food Name
            </Label>
            <input
              placeholder="Type food name"
              className="col-span-3 px-3 py-2 border rounded-xl"
              onChange={(e) =>
                setNewfood({ ...newFood, foodName: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Food Price
            </Label>
            <input
              placeholder="Enter price..."
              className="col-span-3 px-3 py-2 border rounded-xl"
              onChange={(e) =>
                setNewfood({ ...newFood, price: parseInt(e.target.value) })
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Ingredients
            </Label>
            <input
              placeholder="List ingredients..."
              className="col-span-3 h-[90px] px-3 py-4 border rounded-xl"
              onChange={(e) =>
                setNewfood({ ...newFood, ingredients: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Food image
            </Label>
            {!newFood.image ? (
              <>
                <input
                  onChange={imageOnChange}
                  type="file"
                  name="profileImage"
                  className="col-span-3 h-[138px]"
                />
              </>
            ) : (
              <div>
                <img
                  src={newFood.image}
                  className="w-[416px] h-[180px] h-full rounded-md border-solid"
                />
              </div>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={() => postFood(newFood)}
            type="submit"
            onClickCapture={notify}
          >
            Add dish
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
