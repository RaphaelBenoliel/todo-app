import  { useState, useEffect, useRef } from 'react';

function TodoCard(props: { todo: any, handleEditTodo: (input: number, newInput: string) => void, handleCompleteTodo: (input: number) => void, handleDeleteTodo: (input: number) => void,handleIncompleteTodo: (input: number) => void, todoIndex: number }) {
    const { todo, todoIndex, handleCompleteTodo, handleDeleteTodo, handleEditTodo, handleIncompleteTodo } = props;
    const [isEditing, setIsEditing] = useState(false);
    const [newInput, setNewInput] = useState(todo.input);
    const inputRef = useRef<HTMLInputElement>(null);
    const saveButtonRef = useRef<HTMLButtonElement>(null);
    const deleteButtonRef = useRef<HTMLButtonElement>(null);

    const handleEditButtonClick = () => {
        if (isEditing) {
            handleEditTodo(todoIndex, newInput);
        }
        setIsEditing(!isEditing);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (
            inputRef.current && !inputRef.current.contains(event.target as Node) &&
            saveButtonRef.current && !saveButtonRef.current.contains(event.target as Node) &&
            deleteButtonRef.current && !deleteButtonRef.current.contains(event.target as Node)
        ) {
            setIsEditing(false);
            setNewInput(todo.input); // Reset input value to original if canceled
        }
    };

    useEffect(() => {
        if (isEditing) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isEditing]);

    return (
        <div className="card todo-item">
            {isEditing ? (
                <input
                    ref={inputRef}
                    type="text"
                    value={newInput}
                    onChange={(e) => setNewInput(e.target.value)}
                />
            ) : (
                <p>{todo.input}</p>
            )}
            <div className="todo-buttons">
                <button onClick={() => handleCompleteTodo(todoIndex)} disabled={todo.completed}>
                    <h6>Done</h6>
                </button>
                <button onClick={() => handleIncompleteTodo(todoIndex)} disabled={!todo.completed}>
                    <h6>Undo</h6>
                </button>
                <button ref={saveButtonRef} onClick={handleEditButtonClick}>
                    <h6>{isEditing ? 'Save' : 'Edit'}</h6>
                </button>
                {isEditing && (
                    <button ref={deleteButtonRef} onClick={() => handleDeleteTodo(todoIndex)}>
                    <h6>Delete</h6>
                </button>
                )}
                
            </div>
        </div>
    );
}

export default TodoCard;