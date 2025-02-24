"use client"

import axios from "axios";

import { useEffect } from "react";
import { Navigation } from "./(food-menu)/_components/navigation";

export default function Home() {
  const getData = async () => {
    const response = await axios.get(`http://localhost:5000`)
    console.log(response);
  }
  useEffect(() => {
    getData();
  }, [])
  return (
    <div className="w-full h-[1200px] top-[300px] bg-[#F4F4F5]">
      <Navigation/>
    </div>
  );
}
