import { getFoodTypes } from '@/services/foodTypeService';
import { useQuery } from '@tanstack/react-query';

export const useGetFoodTypes = () => {
  return useQuery({
    queryKey: ['foodTypes'],
    queryFn: getFoodTypes,
  });
};
