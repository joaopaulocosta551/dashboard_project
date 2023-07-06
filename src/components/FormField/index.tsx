import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Field } from "formik";

interface IForms {
  name: string;
  placeholder: string;
  label: string;
  type?: string;
  errorMessage?: string;
  isRequired?: boolean;
  disable?: boolean;
}

export const FormField = ({ name, placeholder, label, type, errorMessage, isRequired, disable }: IForms) => {
  const validate = (value: string, isRequired?: boolean, errorMessage?: string) =>{
    if(!value && isRequired){
      return errorMessage;
    }
  } 
  return (
    <Field name={name} validate={(value: string ) => validate(value, isRequired, errorMessage)}>
      {({ field, form }: { field: any; form: any }) => (
        <FormControl style={{marginBottom: '1em'}}  isInvalid={form.errors[name] && form.touched[name]}>
          <FormLabel>{label}</FormLabel>
          <Input {...field} placeholder={placeholder} type={type} isDisabled={disable} />
          <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};
