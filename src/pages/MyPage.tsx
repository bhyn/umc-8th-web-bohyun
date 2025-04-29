import { useEffect, useState } from "react"
import { getMyInfo } from "../apis/auth"
import { get } from "react-hook-form"
import { ResponseMyInfoDto } from "../types/auth"

const MyPage = () => {
    useEffect(() => {
      getdata();
}, []);

const handleLogout = async()=>{
  await logout();
  navigate("/");

};
return (
  <div>
    <h1>(data.data?.name)님 환영합니다.</h1>
    <h1>(data.data?.email)님 환영합니다.</h1>

    <button
      className="bg-blue-500 text-white py-2 px-4 rounded"
      onClick={handleLogout}
      >
      로그아웃
    </button>
  </div>
)
}

export default MyPage;