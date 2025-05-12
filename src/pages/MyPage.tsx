import { useEffect, useState } from 'react';
import { getMyInfo } from '../apis/auth'; // 마이페이지 API 호출
import { ResponseMyInfoDto } from '../types/auth'; // 마이페이지 API 응답 타입
import { useAuth } from '../context/AuthContext'; // 로그인 API 호출
import {useNavigate} from "react-router-dom"; // 페이지 이동을 위한 훅


const MyPage = () => {
  const {logout} = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);
  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();
      console.log(response);

      setData(response);
    }

    getData();
  },[])

  console.log("아 뭐지?");
  console.log(data?.data?.name);

  const handleLogout = async() => {
    await logout();
    navigate("/");
  }

  return (
    <div>
      <h1>{data?.data?.name} 님 환영합니당!!! </h1>
      <img src = {data?.data?.avatar as string} alt={"구글 로고"}/>
      <h1>이메일 : {data?.data?.email}</h1>

      <button className="cursor-pointer" onClick={handleLogout}>
        로그아웃
      </button>
    </div>
  )

}

export default MyPage;