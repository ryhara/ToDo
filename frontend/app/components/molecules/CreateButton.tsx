"use client";
import { Button, useDisclosure } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import React from "react";
import { FormModal } from "../organisms/FormModal/FormModal";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface CreateButtonProps {
  toDoRefetch: () => void;
  inProgressRefetch: () => void;
  completeRefetch: () => void;
}

export const CreateButton = (props: CreateButtonProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const onCloseWithReload = () => {
    onClose();
    props.toDoRefetch();
    props.inProgressRefetch();
    props.completeRefetch();
  };
  return (
    <>
      <Button
        size="lg"
        colorScheme="teal"
        ref={finalRef}
        width="30%"
        my={4}
        onClick={(e) => {
          e.stopPropagation();
          onOpen();
        }}
      >
        New ToDo <AddIcon ml={3} boxSize={4} />
      </Button>
      <FormModal
        isOpen={isOpen}
        onClose={onCloseWithReload}
        initialRef={initialRef}
      />
    </>
  );
};
