"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BtnComponent,
  CardHeading,
  SectionDescription,
  SectionName,
} from "./ButtonComponent";
import Image from "next/image";

const ProductCard = () => {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataFetched, setDataFetched] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState(""); // New state for search query

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/products/admin/api/bikes"
        );
        setBikes(response.data);
        setLoading(false);
        setDataFetched(true);
      } catch (error) {
        setError("Error fetching bikes");
        console.error("Error fetching bikes:", error);
        setLoading(false);
        setDataFetched(true);
      }
    };

    fetchData();
  }, [bikes]);

  const filterByCategory = (category) => {
    setSelectedCategory(category);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredBikes = bikes
    .filter(
      (bike) => bike.category === selectedCategory || selectedCategory === "All"
    )
    .filter((bike) =>
      bike.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  console.log(filteredBikes);
  return (
    <>
      <div className="filterNav">
        <div className="searchContainer">
          <input
            type="text"
            id="searchInput"
            onChange={(e) => handleSearch(e.target.value)}
            value={searchQuery}
            className="searchField"
            placeholder="Search Products"
          />
        </div>
        <div className="selectContainer">
          <select
            id="categorySelect"
            onChange={(e) => filterByCategory(e.target.value)}
            value={selectedCategory}
            className="selectField"
          >
            <option value="All">All</option>
            <option value="Bike">Bike</option>
            <option value="Scooter">Scooter</option>
          </select>
        </div>
      </div>
      <div className="cardContainer">
        {filteredBikes.map((data, index) => (
          <div className="card" key={index}>
            <div className="imageContainer">
              <Image
                src={data.image}
                alt="Green double couch with wooden legs"
                className="img"
                width={100}
                height={100}
              />
            </div>
            <div className="contentContainer">
              <CardHeading
                sectionText={data.title}
                margin="0 0 1.3227513227513228vw 0"
              />
              <SectionDescription
                sectionText={data.description}
                margin="0 0 0.6613756613756614vw 0"
              />
              <SectionName sectionText={data.price} color="#fff" />
            </div>

            <div className="buttonContainer">
              <a href="tel:8921076209" target="_blank">
                <BtnComponent
                  buttonText="Call Us"
                  bg="#000"
                  color="#fff"
                  width="8vw"
                  height="2.8vw"
                />
              </a>
              <a
                href={`https://wa.me/918921076209?text=Model: ${data.title} Price: ${data.price} Year: ${data.year}`}
                target="_blank"
              >
                <Image src="/whatsapp.png" width={100} height={100} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductCard;
