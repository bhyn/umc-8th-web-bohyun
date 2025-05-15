import { useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import {Heart} from "lucide-react";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import { useAuth } from "../context/AuthContext";
import usePostLike from "../hooks/mutations/usePostLike";
import useDeleteLike from "../hooks/mutations/useDeleteLike";


const LpDetailPage = () => {
  console.log("LpDetailPage");
  const {lpId}=useParams();
  const {accessToken} = useAuth();

  
  const {
    data:lp,
    isPending,
    isError,
  } = useGetLpDetail({lpId:Number(lpId)}); //lpId를 Number로 형변환해서 넘김

    const {data:me} = useGetMyInfo(accessToken);

    const{mutate: likeMutate} = usePostLike();
    const {mutate:disLikeMutate} = useDeleteLike();
    
    const isLiked = lp?.data.likes
    .map((like)=>like.userId)
    .includes(me?.data.id as number);

    const handleLikeLp = ()=>{
      likeMutate({lpId:Number(lpId)});
    }

    const handleDislikeLp=()=>{
        disLikeMutate({lpId:Number(lpId)});
    };


if (isPending) {
  return <div>로딩 중입니다...</div>;
}

if (isError) {
  return <div>에러가 발생했습니다. 다시 시도해주세요.</div>;
}

  return  <div className={"mt-12"}>\
    <h1>{lp?.data.title}</h1>
    <img src={lp?.data.thumbnail} alt={lp?.data.title} />
    <h2>{lp?.data.content}</h2>

    <button onClick={isLiked ? handleDislikeLp:handleLikeLp}>
            <Heart color={isLiked ?"red":"black"}
            fill={isLiked ?"red":"transparent"}
            />
        </button> 

    </div>;
}

export default LpDetailPage;