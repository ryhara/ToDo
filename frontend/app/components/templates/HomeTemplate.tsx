"use client";
import { CreateButton } from "../molecules/CreateButton";
import { Container, Text, VStack } from "@chakra-ui/react";
import { ToDoList } from "../organisms/ToDoList";
import { gql, useQuery } from "@apollo/client";
import { ToDoProps } from "../molecules/ToDo";

const GET_TODO = gql`
  query GetToDos($status: Int!) {
    findTodoByStatus(status: $status) {
        id
        title
        status
    }
  }
`;


export const HomeTemplate = () => {
  const {
    data: todoData,
    loading: todoLoading,
    error: todoError,
  } = useQuery(GET_TODO, {
    variables: { status: 0 },
  });

  const {
    data: inProgressData,
    loading: inProgressLoading,
    error: inProgressError,
  } = useQuery(GET_TODO, {
    variables: { status: 1 },
  });

  const {
    data: completeData,
    loading: completeLoading,
    error: completeError,
  } = useQuery(GET_TODO, {
    variables: { status: 2 },
  });

	const todos = todoData?.findTodoByStatus as ToDoProps[];
	const inProgress = inProgressData?.findTodoByStatus as ToDoProps[];
	const complete = completeData?.findTodoByStatus as ToDoProps[];

	const Lists = [
		{ title: "ToDo", ToDos: todos },
		{ title: "In Progress", ToDos: inProgress },
		{ title: "Complete", ToDos: complete },
	];

  return (
    <>
      <Container w="90%" maxW="container.xl" p={4}>
        <VStack spacing={4}>
          <Text fontSize="6xl" fontWeight="bold">
            ToDo App
          </Text>
          <CreateButton />
          <ToDoList ToDosList={Lists} />
        </VStack>
      </Container>
    </>
  );
  // title
  // button
  // ToDoList
  // modal
};
