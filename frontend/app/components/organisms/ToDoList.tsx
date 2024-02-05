import { ToDoArea, ToDoAreaProps } from "../molecules/ToDoArea";

export interface ToDoListProps {
	ToDosList: ToDoAreaProps[];
}

export const ToDoList = (props : ToDoListProps) => {
	return (
		<>
			{props.ToDosList.map((todoArea) => (
				<ToDoArea key={todoArea.title} title={todoArea.title} ToDos={todoArea.ToDos} />
			))}
		</>
	);
}