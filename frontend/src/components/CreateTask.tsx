import {
  ReactElement,
  useEffect,
} from "react";
import {
  getAllTodosQueryKey,
  Task,
  useCreateTodo,
  useEditTodo,
} from "../api";
import {
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { useQueryClient } from "react-query";

interface CreateTaskProps {
  task?: Task;
  onSuccess?: () => void;
}

type FormState = Pick<Task, "title" | "description" | "dateTime">


function CreateTask({ task, onSuccess }: CreateTaskProps): ReactElement {
  const queryClient = useQueryClient();
  const { mutateAsync: createTodo } = useCreateTodo();
  const { mutateAsync: editTodo } = useEditTodo();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<FormState>();

  useEffect(() => {
    reset(task);
  }, [reset, task]);

  const onSubmit: SubmitHandler<FormState> = async (data: FormState) => {
    if (task) {
      await editTodo({ id: task.id, ...data });
    } else {
      await createTodo(data);
    }

    await queryClient.invalidateQueries(getAllTodosQueryKey());

    onSuccess?.();
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="my-5 rounded-lg p-3 border border-orange-500 flex flex-col">
      <input {...register("title", { required: true })} type="text" placeholder="Title"
             className="font-medium text-lg border-b" />
      <input {...register("description", { required: true })} type={"text"} placeholder="Task description" />

      <div className="flex items-stretch gap-5 justify-end">
        <input {...register("dateTime", { required: true })} type="datetime-local"
               className="border border-orange-500 p-1 rounded-lg" />
        <button type="submit" className="font-medium bg-orange-500 rounded-xl px-2 py-1 text-white w-20">Save</button>
      </div>
    </form>
  );
}

export default CreateTask;