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
import { DatePickerDemo } from "./Date";
import { DeliverStatus } from "./DeliveryState";
import { useState } from "react";

export const OrderHeader = () => {
  const { orders, refetchOrder } = useOrder();
  const [checkedOrders, setCheckedOrders] = useState<string[]>([]);
  const hadnleOrderStatus = async (status: string, id: string) => {
    try {
      const res = await axios.put(`https://food-delivery-service-0wy6.onrender.com/order`, {
        status: status,
        id : [id]
      });
      console.log(res.data);
      await refetchOrder();
    } catch (error) {
      console.log(error);
    }
  };
  const checkOrder = (id:string) => {
    if (checkedOrders.includes(id)) {
      const filterorders = checkedOrders.filter((order)=>order !== id)
      setCheckedOrders(filterorders)
    }else{
      setCheckedOrders([...checkedOrders, id])
    }
       
  };
  console.log(checkedOrders);

  return (
    <>
      <div className="justify-between items-center mt-[12px] w-full">
        <div className="bg-white-700 rounded-xl w-full mt-[35px] h-fit justify-between">
          <div className="w-[485px] h-[44px] px-4 py-5 flex justify-center justify-between gap-[100px]">
            <p>Orders</p>
            <DatePickerDemo />
            <DeliverStatus checkedOrders={checkedOrders}/>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">
                  <input type="checkbox"/>
              </TableHead>
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
                  <input
                    type="checkbox"
                    checked={checkedOrders.includes(order._id)}
                    onChange={() => checkOrder(order._id)}

                  />
                </TableCell>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{order.user.email}</TableCell>
                <TableCell className="flex">
                  <div>
                  food
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <ChevronLeft />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <OrderfoodImage item={order.foodOrderItems} />
                    </DropdownMenuContent>
                  </DropdownMenu>
                  </div>
                </TableCell>
                <TableCell>
                  {order.createdAt.toString().split("T")[0]}
                </TableCell>
                <TableCell>{order.totalPrice}$</TableCell>
                <TableCell>{order.user.address}</TableCell>
                <TableCell>
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
                        className="w-[100px] h-[16px] px-2 py-[10px] gap-[10px] border rounded-full mt-[5px] bg-inherit text-gray-500 border border-gray-300 hover:bg-gray-300/30 "
                        onClick={() =>
                          hadnleOrderStatus("CANCELLED", order._id)
                        }
                      >
                        CANCELLED
                      </Button>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
