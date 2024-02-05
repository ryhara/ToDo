"use client";
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FormModal } from "../organisms/FormModal/FormModal";
import React from "react";
import { gql, useMutation } from "@apollo/client";

export interface ToDoInfo {
  id: string;
  title: string;
  status: number;
}

export interface ToDoPresenterProps {
  id: string;
  title: string;
  status: number;
  toDoRefetch: () => void;
  inProgressRefetch: () => void;
  completeRefetch: () => void;
}

const TODO = 0;
const IN_PROGRESS = 1;
const COMPLETE = 2;

const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      id
    }
  }
`;

const UPDATE_STATUS = gql`
  mutation UpdateStatus($id: ID!, $title: String!, $status: Int!) {
    updateTodo(id: $id, title: $title, status: $status) {
      id
    }
  }
`;

export const ToDo = (props: ToDoPresenterProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [deleteTodo] = useMutation(DELETE_TODO);
  const [updateTodo] = useMutation(UPDATE_STATUS);
  const OnCloseWithRefetch = () => {
    onClose();
    if (props.status === TODO) {
      props.toDoRefetch();
    }
    if (props.status === IN_PROGRESS) {
      props.inProgressRefetch();
    }
    if (props.status === COMPLETE) {
      props.completeRefetch();
    }
  };

  const onRemove = (id: string, status: number) => {
    // 削除処理
    deleteTodo({
      variables: { id: id },
    }).then(() => {
      if (status === TODO) {
        props.toDoRefetch();
      }
      if (status === IN_PROGRESS) {
        props.inProgressRefetch();
      }
      if (status === COMPLETE) {
        props.completeRefetch();
      }
    });
  };

  const onNext = () => {
    // 移動処理
    // statusをインクリメント
    updateTodo({
      variables: { id: props.id, title: props.title, status: props.status + 1 },
    }).then(() => {
      if (props.status === TODO) {
        props.toDoRefetch();
        props.inProgressRefetch();
      }
      if (props.status === IN_PROGRESS) {
        props.inProgressRefetch();
        props.completeRefetch();
      }
    });
  };

  const onBack = () => {
    // statusをデクリメント
    updateTodo({
      variables: { id: props.id, title: props.title, status: props.status - 1 },
    }).then(() => {
      if (props.status === IN_PROGRESS) {
        props.toDoRefetch();
        props.inProgressRefetch();
      }
      if (props.status === COMPLETE) {
        props.inProgressRefetch();
        props.completeRefetch();
      }
    });
  };
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        p={4}
        borderWidth="1px"
        borderRadius="lg"
        bgColor="white"
        ref={finalRef}
        onClick={(e) => {
          e.stopPropagation();
          onOpen();
        }}
        cursor="pointer"
      >
        <Text fontWeight={"bold"}>{props.title}</Text>
        <Box>
          {props.status === TODO || props.status === IN_PROGRESS ? (
            <Button
              size="sm"
              colorScheme="teal"
              variant="outline"
              mr={2}
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
            >
              {props.status === TODO ? "Start" : "Done"}
            </Button>
          ) : null}
          {props.status === IN_PROGRESS || props.status === COMPLETE ? (
            <Button
              size="sm"
              colorScheme="gray"
              variant="outline"
              mr={2}
              onClick={(e) => {
                e.stopPropagation();
                onBack();
              }}
            >
              {props.status === IN_PROGRESS ? "Back" : "Undo"}
            </Button>
          ) : null}
          <Button
            size="sm"
            colorScheme="red"
            onClick={(e) => {
              e.stopPropagation();
              confirm("Are you sure you want to delete this ToDo?") &&
                onRemove(props.id, props.status);
            }}
          >
            削除
          </Button>
        </Box>
      </Box>
      <FormModal
        id={props.id}
        isOpen={isOpen}
        onClose={OnCloseWithRefetch}
        initialRef={initialRef}
        finalRef={finalRef}
      />
    </>
  );
};
