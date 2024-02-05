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
import { FormModal } from "../organisms/FormModal";
import React from "react";

export interface ToDoProps {
  id: string;
  title: string;
  status: number;
}

const TODO = 0;
const IN_PROGRESS = 1;
const COMPLETE = 2;

export const ToDo = (props: ToDoProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
	const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  const onRemove = () => {
    // 削除処理
		alert("remove");
  };

  const onNext = () => {
    // 移動処理
		// statusをインクリメント
		alert("start");
  };

	const onBack = () => {
		// statusをデクリメント
		alert("back");
	}
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
          {(props.status === TODO  || props.status === IN_PROGRESS) ? (
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
              onRemove();
            }}
          >
            削除
          </Button>
        </Box>
      </Box>
      <FormModal id={props.id} isOpen={isOpen} onClose={onClose} initialRef={initialRef} finalRef={finalRef}/>
    </>
  );
};
