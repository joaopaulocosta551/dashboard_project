"use client";

import { Button, ChakraProvider } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { UserModel } from "../../models/user.model";
import { FormField } from "../../components/FormField";
import "./styles.scss";
import { BreadCrumb } from "@/components/BreadCrumb";
import { BreadCrumbModel } from "@/models/breadcrumb.model";
import { useRouter } from "next/navigation";

export default function Add() {
  const router = useRouter();
  const breadcrumb: BreadCrumbModel[] = [
    { 
      id: 1,
      name: "Home",
      url: "/",
    },
    { 
      id: 2,
      name: "New user",
      url: "/add",
      isCurrent: true,
    },
  ];

  const handleSubmit = (user: UserModel) => {
    const data = localStorage.getItem("users");
    const users = JSON.parse(data ?? "[]") as UserModel[];
    const maxId = getMaxId(users);
    users.push({...user, id: maxId + 1});
    localStorage.setItem("users", JSON.stringify(users));
    router.push('/');
  };

  const getMaxId = (users: UserModel[]) =>{
    return Math.max(...users.map(user => user.id ?? 0));
  }

  const initialValues = {
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
  };

  return (
    <section id="container">
      <BreadCrumb segments={breadcrumb} />
      <ChakraProvider>
      <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          enableReinitialize={true}
          validateOnChange={false}
          validateOnBlur={true}
        >
          {(props) => (
            <Form>
              <FormField
                name="name"
                label="Name"
                placeholder="name"
                type="text"
                isRequired={true}
                errorMessage="Nome é obrigatório"
              />
              <FormField
                name="username"
                label="User name"
                placeholder="user name"
                isRequired={true}
                errorMessage="User name é obrigatório"
              />
              <FormField
                name="email"
                label="Email"
                placeholder="email@email.com"
                type="email"
                isRequired={true}
                errorMessage="Email é obrigatório"
              />
              <FormField
                name="phone"
                label="Phone"
                placeholder="(00) 0000-000"
                type="text"
                isRequired={true}
                errorMessage="Telefone é obrigatório"
              />
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
    </section>
  );
}
