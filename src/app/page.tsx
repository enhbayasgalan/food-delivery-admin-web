"use client"

import axios from "axios";

import { useEffect } from "react";
import { Navigation } from "./(food-menu)/_components/navigation";
import { Header } from "./(food-menu)/_features/header";
import { MenuItems } from "./(food-menu)/_components/menu-items";
import { ProductList } from "./(food-menu)/_features/product";

// import { ProductList } from "./(food-menu)/_features/product";

export default function Home() {
  return (
    <div className="w-screen h-screen flex gap-6 bg-[#F4F4F5]">
      <Navigation/>
      <Header/>
      <ProductList/>
    </div>
  );
}
