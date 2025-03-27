"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useOrder } from "@/provider/OrderProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { OrderfoodImage } from "./OrderfoodimagesDetail";

export const OrderHeader = () => {
  const { orders, refetchOrder } = useOrder();
  const hadnleOrderStatus = async (status: string, id: string) => {
    try {
      const res = await axios.put(`http://localhost:5000/order/${id}`, {
        status: status,
      });
      console.log(res.data);
      await refetchOrder();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="justify-between items-center bg-[#E4E4E7] w-full">
        <div className="bg-[#FFFF] rounded-xl w-full mt-[12px]"></div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]"></TableHead>
              <TableHead>№</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Food</TableHead>
              <TableHead>Date </TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Delivery Address</TableHead>
              <TableHead>Delivery state</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order, index) => (
              <TableRow key={index}>
                <TableCell>
                  <input type="checkbox" />
                </TableCell>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{order.user.email}</TableCell>
                <TableCell className="flex">
                  food
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <ChevronLeft />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <OrderfoodImage item={order.foodOrderItems} />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
                <TableCell>
                  {order.createdAt.toString().split("T")[0]}
                </TableCell>
                <TableCell>{order.totalPrice}$</TableCell>
                <TableCell>{order.user.address}</TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="mt-[7px] rounded-full border-red-500 px-2 py-[9px] border border-dashed w-[80px] h-[35px] text-white">
                      {order.status}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="h-fit">
                    <div className="flex items-center justify-center flex flex-col p-[4px] rounded-xl">
                      <Button
                        className="w-[100px] h-[16px] px-2 py-[10px] gap-[10px] bg-[#EF4444] border rounded-full mt-[5px] bg-inherit text-red-500 border border-red-300 hover:bg-red-300/30"
                        onClick={() => hadnleOrderStatus("PENDING", order._id)}
                      >
                        PENDING
                      </Button>
                      <Button
                        className="w-[100px] h-[16px] px-2 py-[10px] gap-[10px] text-sm rounded-full bg-inherit text-green-500 border border-green-300 hover:bg-green-300/30 rounded-full mt-[5px]"
                        onClick={() =>
                          hadnleOrderStatus("DELIVERED", order._id)
                        }
                      >
                        DELIVERED
                      </Button>
                      <Button
                        className="w-[100px] h-[16px] px-2 py-[10px] gap-[10px] border rounded-full mt-[5px] bg-inherit text-gray-500 border border-gray-300 hover:bg-gray-300/30"
                        onClick={() =>
                          hadnleOrderStatus("CANCELLED", order._id)
                        }
                      >
                        CANCELLED
                      </Button>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
