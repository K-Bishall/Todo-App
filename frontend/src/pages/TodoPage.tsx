import {
  ReactElement,
  useState,
} from "react";
import TodoItem from "../components/TodoItem.tsx";
import cn from "../utils/cn.ts";
import CreateTask from "../components/CreateTask.tsx";
import {
  getAllTodosQueryKey,
  Task,
  useDeleteTodo,
  useGetAllTodos,
  useToggleTodoAsDone,
} from "../api";
import { useQueryClient } from "react-query";


function TodoPage(): ReactElement {
  const queryClient = useQueryClient();

  const [showDone, setShowDone] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task>();

  const { data: allTasks } = useGetAllTodos({ isDone: showDone });
  const { mutateAsync: deleteTodo } = useDeleteTodo();
  const { mutateAsync: toggleDone } = useToggleTodoAsDone();

  const handleDelete = async (task: Task) => {
    await deleteTodo(task.id);
    await queryClient.invalidateQueries(getAllTodosQueryKey());
  };

  const handleDone = async (task: Task) => {
    await toggleDone(task.id);
    await queryClient.invalidateQueries(getAllTodosQueryKey());
  };


  return (
    <div className="mt-5">
      <CreateTask task={selectedTask} onSuccess={() => setSelectedTask(undefined)} />

      <div className="flex justify-end">
        <button
          className={cn("text-sm font-medium rounded-full px-2 py-1 border-2 border-orange-500 text-orange-500 transition-colors", showDone && "bg-orange-500 text-white")}
          onClick={() => setShowDone(it => !it)}>Show Done
        </button>
      </div>

      <div className="flex flex-col mt-3 p-8 pt-4 rounded-xl bg-orange-50 h-[60vh] overflow-y-scroll no-scrollbar">
        {(allTasks?.data ?? []).map((it, index) => <TodoItem key={index} task={it}
                                                             onClickEdit={() => setSelectedTask(it)}
                                                             onClickDelete={() => handleDelete(it)}
                                                             onCheck={() => handleDone(it)} />)}
      </div>
    </div>
  );
}

export default TodoPage;