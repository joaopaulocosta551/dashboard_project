"use client";

import { useState, useEffect } from "react";
import {
  Button,
  ChakraProvider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Table,
  Tbody,
  Td,
  Thead,
  Tr,
} from "@chakra-ui/react";
import "./styles.css";
import { UserModel } from "../models/user.model";
import { FiEdit2 } from "react-icons/fi";
import Link from "next/link";
import { Field, Form, Formik } from "formik";

export default function Lista() {
  const [users, setUsers] = useState<UserModel[]>([]);
  const [usersList, setUsersList] = useState<UserModel[]>([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users").then(
      async (response) => {
        const data = await response.json();
        setUsers(data);
        setUsersList(data);
        localStorage.setItem("users", JSON.stringify(data));
      }
    );
  }, []);
  const handleFilter = (params: {name: string}) => {
    if(!params.name){
      setUsersList(users);
      return;
    }
    const user = users.filter(item => item.name.toLowerCase().includes(params.name.toLowerCase()));
    setUsersList(user);

  };

  return (
    <section className="container">
      <ChakraProvider>
        <Formik
          initialValues={{name: ''}}
          onSubmit={handleFilter}
          enableReinitialize={true}
        >
          {(props) => (
            <Form style = {{display: 'flex', alignItems: 'flex-end'}}>
              <Field name="name">
                {({ field, form }: { field: any; form: any }) => (
                  <FormControl
                    isInvalid={form.errors.name && form.touched.name}
                  >
                    <FormLabel>Name</FormLabel>
                    <Input {...field} placeholder="name" />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button mt={4} colorScheme="teal" type="submit" style={{marginLeft: '1em'}}>
                Pesquisar
              </Button>
            </Form>
          )}
        </Formik>
      </ChakraProvider>
      <ChakraProvider>
        <Table variant="striped">
          <Thead>
            <Tr>
              <Td>Name</Td>
              <Td>Email</Td>
              <Td></Td>
            </Tr>
          </Thead>
          <Tbody>
            {usersList.map((user) => {
              return (
                <Tr key={user.id}>
                  <Td>{user.name}</Td>
                  <Td>{user.email}</Td>
                  <Td>
                    <Link href={`/edit/${user.id}`}>
                      <FiEdit2 />
                    </Link>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </ChakraProvider>
    </section>
  );
}
