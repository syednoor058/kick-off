import verticalBanner from "../../assets/banners/top_sales.jpg";
export default function RecentProduct() {
  // const { products } = useContext(ProductContext);
  return (
    <div className="w-full aspect-[16/5] relative overflow-hidden">
      <img
        className="absolute w-full h-full object-cover z-[-3] object-top "
        src={verticalBanner}
        alt=""
      ></img>
    </div>
  );
}
