// import React from 'react'
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Search from "@mui/icons-material/Search";
import { useCallback, useContext, useEffect, useState } from "react";
import ProductCard from "../../components/products/ProductCard";
import { ProductContext } from "../../context/ProductContext";
// import products from './../../components/products/Products';
// import default from './../../../tailwind.config';

export default function Collection() {
  const { products } = useContext(ProductContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [type, setType] = useState([]);
  const [sortType, setSortType] = useState("relevence");
  const [search, setSearch] = useState("");

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };
  const toggleType = (e) => {
    if (type.includes(e.target.value)) {
      setType((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setType((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = useCallback(() => {
    let productCopy = products.slice();
    if (category.length > 0) {
      productCopy = productCopy.filter((item) =>
        category.includes(item.category)
      );
    }
    if (type.length > 0) {
      productCopy = productCopy.filter((item) => type.includes(item.type));
    }
    if (search !== "") {
      productCopy = productCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFilterProducts(productCopy);
  }, [category, products, search, type]);

  const sortProduct = useCallback(() => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case "low-high":
        setFilterProducts(
          fpCopy.sort((a, b) => {
            a.price - b.price;
          })
        );
        break;
      case "high-low":
        setFilterProducts(
          fpCopy.sort((a, b) => {
            b.price - a.price;
          })
        );
        break;
      default:
        // applyFilter();
        break;
    }
  }, [filterProducts, sortType]);

  useEffect(() => {
    sortProduct();
  }, [sortProduct]);

  useEffect(() => {
    applyFilter();
  }, [applyFilter]);

  return (
    <div className="w-full h-full p-20 flex flex-col gap-20">
      <div className="w-full flex flex-col gap-8">
        <div className="text-center w-full text-4xl uppercase font-bold">
          Explore Our Premium Sportswear Collection
        </div>
        <div className="w-full text-center">
          Discover top-quality sportswear designed to elevate your performance
          and style. From high-tech running gear to versatile training apparel,
          our collection offers the perfect blend of comfort and innovation.
          Browse through our carefully curated selection and find the ideal fit
          for your athletic needs. Whether you&apos;re hitting the gym or taking
          on the great outdoors, gear up with the best in sportswear.
        </div>
        <div className="flex items-center justify-center gap-5">
          <input
            className="w-[50%] border-none outline-none bg-gray-200 rounded px-5 py-3"
            placeholder="Search products here"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <span
            className="flex justify-center items-center cursor-pointer"
            onClick={applyFilter}
          >
            <Search fontSize="large" />
          </span>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-8">
        <div className="min-w-60 uppercase flex flex-col gap-5 ">
          <p
            className="flex flex-row gap-1 items-center cursor-pointer sm:cursor-default"
            onClick={() => setShowFilter(!showFilter)}
          >
            Filters{" "}
            <span
              className={`flex justify-center items-center sm:hidden ${
                showFilter ? "rotate-90" : ""
              } duration-300`}
            >
              <ArrowRightIcon />
            </span>
          </p>
          <div
            className={`border border-gray-300 px-5 py-3 ${
              showFilter ? "" : "hidden"
            } sm:block duration-300 rounded shadow-lg`}
          >
            <div className="flex flex-col gap-2">
              <p className="font-medium">Categories</p>
              <div className="flex gap-2 normal-case text-sm">
                <input
                  className="w-3 cursor-pointer"
                  type="checkbox"
                  value={"football jersey"}
                  onChange={toggleCategory}
                />
                Football Jersey
              </div>
              <div className="flex gap-2 normal-case text-sm">
                <input
                  className="w-3 cursor-pointer"
                  type="checkbox"
                  value={"cricket jersey"}
                  onChange={toggleCategory}
                />
                Cricket Jersey
              </div>
              <div className="flex gap-2 normal-case text-sm">
                <input
                  className="w-3 cursor-pointer"
                  type="checkbox"
                  value={"boot"}
                  onChange={toggleCategory}
                />
                Boots
              </div>
            </div>
          </div>
          <div
            className={`border border-gray-300 px-5 py-3 ${
              showFilter ? "" : "hidden"
            } sm:block duration-300 rounded shadow-lg`}
          >
            <div className="flex flex-col gap-2">
              <p className="font-medium">Types</p>
              <div className="flex gap-2 normal-case text-sm">
                <input
                  className="w-3 cursor-pointer"
                  type="checkbox"
                  value={"thai premium"}
                  onChange={toggleType}
                />
                Thai Premium
              </div>
              <div className="flex gap-2 normal-case text-sm">
                <input
                  className="w-3 cursor-pointer"
                  type="checkbox"
                  value={"player edition"}
                  onChange={toggleType}
                />
                Player Edition
              </div>
              <div className="flex gap-2 normal-case text-sm">
                <input
                  className="w-3 cursor-pointer"
                  value={"fan edition"}
                  type="checkbox"
                  onChange={toggleType}
                />
                Fan Edition
              </div>
              <div className="flex gap-2 normal-case text-sm">
                <input
                  className="w-3 cursor-pointer"
                  type="checkbox"
                  value={"deshi premium"}
                  onChange={toggleType}
                />
                Deshi Premium
              </div>
            </div>
          </div>
          <div
            className={`border border-gray-300 px-5 py-3 ${
              showFilter ? "" : "hidden"
            } sm:block duration-300 rounded shadow-lg`}
          >
            <div className="flex flex-col gap-2">
              <p className="font-medium">Football Clubs</p>
              <div className="flex gap-2 normal-case text-sm">
                <input
                  className="w-3 cursor-pointer"
                  type="checkbox"
                  value={"real madrid"}
                />
                Real Madrid
              </div>
              <div className="flex gap-2 normal-case text-sm">
                <input
                  className="w-3 cursor-pointer"
                  type="checkbox"
                  value={"ac milan"}
                />
                AC Milan
              </div>
              <div className="flex gap-2 normal-case text-sm">
                <input
                  className="w-3 cursor-pointer"
                  type="checkbox"
                  value={"liverpool"}
                />
                Liverpool
              </div>
              <div className="flex gap-2 normal-case text-sm">
                <input
                  className="w-3 cursor-pointer"
                  type="checkbox"
                  value={"bayern munich"}
                />
                Bayern Munich
              </div>
              <div className="flex gap-2 normal-case text-sm">
                <input
                  className="w-3 cursor-pointer"
                  type="checkbox"
                  value={"barcelona"}
                />
                Barcelona
              </div>
              <div className="flex gap-2 normal-case text-sm">
                <input
                  className="w-3 cursor-pointer"
                  type="checkbox"
                  value={"man utd"}
                />
                Manchester United
              </div>
              <div className="flex gap-2 normal-case text-sm">
                <input
                  className="w-3 cursor-pointer"
                  type="checkbox"
                  value={"man city"}
                />
                Manchester City
              </div>
              <div className="flex gap-2 normal-case text-sm">
                <input
                  className="w-3 cursor-pointer"
                  type="checkbox"
                  value={"psg"}
                />
                Paris Saint Germain
              </div>
              <div className="flex gap-2 normal-case text-sm">
                <input
                  className="w-3 cursor-pointer"
                  type="checkbox"
                  value={"burussia dortmund"}
                />
                Burussia Dortmund
              </div>
              <div className="flex gap-2 normal-case text-sm">
                <input
                  className="w-3 cursor-pointer"
                  type="checkbox"
                  value={"inter milan"}
                />
                Inter Milan
              </div>
            </div>
          </div>
          <div
            className={`border border-gray-300 px-5 py-3 ${
              showFilter ? "" : "hidden"
            } sm:block duration-300 rounded shadow-lg`}
          >
            <div className="flex flex-col gap-2">
              <p className="font-medium">Football National Team</p>
              <div className="flex gap-2 normal-case text-sm">
                <input
                  className="w-3 cursor-pointer"
                  type="checkbox"
                  value={"brazil"}
                />
                Brazil
              </div>
              <div className="flex gap-2 normal-case text-sm">
                <input
                  className="w-3 cursor-pointer"
                  type="checkbox"
                  value={"argentina"}
                />
                Argentina
              </div>
              <div className="flex gap-2 normal-case text-sm">
                <input
                  className="w-3 cursor-pointer"
                  type="checkbox"
                  value={"france"}
                />
                France
              </div>
              <div className="flex gap-2 normal-case text-sm">
                <input
                  className="w-3 cursor-pointer"
                  type="checkbox"
                  value={"germany"}
                />
                Germany
              </div>
              <div className="flex gap-2 normal-case text-sm">
                <input
                  className="w-3 cursor-pointer"
                  type="checkbox"
                  value={"spain"}
                />
                Spain
              </div>
              <div className="flex gap-2 normal-case text-sm">
                <input
                  className="w-3 cursor-pointer"
                  type="checkbox"
                  value={"england"}
                />
                England
              </div>
              <div className="flex gap-2 normal-case text-sm">
                <input
                  className="w-3 cursor-pointer"
                  type="checkbox"
                  value={"italy"}
                />
                Italy
              </div>
              <div className="flex gap-2 normal-case text-sm">
                <input
                  className="w-3 cursor-pointer"
                  type="checkbox"
                  value={"portugal"}
                />
                Portugal
              </div>
              <div className="flex gap-2 normal-case text-sm">
                <input
                  className="w-3 cursor-pointer"
                  type="checkbox"
                  value={"egypt"}
                />
                Egypt
              </div>
              <div className="flex gap-2 normal-case text-sm">
                <input
                  className="w-3 cursor-pointer"
                  type="checkbox"
                  value={"Hungery"}
                />
                Hungery
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-8">
          <div className="w-full flex flex-row justify-between">
            <div className="w-full font-bold uppercase text-4xl">
              All Collection
            </div>
            <div className="flex flex-row gap-2 items-center">
              <p className="w-full inline-block">Sort:</p>
              <select
                onChange={(e) => setSortType(e.target.value)}
                className="border border-gray-300 text-sm p-2 outline-none rounded"
              >
                <option value="relevence">Relevence</option>
                <option value="low-high">Low to High</option>
                <option value="high-low">High to Low</option>
              </select>
            </div>
          </div>
          <div className="w-full h-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 gap-y-6">
            {filterProducts.map((item, index) => (
              <ProductCard
                key={index}
                id={item._id}
                image={item.image[0]}
                name={item.name}
                price={item.price}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
