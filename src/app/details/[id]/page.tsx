"use client";

import { Button, ChakraProvider } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { UserModel } from "../../../models/user.model";
import { useEffect, useState } from "react";
import { FormField } from "@/components/FormField";
import "./styles.scss";
import { BreadCrumb } from "@/components/BreadCrumb";
import { BreadCrumbModel } from "@/models/breadcrumb.model";

export default function Edit(args: { params: { id: number } }) {
  const [user, setUser] = useState<any>();
  const [breadcrumb, setBreacrumb] = useState<BreadCrumbModel[]>([]);

  useEffect(() => {
    const users = JSON.parse(
      localStorage.getItem("users") ?? "[]"
    ) as UserModel[];
    const _user = users.find((user) => user.id === +args.params.id);
    setUser(_user);
    setBreacrumb([
      {
        id: 1,
        name: "Home",
        url: "/",
      },
      {
        id: 2,
        name: _user?.name,
        isCurrent: true,
      }
    ]);
  }, [args.params.id]);
  
  return (
    <section id="container">
      <BreadCrumb segments={breadcrumb} />
      <ChakraProvider>
        <Formik
          initialValues={user}
          onSubmit={()=>{}}
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
                disable={true}
              />
              <FormField
                name="username"
                label="User name"
                placeholder="user name"
                isRequired={true}
                errorMessage="User name é obrigatório"
                disable={true}
              />
              <FormField
                name="email"
                label="Email"
                placeholder="email@email.com"
                type="email"
                isRequired={true}
                errorMessage="Email é obrigatório"
                disable={true}
              />
              <FormField
                name="phone"
                label="Phone"
                placeholder="(00) 0000-000"
                type="text"
                isRequired={true}
                errorMessage="Telefone é obrigatório"
                disable={true}
              />
            </Form>
          )}
        </Formik>
      </ChakraProvider>
    </section>
  );
}
