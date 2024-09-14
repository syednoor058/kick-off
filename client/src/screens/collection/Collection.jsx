// import React from 'react'
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Search from "@mui/icons-material/Search";
import { useCallback, useContext, useEffect, useState } from "react";
import ProductCard from "../../components/products/ProductCard";
import { ProductContext } from "../../context/ProductContext";

export default function Collection() {
  const { products } = useContext(ProductContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  // const [type, setType] = useState([]);
  const [sortType, setSortType] = useState("relevence");
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const lastIndex = currentPage * productsPerPage;
  const firstIndex = lastIndex - productsPerPage;
  const productRecords = filterProducts.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(filterProducts.length / productsPerPage);
  const numbers = [...Array(nPage + 1).keys()].slice(1);

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };
  // const toggleType = (e) => {
  //   if (type.includes(e.target.value)) {
  //     setType((prev) => prev.filter((item) => item !== e.target.value));
  //   } else {
  //     setType((prev) => [...prev, e.target.value]);
  //   }
  // };

  const applyFilter = useCallback(() => {
    let productCopy = products.slice();
    if (category.length > 0) {
      productCopy = productCopy.filter((item) =>
        category.includes(item.category.name)
      );
    }
    // if (type.length > 0) {
    //   productCopy = productCopy.filter((item) =>
    //     type.includes(item.productType)
    //   );
    // }
    if (search !== "") {
      productCopy = productCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFilterProducts(productCopy);
  }, [category, products, search]);

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

  useEffect(() => {
    window.scrollTo(0, 0);

    // Extract unique categories
    const uniqueCategories = [
      ...new Set(products.map((product) => product.category.name)),
    ];
    setCategories(uniqueCategories);
    // console.log(categories);
  }, [products]);

  return (
    <div className="w-full h-full px-5 sm:px-10 md:px-16 lg:px-20 py-10 md:py-20 flex flex-col gap-10 md:gap-20 mt-[104px]">
      <div className="w-full flex flex-col gap-4 md:gap-8">
        <div className="text-center w-full text-2xl sm:text-3xl md:text-4xl uppercase font-bold">
          Explore Our Premium Sportswear Collection
        </div>
        <div className="w-full text-xs sm:text-sm md:text-base text-center">
          Discover top-quality sportswear designed to elevate your performance
          and style. From high-tech running gear to versatile training apparel,
          our collection offers the perfect blend of comfort and innovation.
          Browse through our carefully curated selection and find the ideal fit
          for your athletic needs. Whether you&apos;re hitting the gym or taking
          on the great outdoors, gear up with the best in sportswear.
        </div>
        <div className="flex items-center justify-center gap-5">
          <input
            className=" w-[80%] sm:w-[70%] lg:w-[50%] border-none outline-none bg-gray-200 rounded px-5 py-3"
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
      <div className="flex flex-col md:flex-row gap-8">
        <div className="min-w-60 uppercase flex flex-col gap-5 ">
          <p
            className="flex flex-row gap-1 items-center cursor-pointer sm:cursor-default"
            onClick={() => setShowFilter(!showFilter)}
          >
            Filters{" "}
            <span
              className={`flex justify-center items-center md:hidden ${
                showFilter ? "rotate-90" : ""
              } duration-300`}
            >
              <ArrowRightIcon />
            </span>
          </p>
          <div
            className={`border border-gray-300 px-5 py-3 ${
              showFilter ? "" : "hidden"
            } md:block duration-300 rounded shadow-lg`}
          >
            <div className="flex flex-col gap-2">
              <p className="font-medium">Categories</p>
              {categories.length > 0 &&
                categories.map((category, index) => (
                  <div key={index} className="flex gap-2 text-sm capitalize">
                    <input
                      className="w-3 cursor-pointer"
                      type="checkbox"
                      value={category}
                      onChange={toggleCategory}
                    />
                    {category}
                  </div>
                ))}
            </div>
          </div>
          {/* <div
            className={`border border-gray-300 px-5 py-3 ${
              showFilter ? "" : "hidden"
            } md:block duration-300 rounded shadow-lg`}
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
          </div> */}
        </div>
        <div className="w-full flex flex-col gap-8">
          <div className="w-full flex flex-row justify-between">
            <div className="w-full font-bold uppercase text-2xl sm:text-3xl md:text-4xl">
              All Collection
            </div>
            <div className="flex flex-row gap-2 items-center">
              <p className="w-full inline-block">Sort:</p>
              <select
                onChange={(e) => setSortType(e.target.value)}
                className="border border-gray-300 text-sm p-2 outline-none rounded"
              >
                <option value="relevence">Latest</option>
                <option value="low-high">Low to High</option>
                <option value="high-low">High to Low</option>
              </select>
            </div>
          </div>
          <div className="w-full grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productRecords.map((item, index) => (
              <ProductCard
                key={index}
                id={item._id}
                image={item.photo[0]}
                name={item.name}
                price={item.price}
                available={item.isAvailable}
              />
            ))}
          </div>
          <div className="flex flex-row gap-7 justify-center items-center pt-10">
            {/* <div>Prev</div> */}
            <div className="flex flex-row gap-3">
              {numbers.map((num, index) => (
                <div
                  key={index}
                  className={`w-5 h-5 lg:w-8 lg:h-8 flex justify-center items-center ${
                    num == currentPage
                      ? "active-page"
                      : "border-secondaryColor border rounded hover:border-none hover:bg-secondaryColor hover:text-primaryColor duration-300"
                  } cursor-pointer text-xs lg:text-base`}
                  onClick={() => setCurrentPage(num)}
                >
                  {num}
                </div>
              ))}
            </div>
            {/* <div>Next</div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
