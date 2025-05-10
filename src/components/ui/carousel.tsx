import { useRef, useState } from 'react';
import settings from '@/config/carousel/slider';
import Slider from 'react-slick';
import CATEGORIES from '@/constants/category';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import FoodType from '@/interfaces/food/foodType.interface';

const Carousel = ({ foodTypes }: CarouselPropsList) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  let sliderRef = useRef(null);
  const updateSettings = {
    ...settings,
    afterChange: (index: number) => setCurrentIndex(index),
  };
  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };
  return (
    <div className="slider-container max-h-[300px]  overflow-hidden relative">
      <button
        className={` flex items-center absolute left-5 z-50 top-[50%] opacity-40  -translate-y-1/2 justify-center cursor-pointer bg-white   size-8 rounded-full  transition-all duration-300 ${
          currentIndex === 0
            ? ' cursor-not-allowed  hidden'
            : 'hover:opacity-100 hover:text-black'
        } `}
        onClick={() => previous()}
        disabled={currentIndex === 0}
      >
        <ChevronLeftIcon className="size-5" />
      </button>
      <button
        className={` flex items-center absolute right-5 z-50 top-[50%] opacity-40  -translate-y-1/2 justify-center cursor-pointer  bg-white  size-8 rounded-full   transition-all duration-300 ${
          currentIndex === foodTypes.length - 4
            ? ' cursor-not-allowed hidden'
            : 'hover:opacity-100 hover:text-black'
        } `}
        onClick={() => next()}
        disabled={currentIndex === foodTypes.length - 4}
      >
        <ChevronRightIcon className="size-5" />
      </button>
      <Slider
        {...updateSettings}
        ref={(slider) => {
          sliderRef = slider;
        }}
      >
        {foodTypes.map((ft) => {
          return (
            <div key={ft.foodTypeId} className=" relative px-2">
              <img
                src={ft.foodTypeImage}
                alt=""
                className=" object-cover aspect-[6/4]  rounded-md"
              />
              <div
                className="flex text-white font-medium items-center justify-between absolute left-[50%]  -translate-x-1/2 bottom-3"
                style={{ width: 'calc(100% - 40px)' }}
              >
                <h3 className="text-xl">{ft.foodTypeName}</h3>
                <div className="text-[12px] rounded-full px-2 py-1 bg-[#333333] flex items-center justify-center">
                  <span>0 items</span>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

type CarouselPropsList = {
  foodTypes: FoodType[];
};

export default Carousel;
