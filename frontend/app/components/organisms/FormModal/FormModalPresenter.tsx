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

interface FormModalPresenterProps {
  id?: string;
  isOpen: boolean;
  initialRef?: React.MutableRefObject<null>;
  finalRef?: React.MutableRefObject<null>;
  createdAt: Date;
  updatedAt: Date;
  onClose: () => void;
  onCreate: (title: string, status: number, description: string) => void;
  onUpdate: (
    id: string,
    title: string,
    status: number,
    description: string
  ) => void;
  formattedDate: (time: Date) => string;
  title: string;
  status: number;
  description: string;
  setTitle: (title: string) => void;
  setStatus: (status: number) => void;
  setDescription: (description: string) => void;
}

export const FormModalPresenter = (props: FormModalPresenterProps) => {
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
          <ModalHeader>
            {props.id === undefined ? "Create" : "Edit"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl my={2}>
              <FormLabel>Title</FormLabel>
              <Input
                ref={props.initialRef}
                placeholder="Title"
                value={props.title}
                onChange={(e) => props.setTitle(e.target.value)}
              />
            </FormControl>
            <FormControl my={2}>
              <FormLabel>Status</FormLabel>
              <Select
                placeholder="Select status"
                onChange={(e) => props.setStatus(parseInt(e.target.value))}
              >
                <option value="0" selected={props.status === 0}>
                  ToDo
                </option>
                <option value="1" selected={props.status === 1}>
                  In Progress
                </option>
                <option value="2" selected={props.status === 2}>
                  Complete
                </option>
              </Select>
            </FormControl>
            <FormControl my={2}>
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder="ToDo description ..."
                value={props.description}
                onChange={(e) => props.setDescription(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Flex justifyContent="space-between" w={"100%"}>
              <VStack spacing={2} align={"start"}>
                <Text fontSize="sm">
                  Create At: {props.formattedDate(props.createdAt)}
                </Text>

                <Text fontSize="sm">
                  Update At: {props.formattedDate(props.updatedAt)}
                </Text>
              </VStack>
              <HStack spacing={1}>
                <Button
                  colorScheme={props.id === undefined ? "green" : "blue"}
                  mr={3}
                  onClick={(e) => {
                    e.stopPropagation();
                    props.id === undefined
                      ? props.onCreate(
                          props.title,
                          props.status,
                          props.description
                        )
                      : props.onUpdate(
                          props.id,
                          props.title,
                          props.status,
                          props.description
                        );
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
