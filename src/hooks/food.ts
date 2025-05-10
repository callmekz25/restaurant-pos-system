import { getFoods } from "@/services/foodService";
import { useQuery } from "@tanstack/react-query";

export const useGetFoods = () => {
  return useQuery({
    queryKey: ["foods"],
    queryFn: getFoods,
  });
};