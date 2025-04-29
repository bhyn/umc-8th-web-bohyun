import { ChangeEvent, useEffect, useState } from "react";

interface UseFormProps<T> {
  initialValue: T;
  validate: (values: T) => Record<keyof T, string>;
}

function useForm<T>({ initialValue, validate }: UseFormProps<T>) {
  const [values, setValues] = useState(initialValue);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 사용자 입력값을 변경하는 함수
  const handleChange = (name: keyof T, text: string) => {
    setValues({
      ...values, // 기존 상태 유지
      [name]: text,
    });
  };

  const handleBlur = (name: keyof T) => {
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  // 이메일, 패스워드 입력 요소들, 속성들을 좀 가져오는 것
  const getInputProps = (name: keyof T) => {
    const value = values[name];

    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      handleChange(name, e.target.value);

    const onBlur = () => handleBlur(name);

    return { value, onChange, onBlur };
  };

  // values가 변경될 때마다 에러 검증 로직이 실행됨.
  useEffect(() => {
    const newErrors: Record<keyof T, string> = validate(values);
    setErrors(newErrors); // 오류 메시지 입력
  }, [validate, values]);

  return { values, errors, touched, getInputProps };
}

export default useForm; 