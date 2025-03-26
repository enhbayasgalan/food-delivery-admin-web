"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useOrder } from "@/provider/OrderProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";;
import { ChevronLeft } from "lucide-react";

export const OrderHeader = () => {
  const { orders } = useOrder();
  return (
    <Table>
      <TableCaption>A list of your recent s.</TableCaption>
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
                <DropdownMenuContent className="">
                  <DropdownMenuSeparator />
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
            <TableCell>{order.createdAt.toString()}</TableCell>
            <TableCell>{order.totalPrice}$</TableCell>
            <TableCell>{order.user.address}</TableCell>
            <TableCell>{order.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
