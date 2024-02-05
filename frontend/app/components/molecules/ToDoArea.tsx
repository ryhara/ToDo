import { Box, Text, VStack } from "@chakra-ui/react";
import { ToDo, ToDoProps } from "./ToDo";

export interface ToDoAreaProps {
  title: string;
  ToDos: ToDoProps[];
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
        {props.ToDos && props.ToDos.map((todo) => (
          <ToDo
            key={todo.id}
            id={todo.id}
            title={todo.title}
            status={todo.status}
          />
        ))}
      </VStack>
    </Box>
  );
};
