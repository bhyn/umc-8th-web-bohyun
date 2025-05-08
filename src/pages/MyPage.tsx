import { useEffect } from 'react';
import { getMyInfo } from '../apis/auth'; // 마이페이지 API 호출

const MyPage = () => {

  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();
      console.log(response);
    }

    getData();
  },[])

  return <div>My Page</div>;

}

export default MyPage;