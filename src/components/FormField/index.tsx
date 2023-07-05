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
}

export const FormField = ({ name, placeholder, label, type }: IForms) => {
  return (
    <Field name={name}>
      {({ field, form }: { field: any; form: any }) => (
        <FormControl isInvalid={form.errors.name && form.touched.name}>
          <FormLabel>{label}</FormLabel>
          <Input {...field} placeholder={placeholder} type={type} />
          <FormErrorMessage>{form.errors.name}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};
