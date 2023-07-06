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
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import "./styles.scss";
import { UserModel } from "../models/user.model";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import {BsArrowUpRightSquare} from "react-icons/bs";
import Link from "next/link";
import { Field, Form, Formik } from "formik";
import { BreadCrumb } from "@/components/BreadCrumb";
import { Spinner } from "@chakra-ui/react";
import { BreadCrumbModel } from "@/models/breadcrumb.model";
import { SortHeader } from "@/components/SortHeader";
import { CurrentSortModel } from "@/models/current-sort.model";

export default function Lista() {
  const [users, setUsers] = useState<UserModel[]>([]);
  const [usersList, setUsersList] = useState<UserModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentSort, setCurrentSort] = useState<CurrentSortModel>({
    key: "name",
    isAsc: true,
  });

  const breadcrumb: BreadCrumbModel[] = [
    { 
      id: 1,
      name: "Home",
      url: "/",
      isCurrent: true,
    },
  ];

  useEffect(() => {
    const _users = JSON.parse(
      localStorage.getItem("users") ?? "[]"
    ) as UserModel[];
    if (_users.length) {
      setUsers(_users);
      setUsersList(_users);
      setIsLoading(false);
      return;
    }
    fetch("https://jsonplaceholder.typicode.com/users").then(
      async (response) => {
        const data = await response.json();
        setUsers(data);
        setUsersList(data);
        localStorage.setItem("users", JSON.stringify(data));
        setIsLoading(false);
      }
    );
  }, []);

  const handleSortUsers = (key: string) => {
    const _key = key as keyof UserModel;
    const isAsc = key === currentSort.key && currentSort.isAsc;
    const sorted = users.sort((a, b) => {
      const direction = (a[_key] ?? 0) > (b[_key] ?? 0) ? -1 : 1;
      return isAsc ? direction : direction * -1;
    });
    setUsersList(sorted);
    setCurrentSort({ key, isAsc: !isAsc });
  };

  const handleFilter = (params: { name: string }) => {
    if (!params.name) {
      setUsersList(users);
      return;
    }

    const user = users.filter((item) =>
      item.name.toLowerCase().includes(params.name.toLowerCase())
    );
    setUsersList(user);
  };

  const handleDelete = (userId?: number) => {
    if (userId && confirm("Você deseja realmente excluir?")) {
      setUsersList(usersList.filter((user) => user.id != userId));
    }
  };

  return (
    <section className="container">
      <div className="content-list">
        <BreadCrumb segments={breadcrumb} />
        <ChakraProvider>
          <div className="new-user">
            <Link href={"/add"}>
              <Button
                mt={4}
                colorScheme="green"
                type="submit"
                style={{ marginBottom: "1em" }}
              >
                + user
              </Button>
            </Link>
          </div>
          <Formik
            initialValues={{ name: "" }}
            onSubmit={handleFilter}
            enableReinitialize={true}
          >
            {(props) => (
              <Form
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  marginBottom: "1rem",
                }}
              >
                <Field name="name">
                  {({ field, form }: { field: any; form: any }) => (
                    <FormControl
                      isInvalid={form.errors.name && form.touched.name}
                    >
                      <FormLabel>Search</FormLabel>
                      <Input {...field} placeholder="search" />
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Button
                  mt={4}
                  colorScheme="teal"
                  type="submit"
                  style={{ marginLeft: "1em" }}
                >
                  Pesquisar
                </Button>
              </Form>
            )}
          </Formik>
        </ChakraProvider>
        <ChakraProvider>
          {isLoading && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "10rem",
              }}
            >
              <Spinner size="xl" />
            </div>
          )}
          {!isLoading && (
            <div className="table-response">
            <Table variant="striped">
              <Thead>
                <Tr>
                  <Th>
                    <SortHeader
                      identfier="name"
                      title="Name"
                      currentSort={currentSort}
                      onClick={() => handleSortUsers("name")}
                    />
                  </Th>
                  <Th>
                    <SortHeader
                      identfier="email"
                      title="Email"
                      currentSort={currentSort}
                      onClick={() => handleSortUsers("email")}
                    />
                  </Th>
                  <Th>
                    <SortHeader
                      identfier="phone"
                      title="Phone"
                      currentSort={currentSort}
                      onClick={() => handleSortUsers("phone")}
                    />
                  </Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {usersList.map((user) => {
                  return (
                    <Tr key={user.id}>
                      <Td>{user.name}</Td>
                      <Td>{user.email}</Td>
                      <Td>{user.phone}</Td>
                      <Td>
                        <button
                          style={{ color: "red" }}
                          onClick={() => handleDelete(user.id)}
                        >
                          <RiDeleteBin5Line />
                        </button>
                      </Td>
                      <Td>
                        <Link href={`/edit/${user.id}`}>
                          <FiEdit2 />
                        </Link>
                      </Td>
                      <Td>
                        <Link href={`/details/${user.id}`}>
                          <BsArrowUpRightSquare />
                        </Link>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
            </div>
          )}
        </ChakraProvider>
      </div>
    </section>
  );
}
