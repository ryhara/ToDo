import { ToDoArea, ToDoAreaProps } from "../molecules/ToDoArea";

export interface ToDoListProps {
	ToDosList: ToDoArea[];
	toDoRefetch: () => void;
	inProgressRefetch: () => void;
	completeRefetch: () => void;
}

export const ToDoList = (props : ToDoListProps) => {
	return (
		<>
			{props.ToDosList.map((todoArea) => (
				<ToDoArea key={todoArea.title} title={todoArea.title} ToDos={todoArea.ToDos} todoRefetch={props.toDoRefetch} inProgressRefetch={props.inProgressRefetch} completeRefetch={props.completeRefetch} />
			))}
		</>
	);
}