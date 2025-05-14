import TableStatus from "@/enum/tableStatus";
import { getTables } from "@/services/tableService";
import { useQuery } from "@tanstack/react-query";

export const useGetTables = (
  statusList: { status: TableStatus; color: string; isChecked: boolean }[]
) => {
  return useQuery({
    queryKey: ["tables", statusList],
    queryFn: () => getTables(statusList.map((status) => status.status)),
  });
};
