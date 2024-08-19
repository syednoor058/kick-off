import ImageSlider from "./ImageSlider";

export default function Slider() {
  const slidersImg = [
    {
      url: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/2e80a037869665.574ef20d97dcf.jpg",
    },
    {
      url: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/908fe237869665.574ef20d98586.jpg",
    },
    {
      url: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/9eab7337869665.574ef20d9bc4a.jpg",
    },
    {
      url: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/8f60b837869665.574ef20d9976a.jpg",
    },
  ];

  return (
    <div>
      <ImageSlider slides={slidersImg} />
    </div>
  );
}
