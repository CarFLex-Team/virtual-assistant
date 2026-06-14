async function createUser() {
  const res = await fetch("http://localhost:3000/api/auth/sign-up/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: "http://localhost:3000", // ✅
    },
    body: JSON.stringify({
      name: "John",
      email: "john@company.com",
      password: "temppassword123",
      company: 1,
    }),
  });

  const data = await res.json();
  console.log(data);
}

createUser();
//npx tsx utils/create-user.ts
