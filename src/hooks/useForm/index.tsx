import { useState } from "react";

type useFormParameters<T> = {
  defaultValues: T;
};

function useForm<FormValuesType extends Record<string, any>>({
  defaultValues,
}: useFormParameters<FormValuesType>) {
  const [formValues, setFormValues] = useState<FormValuesType>(defaultValues);

  const updateValue = (inputName: keyof FormValuesType, newValue: any) =>
    setFormValues((prevValues) => {
      return { ...prevValues, [inputName]: newValue } as FormValuesType;
    });

  const handleSubmit = (submitCallback: (data: FormValuesType) => void) => {
    submitCallback(formValues);
  };

  return { fields: formValues, updateValue, handleSubmit };
}

export default useForm;
