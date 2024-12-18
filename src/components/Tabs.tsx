interface Todo {
    input: string;
    completed: boolean;
  }
  
  interface TabProps {
    todos: Todo[];
    selectedTab: string;
    setSelectedTab: (tab: string) => void;
  }

function Tabs(props: TabProps ) {
    const { todos, selectedTab, setSelectedTab } = props;
    
    const tabs = ['All', 'Active', 'Completed'];

  return (
    <nav className="tab-container">
        {tabs.map((tab, tabIndex) => {
            const numberOfTasks = tab === 'All' ? 
            todos.length : tab == 'Active' ?
            todos.filter(val => !val.completed).
            length : todos.filter(val => val.completed).length;
            return (
                <button
                onClick={() => setSelectedTab(tab)}
                className={'tab-button ' + (selectedTab === tab ?
                     ' tab-selected' : ' ')}
                key={tabIndex}>
                    <h4>{tab} <span>({numberOfTasks})</span></h4>
                </button>
            )
        }
        )}
        <hr />
    </nav>
  )
}

export default Tabs