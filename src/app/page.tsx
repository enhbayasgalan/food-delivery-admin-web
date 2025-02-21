"use client"

import axios from "axios";
import { useEffect } from "react";

export default function Home() {
  const getData = async () => {
    const response = await axios.get(`http://localhost:5000`)
    console.log(response);
  }
  useEffect(() => {
    getData();
  }, [])
  return (
    <div className="flex justify-center items-center">hello form admin
    </div>
  );
}
