"use client";

import { authClient } from "@/lib/auth/auth-client";

export default function CreateUserPage() {
  async function createUser() {
    // const { data, error } = await authClient.signUp.email({
    //   name: "Tire Depot",
    //   email: "test@tiredepot.com",
    //   password: "Depot@123",
    //   company: "E02",
    // });
    // if (error) {
    //   console.error("Error:", error);
    //   alert(error.message);
    //   return;
    // }
    // console.log("Created user:", data);
    // alert("User created!");
  }

  return <button onClick={createUser}>Create User</button>;
}
