import {
  Button,
  FormControl,
  FormLabel,
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
} from "@chakra-ui/react";
import React from "react";

export interface FormModalProps {
  id?: string;
  isOpen: boolean;
  onClose: () => void;
  initialRef?: React.MutableRefObject<null>;
  finalRef?: React.MutableRefObject<null>;
}

export const FormModal = (props: FormModalProps) => {
  // TODO : idからToDoの詳細情報を取得する
  const todo = {
    id: props.id,
    title: "Do the dishes",
    status: 0,
  };

	const onCreate = () => {
		alert("create");
	}

	const onUpdate = () => {
		alert("update");
	}

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
          <ModalHeader>Detail</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl my={2}>
              <FormLabel>Title</FormLabel>
              <Input ref={props.initialRef} placeholder="Title" />
            </FormControl>
            <FormControl my={2}>
              <FormLabel>Status</FormLabel>
              <Select placeholder="Select status">
                <option value="0" selected={props.id === undefined}>
                  ToDo
                </option>
                <option value="1">In Progress</option>
                <option value="2">Complete</option>
              </Select>
            </FormControl>
            <FormControl my={2}>
              <FormLabel>Description</FormLabel>
              <Textarea placeholder="ToDo description ..." />
            </FormControl>
          </ModalBody>
          <ModalFooter>
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
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
