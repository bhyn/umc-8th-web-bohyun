import {useMutation} from "@tanstack/react-query";
import {postLike } from "../../apis/lp"
import {queryClient} from "../../App.tsx"
import {QUERY_KEY} from "../../constants/key";

function usePostLike(){
  return useMutation({
    mutationFn: postLike,
    onSuccess:(data)=>{
      queryClient.invalidateQueries({
        queryKey:[QUERY_KEY.lps, data.data.lpId],
        exact:true

      }    )
    },
    //error: 요청 실패시 발생한 에러
    // variables: mutate에 전달한 값
    // context: onMutate에서 반환한 값

    onError: (error,variables,context)=>{},
  // 요청 직전에 실행되는.. 
    onMutate: (variables)=>{
      return "hello"
    }
  })
}

export default usePostLike;