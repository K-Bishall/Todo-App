import { ReactElement } from "react";
import { Task } from "../api";
import DeleteIcon from "../assets/trash.svg?react";
import EditIcon from "../assets/pencil.svg?react";
import cn from "../utils/cn";
import {
  format,
  isBefore,
} from "date-fns";

interface TodoItemProps {
  task: Task;
  onClickEdit?: () => void;
  onClickDelete?: () => void;
  onCheck?: () => void;
}

function TodoItem({ task, onCheck, onClickDelete, onClickEdit }: TodoItemProps): ReactElement {
  const isOverdue = !task.isDone && isBefore(task.dateTime, new Date());

  return (
    <div className="flex gap-5 py-5 border-b border-slate-400">
      <input type="checkbox" checked={task.isDone} onChange={onCheck} className="accent-orange-500 h-5 w-5" />

      <div className={cn("flex-grow", task.isDone && "text-gray-500")}>
        <div className="flex items-center gap-5">
          <h3 className={cn("flex-grow font-medium text-lg -mt-1.5")}>{task.title}</h3>

          {isOverdue && <span className="rounded-full px-3 py-1 bg-red-300 text-xs font-medium">Overdue</span>}
          <span>{format(task.dateTime, "eee, MMM dd, hh:mm aa")}</span>
        </div>
        <p className={cn("mt-4")}>{task.description}</p>
      </div>

      {!task.isDone && <EditIcon className="text-orange-500 cursor-pointer -mr-3 w-5 h-5" onClick={onClickEdit} />}
      <DeleteIcon className="text-orange-500 cursor-pointer w-5 h-5" onClick={onClickDelete} />
    </div>
  );
}

export default TodoItem;