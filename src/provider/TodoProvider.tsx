import { createContext, ReactNode, useContext, useState } from "react";
import JSConfetti from 'js-confetti';


const jsConfetti = new JSConfetti()

export type Todo = {
    id: number;
    name: string;
    completed: boolean;
    dueDate: Date;
}

type initialValues = {
    todos: Todo[];
    date: Date | undefined;
    setDate: (date: Date | undefined) => void;
    editingTodo: Todo | null;
    addTodo: (todo: Todo) => void;
    updateTodo: (todo: Todo, id: number) => void;
    findTodo: (id: number) => void;
    deleteTodo: (id: number) => void;
    completeTodo: (todo: Todo) => void;
    handleFilter: (type: string) => void;
}


export const TodoContext = createContext<initialValues>({
    todos: [],
    date: undefined,
    setDate() {
        
    },
    addTodo(){

    },
    editingTodo: null,
    updateTodo(todo, id) {
        
    },
    findTodo(id) {
        
    },
    completeTodo(){

    },
    deleteTodo(id) {
        
    },
    handleFilter(type) {
        
    },
});

export const TodoProvider = (props: {children: ReactNode}) => {

    const storedData = localStorage.getItem('todos');

    const [todos, setTodos] = useState<Todo[]>(storedData ? JSON.parse(storedData) : []);
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

    function addTodo(todo: Todo){
        const updatedTodo = [...todos, todo];
        setTodos(updatedTodo);
        localStorage.setItem('todos', JSON.stringify(updatedTodo));
    }

    
    function findTodo(id: number){
        const findTodo = todos.find((todo) => todo.id === id);
        if(findTodo){
            setEditingTodo(findTodo);
            setDate(findTodo.dueDate);
        }
    }

    function updateTodo(todo: Todo, id: number){
        const findTodo = todos.find((t) => t.id === id);

            if(findTodo){
               const updatedTodo = todos.map((t) => {
                  if(findTodo.id === t.id){
                        return {
                            ...todo
                        }
                    }else{
                      return t
                }
            });
            setTodos(updatedTodo);
            localStorage.setItem('todos', JSON.stringify(updatedTodo));
          }else{
            return;
          }
    }

    
    function deleteTodo(id: number){
        const updatedTodo = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodo);
        localStorage.setItem('todos', JSON.stringify(updatedTodo));
    }

    function completeTodo(todo: Todo){
        const updatedTodo = todos.map((t) => {
            if(t.id === todo.id){
                if(!t.completed){
                    jsConfetti.addConfetti();
                }
                return {
                    ...t,
                    completed: !t.completed
                }
            }else{
                return t;
            }
        });

        setTodos(updatedTodo);
        localStorage.setItem('todos', JSON.stringify(updatedTodo));
    }

    function handleFilter(type: string){
        switch(type){
             case 'name':
                const sortedTodoByName = [...todos].sort((a, b) => a.name.localeCompare(b.name));
                return setTodos(sortedTodoByName);

            case 'date':
                const sortedTodoByDate = [...todos].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
                return setTodos(sortedTodoByDate);

             default:
                return todos;
        }
    }

    return (
        <TodoContext.Provider value={{todos, handleFilter, addTodo, date, setDate, findTodo, deleteTodo, editingTodo, completeTodo, updateTodo }}>
            {props.children}
        </TodoContext.Provider>
    )
}

export const useTodo = () => useContext(TodoContext);