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
import { useOrder } from "@/provider/OrderProvider";
import axios from "axios";
import { useState } from "react";

export const DeliverStatus = ({checkedOrders}:{checkedOrders:string[]}) => {
  const [deliverystatus, setDeliveryStatus] = useState("");
  const { refetchOrder } = useOrder()
  const handleStatus = async () => {
    try {
        const response = await axios.put(`http://localhost:5000/order`, {status:deliverystatus, id : checkedOrders})
        console.log(response);
        await refetchOrder()
    } catch (error) {
        console.log(error);
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-[179px] h-fit rounded-full gap-[8px] bg-gray-300">
          Change delivery state
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change delivery state</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex justify-between items-center justify-center gap-[15px]">
          <Button
            className={`bg-[#F4F4F5] text-black w-full rounded-full px-4 py-2 ${
              deliverystatus === "PENDING" && "bg-[#E11D481A] text-[#EF4444]"
            }`}
            onClick={() => setDeliveryStatus("PENDING")}
          >
            Pending
          </Button>
          <Button className={`bg-[#F4F4F5] text-black w-full rounded-full px-4 py-2 ${
              deliverystatus === "DELIVERED" && "bg-[#E11D481A] text-[#EF4444]"
            }`}
            onClick={() => setDeliveryStatus("DELIVERED")}>
            Delivery
          </Button>
          <Button className={`bg-[#F4F4F5] text-black w-full rounded-full px-4 py-2 ${
              deliverystatus === "CANCELLED" && "bg-[#E11D481A] text-[#EF4444]"
            }`}
            onClick={() => setDeliveryStatus("CANCELLED")}>
            Cancelled
          </Button>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleStatus}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
