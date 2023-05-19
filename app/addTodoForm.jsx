"use client";

import { Context } from "@/components/Clients";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";

const AddTodoForm = () => {

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const {user} = useContext(Context);

  const subbmitHandle = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/newtask', {
        method: "POST",
        body: JSON.stringify({
          title,
          description
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await res.json();
      if (!data.succes) {
        toast.error(data.message)
      }
      toast.success(data.message)
    } catch (err) {
      toast.error(data.message)
    }
  }

  
if (!user._id) return redirect('/login')
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
