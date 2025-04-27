import { useRef, useState } from "react";
import settings from "@/config/carousel/slider";
import Slider from "react-slick";

import { ChevronLeftIcon, ChevronRightIcon, ClockIcon } from "lucide-react";
import STATUS_ORDER from "@/constants/status.order";

const CarouselStatus = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  let sliderRef = useRef(null);
  const updateSettings = {
    ...settings,
    slidesToShow: 3,
    afterChange: (index: number) => setCurrentIndex(index),
  };
  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };
  return (
    <div className="   relative">
      <button
        className={` flex items-center absolute left-[-10px] z-50 top-[50%]   -translate-y-1/2 justify-center cursor-pointer bg-gray-300   size-6 rounded-full  transition-all duration-300 ${
          currentIndex === 0
            ? " cursor-not-allowed  hidden"
            : "hover:opacity-100 hover:text-black"
        } `}
        onClick={() => previous()}
        disabled={currentIndex === 0}
      >
        <ChevronLeftIcon className="size-5" />
      </button>
      <button
        className={` flex items-center absolute right-[-10px] z-50 top-[50%]   -translate-y-1/2 justify-center cursor-pointer  bg-gray-300  size-6 rounded-full   transition-all duration-300 ${
          currentIndex === STATUS_ORDER.length - 4
            ? " cursor-not-allowed hidden"
            : "hover:opacity-100 hover:text-black"
        } `}
        onClick={() => next()}
        disabled={currentIndex === STATUS_ORDER.length - 4}
      >
        <ChevronRightIcon className="size-5" />
      </button>
      <Slider
        {...updateSettings}
        ref={(slider) => {
          sliderRef = slider;
        }}
      >
        {STATUS_ORDER.map((st, index) => {
          return (
            index > 0 && (
              <div key={st.label} className="px-2 text-[12px] opacity-55 ">
                <button className="px-2 py-1 bg-[#efeaea] flex items-center gap-2 rounded-md">
                  <ClockIcon className="size-4" />
                  {st.label}
                </button>
              </div>
            )
          );
        })}
      </Slider>
    </div>
  );
};

export default CarouselStatus;
