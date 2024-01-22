"use client";
import AddBike from "@/app/Screens/MainPage/AddBike";
import ShowBike from "@/app/Screens/ShowBike/ShowBike";
import Header from "@/app/components/Header";
import React, { useState } from "react";

const MainPage = () => {
  const [bikeAdded, setBikeAdded] = useState(false);

  const handleBikeAdded = () => {
    setBikeAdded(!bikeAdded);
  };

  return (
    <>
      <Header />
      <div className="dashboard">
        <AddBike onBikeAdded={handleBikeAdded} />
        <ShowBike bikeAdded={bikeAdded} />
      </div>
    </>
  );
};

export default MainPage;
