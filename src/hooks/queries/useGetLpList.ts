import { PaginationDto } from "../../types/common";
import { getLpList } from "../../apis/lp";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";

function useGetLpList({cursor, search, order, limit}: PaginationDto) {
  return useQuery({
    queryKey:[QUERY_KEY.lps,search],
    queryFn: () => getLpList({
      cursor,
      search,
      order,
      limit
    }),
    staleTime:1000*60*5,
    gcTime:100*60*10,
    enabled:Boolean(search),
  });
}

export default useGetLpList;