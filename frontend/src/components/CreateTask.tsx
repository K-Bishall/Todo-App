import {
  ReactElement,
  useMemo,
} from "react";
import { Task } from "../api";
import {
  SubmitHandler,
  useForm,
} from "react-hook-form";

interface CreateTaskProps {
  task?: Task;
}

type FormState = Pick<Task, "title" | "description" | "dateTime">


function CreateTask({ task }: CreateTaskProps): ReactElement {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm<FormState>({
    defaultValues: useMemo(() => task, [task]),
  });

  const onSubmit: SubmitHandler<FormState> = (data: FormState) => {
    reset();
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
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