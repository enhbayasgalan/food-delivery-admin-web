"use client"
import { Plus } from "lucide-react"
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
import { useEffect, useState } from "react"
import axios from "axios"



type Category ={
  categoryName : string
}
export const MenuItems = () => {
    const [categories, setcategory] = useState<Category[]>([]);
    const getfood = async () => {
        try {
            const response = await axios.get("http://localhost:5000/category")
            console.log(response.data);
            setcategory(response.data)
        } catch (error) {
            console.log("Error fetching food data:", error);
            
        }
    };

    useEffect(() => {
        getfood()
    }, [])

    return(
        <div  className="w-full h-fit gap-3">
            <Button className="w-[143px] h-fit rounded-full gap-[8px] text-black bg-[none]">
                <p className=" font-medium text-sm">All Dishes</p>
                <div  className="w-[39px] h-[20px] rounded-full gap-[10px]">
                    <p className="font-semibold text-xs">112</p>
                </div>
            </Button>   
            {categories?.map((category:Category)=>(<div>
              <Button className="w-[143px] h-fit rounded-full gap-[8px] bg-[none] text-black">
              {category.categoryName}
              </Button>
              </div>))}
            <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-[36px] h-[36px] rounded-full gap-[8px] bg-[#EF4444]">
            <Plus/>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new Category</DialogTitle>
          <DialogDescription>
            
          </DialogDescription>
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
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" >Add Category</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
        </div>
    ) 
}

{/* <Button className="w-[36px] h-[36px] rounded-full gap-[8px] bg-[#EF4444]">
               <Plus/>
            </Button> */}