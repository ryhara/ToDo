import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { FormModalPresenter } from "./FormModalPresenter";

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

const CREATE_TODO = gql`
  mutation CreateTodo($title: String!, $status: Int!, $description: String) {
    addTodo(title: $title, status: $status, description: $description) {
      title
    }
  }
`;

const UPDATE_TODO = gql`
  mutation UpdateTodo(
    $id: ID!
    $title: String!
    $status: Int!
    $description: String
  ) {
    updateTodo(
      id: $id
      title: $title
      status: $status
      description: $description
    ) {
      id
    }
  }
`;

function formattedDate(time: Date) {
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

function validationCheck(title: string, status: number) {
  if (title === "" || status === undefined || status < 0 || status > 2) {
    return false;
  }
  return true;
}

export const FormModal = (props: FormModalProps) => {
  const [title, setTitle] = useState<string>("");
  const [status, setStatus] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [createdAt, setCreatedAt] = useState<Date>(new Date()); 
  const [updatedAt, setUpdatedAt] = useState<Date>(new Date());

  // ToDoの詳細情報を取得
  const { data, loading, error } = useQuery(GET_TODO, {
    variables: { id: props.id },
    skip: props.id === undefined,
  });

  useEffect(() => {
    const todo = data?.findOneById as ToDoDetail;
    if (todo !== undefined) {
      setTitle(todo.title);
      setStatus(todo.status);
      setDescription(todo.description);
      setCreatedAt(todo.createdAt);
      setUpdatedAt(todo.updatedAt);
    }
  }, [data]);
  const [addTodo, errorAddTodo] = useMutation(CREATE_TODO);
  const [updateTodo, errorUpdateTodo] = useMutation(UPDATE_TODO);
  const onCreate = async (
    title: string,
    status: number,
    description: string
  ) => {
    if (!validationCheck(title, status)) {
      alert("title is empty");
      return;
    }
    console.log(title, status, description);
    await addTodo({
      variables: {
        title: title,
        status: status,
        description: description,
      },
    })
      .then(() => {
        setTitle("");
        setStatus(0);
        setDescription("");
        setCreatedAt(new Date());
        setUpdatedAt(new Date());
        props.onClose();
      })
      .catch((e) => {
        console.log(errorAddTodo);
        console.log(e);
      });
  };

  const onUpdate = async (
    id: string,
    title: string,
    status: number,
    description: string
  ) => {
    if (!validationCheck(title, status)) {
      alert("title is empty");
      return;
    }
    console.log(id, title, status, description);
    await updateTodo({
      variables: {
        id: id,
        title: title,
        status: status,
        description: description,
      },
    })
      .then(() => {
        props.onClose();
      })
      .catch((e) => {
        console.log(errorUpdateTodo);
        console.log(e);
      });
  };

  return (
    <FormModalPresenter
      {...props}
      createdAt={createdAt}
      updatedAt={updatedAt}
      onCreate={onCreate}
      onUpdate={onUpdate}
      formattedDate={formattedDate}
      title={title}
      status={status}
      description={description}
      setTitle={setTitle}
      setStatus={setStatus}
      setDescription={setDescription}
    />
  );
};
