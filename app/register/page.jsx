"use client";

import { redirect } from 'next/navigation';
import Link from "next/link";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { Context } from "../../components/Clients";

const Page = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { user, setUser } = useContext(Context)

  const registerHandle = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/auth/register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      const data = await res.json();
      if (!data.success) {
        return toast.error(data.message)
      }
      toast.success(data.message);
      setUser(data.user)
      setName('')
      setEmail('')
      setPassword('')
    }
    catch (err) {
      toast.error(data.message)
    }

  }
  if (user._id) {
    return res.redirect('/')
  }


  return (
    <div className="login">
      <section>
        <form onSubmit={registerHandle} >
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Enter Name"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter Email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Enter Password"
          />
          <button type="submit">Sign Up</button>
          <p>OR</p>
          <Link href={"/login"}>Log In</Link>
        </form>
      </section>
    </div>
  )
};

export default Page;
