import TableStatus from "@/enum/tableStatus";
import { getTables } from "@/services/tableService";
import { useQuery } from "@tanstack/react-query";

export const useGetTables = (status?: TableStatus) => {
  return useQuery({
    queryKey: ["tables", status ?? "ALL"],
    queryFn: () => getTables(status),
  });
};
