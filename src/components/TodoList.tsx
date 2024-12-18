import TodoCard from "./TodoCard";

interface Todo {
    input: string;
    completed: boolean;
}

interface TodoListProps {
    todos: Todo[];
    selectedTab: string;
    handleCompleteTodo: (input: number) => void;
    handleDeleteTodo: (input: number) => void;
    handleEditTodo: (input: number, newInput: string) => void;
    handleClearCompleted: () => void;
    handleIncompleteTodo: (input: number) => void;
}

function TodoList(props: TodoListProps) {
    const { todos, selectedTab, handleClearCompleted } = props;

    const filteredTodos = selectedTab === 'All' ?
        todos : selectedTab === 'Completed' ?
            todos.filter(val => val.completed) :
            todos.filter(val => !val.completed);

    return (
        <>
            {selectedTab === 'Completed' && (
                <button onClick={handleClearCompleted}>Clear Completed</button>
            )}
            {filteredTodos.map((todo, todoIndex) => {
                return (
                    <TodoCard
                        key={todoIndex}
                        todoIndex={todos.findIndex(val => val.input === todo.input)}
                        {...props}
                        todo={todo}
                    />
                );
            })}
        </>
    )
}

export default TodoList;