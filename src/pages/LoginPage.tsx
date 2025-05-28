import { useState } from "react";
import useForm from "../hooks/useForm.ts";
import { UserSigninInformation, validateSignin } from "../utils/validate.ts";

const LoginPage = () => {
  const { values, errors, touched, getInputProps } =
    useForm<UserSigninInformation>({
      initialValue: {
        email: "",
        password: "",
      },
      validate: validateSignin,
    });

  const handleSubmit = () => {
    console.log(values);
  };

  const isDisabled = Object.values(errors || {}).some(
    (error) =>
      error.length > 0 || Object.values(values).some((value) => value === "")
  );

  return (
    <div className="h-dvh flex flex-col items-center justify-center h-full gap-4">
      <div className="flex flex-col gap-3">
        <input
          {...getInputProps("email")}
          // value={values.email} 입력창의 값이 무조건 values.email과 동기화됨. 없어도 보이기는 똑같지만 유지보수를 위해서 잇다네요
          // onChange={(e) => handleChange("email", e.target.value)}
          // onBlur={() => handleBlur("email")} 입력을 마치고 다른 곳을 클릭하면 실행됨.에러 메시지를 보여줄지 말지
          // name="email" 로 설정해서 name자리에 "email"넣은 거임
          // ...
          // 이거를 줄인 거임
          name="email"
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm ${
            errors?.email && touched?.email
              ? "border-red-500 bg-red-200"
              : "border-gray-300"
          }`}
          type="email"
          placeholder="이메일"
        />

        {errors?.email &&
          touched?.email && ( //에러 있으면 에러메시지 띄워라
            <div className="text-red-500 text-sm">{errors.email}</div>
          )}
        <input
          {...getInputProps("password")}
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm ${
            errors?.password && touched?.password
              ? "border-red-500 bg-red-200"
              : "border-gray-300"
          }`}
          type="password"
          placeholder="비밀번호"
        />
        {errors?.password && touched?.password && (
          <div className="text-red-500 text-sm">{errors.password}</div>
        )}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isDisabled}
          className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition"
        >
          로그인
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
