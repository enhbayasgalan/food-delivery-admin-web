"use client";
import { Plus } from "lucide-react";
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
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

type Category = {
  categoryName: string;
};
export const MenuItems = () => {
  const [categories, setcategory] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState("");

  const getCategory = async () => {
    try {
      const response = await axios.get("http://localhost:5000/category");
      console.log(response.data);
      setcategory(response.data);
    } catch (error) {
      console.log("Error fetching food data:", error);
    }
  };

  const postCategory = async () => {
    if (!newCategory) {
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/category", {categoryName: newCategory});
      console.log(response.data);
      getCategory()
    } catch (error) {
      console.log("Error fetching food data:", error);
    }
  };

  const notify = () => toast("New Category is being added to the menu")

  useEffect(() => {
    getCategory();
    // postCategory();
  }, []);

  return (
    <div className="w-full h-fit gap-3 flex flex-wrap">
      <Button className="w-[143px] h-fit rounded-full gap-[8px] text-black bg-[none]">
        <p className=" font-medium text-sm">All Dishes</p>
        <div className="py-[2px] text-white text-sm px-[10px] rounded-full bg-black">
          <p className="font-semibold text-xs">{categories.length + 1}</p>
        </div>
      </Button>
      {categories.length > 0 &&
        categories?.map((category: Category, index) => (
          <div key={index}>
            <Button className="w-[143px] h-fit rounded-full gap-[8px] bg-[none] text-black">
              {category.categoryName}
              <div className="bg-black py-[2px] text-white text-sm px-[10px] rounded-full">{category.categoryName.length + 1}</div>
            </Button>
          </div>
        ))}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="w-[36px] h-[36px] rounded-full gap-[8px] bg-[#EF4444]"
          >
            <Plus />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add new Category</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right">
                Category Name
              </label>
              <input
                id="name"
                placeholder="Type category name..."
                className="col-span-3 border rounded-xl h-[50px]"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={postCategory} onClickCapture={notify}>
              Add Category
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

{
  /* <Button className="w-[36px] h-[36px] rounded-full gap-[8px] bg-[#EF4444]">
               <Plus/>
            </Button> */
}
