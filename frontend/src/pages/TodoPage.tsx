import {
  ReactElement,
  useState,
} from "react";
import TodoItem from "../components/TodoItem.tsx";
import cn from "../utils/cn.ts";

const task1 = {
  id: "1",
  title: "Todo 1",
  "description": "Some nice and long description. Some nice and long description. Some nice and long description. Some nice and long description",
  dateTime: new Date(),
  isDone: false,
};
const task3 = {
  id: "1",
  title: "Todo 1",
  "description": "Some nice and long description. Some nice and long description. Some nice and long description. Some nice and long description",
  dateTime: new Date("2024-11-17"),
  isDone: false,
};
const task2 = {
  id: "2",
  title: "Todo 111",
  "description": "Some nice and long description",
  dateTime: new Date(),
  isDone: true,
};

function TodoPage(): ReactElement {
  const [showDone, setShowDone] = useState(false);

  const tasks = [task1, task2, task3, task1, task2, task3, task1, task2];

  return (
    <div className="mt-5">
      <div className="flex justify-end">
        <button
          className={cn("text-sm font-medium rounded-full px-2 py-1 border-2 border-orange-500 text-orange-500 transition-colors", showDone && "bg-orange-500 text-white")}
          onClick={() => setShowDone(it => !it)}>Show Done
        </button>
      </div>

      <div className="flex flex-col mt-3 p-8 pt-4 rounded-xl bg-orange-50 max-h-[70vh] overflow-y-scroll no-scrollbar">
        {tasks.map((it, index) => <TodoItem key={index} task={it} />)}
      </div>
    </div>
  );
}

export default TodoPage;