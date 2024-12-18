
interface Todo {
  input: string;
  completed: boolean;
}

interface HeaderProps {
  todos: Todo[];
}

function Header(props: HeaderProps) {
  const { todos } = props;
  const activeTodos = todos.filter(todo => !todo.completed);
  const todosLength = activeTodos.length;
  const isTasksPlural = todosLength != 1;
  const taskOrTasks = isTasksPlural ? 'tasks' : 'task';




  return (
    <header>
      <h1 className='text-gradient'>You have {todosLength} active {taskOrTasks}.</h1>
    </header>
  );
}

export default Header;