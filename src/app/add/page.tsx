"use client";

import {
  Button,
  ChakraProvider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { UserModel } from "../models/user.model";

export default function Create() {
  const handleSubmit = (user: UserModel) => {
    const data = localStorage.getItem("users");
    if (data) {
      const users = JSON.parse(data) as UserModel[];
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));
      return;
    }
    localStorage.setItem('users', JSON.stringify([user]));
  };
  const initialValues = {
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
  };

  return (
    <ChakraProvider>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {(props) => (
          <Form>
            <Field name="name">
              {({ field, form }: { field: any; form: any }) => (
                <FormControl isInvalid={form.errors.name && form.touched.name}>
                  <FormLabel>Name</FormLabel>
                  <Input {...field} placeholder="name" />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="username">
              {({ field, form }: { field: any; form: any }) => (
                <FormControl isInvalid={form.errors.name && form.touched.name}>
                  <FormLabel>User name</FormLabel>
                  <Input {...field} placeholder="user name" />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="email">
              {({ field, form }: { field: any; form: any }) => (
                <FormControl isInvalid={form.errors.name && form.touched.name}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    {...field}
                    placeholder="email@email.com"
                    type="email"
                  />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="phone">
              {({ field, form }: { field: any; form: any }) => (
                <FormControl isInvalid={form.errors.name && form.touched.name}>
                  <FormLabel>Phone</FormLabel>
                  <Input {...field} placeholder="(00) 0000-0000" type="text" />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button
              mt={4}
              colorScheme="teal"
              isLoading={props.isSubmitting}
              type="submit"
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </ChakraProvider>
  );
}
