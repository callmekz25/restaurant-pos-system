import { getReservedTables } from "@/services/reservedTableService";
import { useQuery } from "@tanstack/react-query";

export const useGetReservedTables = () => {
  return useQuery({
    queryKey: ['reserved-tables'],
    queryFn: getReservedTables,
  });
};
