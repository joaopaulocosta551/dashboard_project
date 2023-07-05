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
import { UserModel } from "../../models/user.model";
import { useEffect, useState } from "react";

export default function Create(args:{params: { id: number}}) {
  const [user, setUser] = useState<any>();

  const handleSubmit = (user: UserModel) => {
    const data = JSON.parse(localStorage.getItem("users") ?? '[]') as UserModel[];
    const userIndex = data.findIndex(item => item.id === +args.params.id);
    data[userIndex] = user;
    localStorage.setItem('users', JSON.stringify(data));
  };
  useEffect(()=>{
    const users = JSON.parse(localStorage.getItem('users') ?? '[]') as UserModel[];
    const _user = users.find(user => user.id === +args.params.id);
    console.log(_user);
    setUser(_user);
  }, [args.params.id])
  
  return (
    <ChakraProvider>
      <Formik initialValues={user} onSubmit={handleSubmit} enableReinitialize={true}>
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
