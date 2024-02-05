import { gql, useQuery } from "@apollo/client";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import React from "react";

export interface FormModalProps {
  id?: string;
  isOpen: boolean;
  onClose: () => void;
  initialRef?: React.MutableRefObject<null>;
  finalRef?: React.MutableRefObject<null>;
}

export interface ToDoDetail {
  id: string;
  title: string;
  status: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const GET_TODO = gql`
  query GetTodo($id: ID!) {
    findOneById(id: $id) {
      id
      title
      status
      description
      createdAt
      updatedAt
    }
  }
`;

function formattedDate(time : Date) {
	const date = new Date(time);
	const formattedDate = date.toLocaleString("ja-JP", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		timeZone: "Asia/Tokyo",
	});
return formattedDate;
}

export const FormModal = (props: FormModalProps) => {
  let todo;
  if (props.id !== undefined) {
    // ToDoの詳細情報を取得
    const { data, loading, error } = useQuery(GET_TODO, {
      variables: { id: props.id },
    });
    todo = data?.findOneById as ToDoDetail;
  }

  const onCreate = () => {
    alert("create");
  };

  const onUpdate = () => {
    alert("update");
  };

  return (
    <>
      <Modal
        isOpen={props.isOpen}
        onClose={props.onClose}
        size="xl"
        initialFocusRef={props.initialRef}
        finalFocusRef={props.finalRef}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{props.id === undefined ? "Create" : "Edit"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl my={2}>
              <FormLabel>Title</FormLabel>
              <Input
                ref={props.initialRef}
                placeholder="Title"
                value={todo?.title}
              />
            </FormControl>
            <FormControl my={2}>
              <FormLabel>Status</FormLabel>
              <Select placeholder="Select status">
                <option
                  value="0"
                  selected={props.id === undefined || todo?.status === 0}
                >
                  ToDo
                </option>
                <option value="1" selected={todo?.status === 1}>
                  In Progress
                </option>
                <option value="2" selected={todo?.status === 2}>
                  Complete
                </option>
              </Select>
            </FormControl>
            <FormControl my={2}>
              <FormLabel>Description</FormLabel>
              <Textarea placeholder="ToDo description ...">
                {todo?.description}
              </Textarea>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Flex justifyContent="space-between" w={"100%"}>
              <VStack spacing={2} align={"start"}>
                <Text fontSize="sm">
                  Create At:{" "}
                  {todo !== undefined
                    ? formattedDate(todo.createdAt)
                    : "N/A"}
                </Text>

                <Text fontSize="sm">
                  Update At:{" "}
                  {todo !== undefined
                    ? formattedDate(todo.updatedAt)
                    : "N/A"}
                </Text>
              </VStack>
              <HStack spacing={1}>
                <Button
                  colorScheme={props.id === undefined ? "green" : "blue"}
                  mr={3}
                  onClick={(e) => {
                    e.stopPropagation();
                    props.id === undefined ? onCreate() : onUpdate();
                  }}
                >
                  {props.id === undefined ? "Create" : "Update"}
                </Button>
                <Button onClick={props.onClose}>Cancel</Button>
              </HStack>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
