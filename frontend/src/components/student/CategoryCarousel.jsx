import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useDispatch } from "react-redux";

const category = [
  "Full Stack Developer",
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="px-4">
      <Carousel className="w-full max-w-xs sm:max-w-md md:max-w-xl mx-auto my-10 md:my-20">
        <CarouselContent>
          {category.map((cat, index) => (
            <CarouselItem
              key={`${cat}-${index}`}
              className="basis-full sm:basis-1/2 md:basis-1/2 lg:basis-1/3"
            >
              <div className="flex justify-center px-1">
                <Button
                  onClick={() => searchJobHandler(cat)}
                  variant="outline"
                  className="rounded-full cursor-pointer w-full text-sm md:text-base whitespace-nowrap"
                >
                  {cat}
                </Button>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;