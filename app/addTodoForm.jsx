"use client";

import { Context } from "@/components/Clients";
import { redirect ,useRouter} from 'next/navigation';
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";

const AddTodoForm = () => {

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const router = useRouter()

  const { user } = useContext(Context);

  const subbmitHandle = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/newtask', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          description
        }),
      });
      const data = await res.json();
      if (!data.success) {
        toast.error(data.message)
      }
      toast.success(data.message)
      router.refresh();
      setTitle('')
      setDescription('')
      
    } catch (err) {
      toast.error(err);
    }
  }

  if (!user._id) {
    return redirect("/login")
  }

  return (
    <div className="login">
      <section>
        <form onSubmit={subbmitHandle}>
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            placeholder="Task Description"
          />
          <button type="submit">Add Task</button>
        </form>
      </section>
    </div>
  );
};

export default AddTodoForm;
