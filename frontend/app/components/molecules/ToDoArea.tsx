import { Box, Text, VStack } from "@chakra-ui/react";
import { ToDo, ToDoInfo } from "./ToDo";

export interface ToDoArea {
  title: string;
  ToDos: ToDoInfo[];
}

export interface ToDoAreaProps {
  title: string;
  ToDos: ToDoInfo[];
  todoRefetch: () => void;
  inProgressRefetch: () => void;
  completeRefetch: () => void;
}

const selectColor = (title: string) => {
  if (title === "Complete") return "purple.50";
  else if (title === "In Progress") return "cyan.50";
  else return "blue.50";
};

export const ToDoArea = (props: ToDoAreaProps) => {
  const bgColor = selectColor(props.title);
  return (
    <Box w="100%">
      <VStack spacing={2} p={4} borderRadius="lg" bgColor={bgColor}>
        <Text fontSize={"2xl"} fontWeight={"bold"}>
          {props.title}
        </Text>
        <VStack spacing={2} w="100%" maxH="35vh" overflowY="auto">
          {props.ToDos &&
            props.ToDos.map((todo) => (
              <ToDo
                key={todo.id}
                id={todo.id}
                title={todo.title}
                status={todo.status}
                toDoRefetch={props.todoRefetch}
                inProgressRefetch={props.inProgressRefetch}
                completeRefetch={props.completeRefetch}
              />
            ))}
        </VStack>
      </VStack>
    </Box>
  );
};
