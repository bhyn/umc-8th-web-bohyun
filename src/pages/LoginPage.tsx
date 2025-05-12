import useForm from "../hooks/useForm.ts";
import { UserSigninInformation, validateSignin } from "../utils/validate.ts";
import { postSignin } from "../apis/auth.ts"; // 로그인 API 호출
import {useLocalStorage} from "../hooks/useLocalStorage.ts";
import { LOCAL_STORAGE_KEY } from "../constants/key.ts";
import { useAuth } from "../context/AuthContext.tsx"; // 로그인 API 호출
import { useNavigate } from "react-router-dom"; // useNavigate 훅을 사용하기 위해 import

const LoginPage = () => {
  const {login} =  useAuth();
  const navigate = useNavigate();
  const { values, errors, touched, getInputProps } = useForm<UserSigninInformation>({
    initialValue: {
      email: "",
      password: "",
    },
    validate: validateSignin,
  });

  const handleSubmit = async () => {

      await login(values);
      

  };

  const handleGoogleLogin = async () => {
    window.location.href =
      import.meta.env.VITE_SERVER_API_URL + "/v1/auth/google/login";
  };

  const isDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) ||
    Object.values(values).some((value) => value === "");

  return (
    <div className='flex flex-col items-center justify-center h-full gap-4'>
            <div className='flex flex-col gap-3'>
                <input
                {...getInputProps("email")}
                className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
                    ${errors?.email && touched?.email ? "border-red-200" : "border-gray-300"}`}
                type={"email"}  
                placeholder={"이메일"}
                />
                {errors?.email && touched?.email && (
                    <div className="text-red-500 text-sm">{errors.email}</div>
                )}
                <input
                {...getInputProps("password")}
                className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
                    ${errors?.password && touched?.password ? "border-red-200" : "border-gray-300"}`}
                type={"password"}  
                placeholder={"비밀번호"}
                />
                {errors?.password && touched?.password && (
                    <div className="text-red-500 text-sm">{errors.password}</div>
                )}
                <button 
                type='button' 
                onClick={handleSubmit} 
                disabled={isDisabled} 
                className='w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300'>
                    로그인
                </button>
                <button 
                type='button' 
                onClick={handleGoogleLogin} 
                //disabled={isDisabled} 
                className='w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300'>
                    <div className="flex items-center justify-center gap-4">
                        <img src={"/images/googleLogo.svg"} alt="Google Logo Image"/>
                        <span>구글 로그인</span>
                    </div>
                </button>
            </div>
        </div>
  );
};

export default LoginPage;
