"use client"

import axios from "axios";

import { useEffect } from "react";
import { Navigation } from "./(food-menu)/_components/navigation";
import { Header } from "./(food-menu)/_features/header";
import { MenuItems } from "./(food-menu)/_components/menu-items";

export default function Home() {
  const getData = async () => {
    const response = await axios.get(`http://localhost:5000`)
    console.log(response);
  }
  useEffect(() => {
    getData();
  }, [])
  return (
    <div className="w-screen h-screen flex gap-6 bg-[#F4F4F5]">
      <Navigation/>
      <Header/>
    </div>
  );
}
