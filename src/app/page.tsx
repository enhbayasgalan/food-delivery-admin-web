"use client"


import { Navigation } from "./(food-menu)/_components/navigation";
import { Header } from "./(food-menu)/_features/header";



// import { ProductList } from "./(food-menu)/_features/product";

export default function Home() {
  return (
    <div className="w-screen flex gap-6 bg-[#F4F4F5] ">
      <Navigation/>
      <Header/>
    </div>
  );
}
