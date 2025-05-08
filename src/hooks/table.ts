import { getTables } from "@/services/tableService";
import { useQuery } from "@tanstack/react-query";

export const useGetTables = () => {
  return useQuery({
    queryKey: ["tables"],
    queryFn: getTables,
  });
};
