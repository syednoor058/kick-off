// import React from 'react'
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import HomeIcon from "@mui/icons-material/Home";
import Search from "@mui/icons-material/Search";
import { useCallback, useContext, useEffect, useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import horizontalBanner from "../../assets/banners/top_sales.jpg";
import verticalBanner from "../../assets/banners/vertical_banner.webp";
import ProductCard from "../../components/products/ProductCard";
import { ProductContext } from "../../context/ProductContext";

export default function Collection() {
  const { products } = useContext(ProductContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  // const [type, setType] = useState([]);
  const [sortType, setSortType] = useState("relevence");
  const [isLoading, setIsLoading] = useState(true);
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
    document.title =
      "Collection | Best Sportswear in Affordable Price | KICK-OFF";
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (products.length > 0) {
      setIsLoading(false);
    }

    // Extract unique categories
    const uniqueCategories = [
      ...new Set(products.map((product) => product.category.name)),
    ];
    setCategories(uniqueCategories);
    // console.log(categories);
  }, [products]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <svg
          aria-hidden="true"
          className="w-16 h-16 text-secondaryColor animate-spin dark:text-gray-300 fill-secondaryColor"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className="w-full h-full  pb-10 md:pb-20 flex flex-col gap-10 md:gap-20 mt-[104px]">
      <div className="w-ful text-center uppercase text-3xl sm:text-4xl md:text-5xl font-semibold bg-secondaryColor text-primaryColor py-10 lg:py-20 flex flex-col gap-3 lg:gap-5">
        Collections
        <div className="flex flex-row gap-2 text-xs w-full justify-center items-center font-normal text-gray-400">
          <Link
            to="/"
            className="flex flex-row gap-2 justify-center items-center hover:underline underline-offset-2 duration-300"
          >
            <span className="mt-[-3px]">
              <HomeIcon fontSize="small" />
            </span>
            Home
          </Link>
          <div className="text-xl flex justify-center items-center">
            <MdOutlineKeyboardArrowRight />
          </div>
          <div>Products</div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-4 md:gap-8 px-5 sm:px-10 md:px-16 lg:px-20">
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
      <div className="flex flex-col md:flex-row gap-8 px-5 sm:px-10 md:px-16 lg:px-20">
        <div className="md:max-w-60 uppercase flex flex-col gap-5 ">
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
          <div className="w-full rounded-sm hidden md:block">
            <img
              className="w-full h-full rounded-sm"
              src={verticalBanner}
              alt=""
            />
          </div>
          <div className="w-full inset-0 -mr-10 rounded-sm visible md:invisible">
            <img
              className="w-full h-full object-cover rounded-sm"
              src={horizontalBanner}
              alt=""
            />
          </div>
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
          <div className="w-full grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
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
