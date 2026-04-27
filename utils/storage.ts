export const saveThreads = (threads: any) =>
  localStorage.setItem("chatThreads", JSON.stringify(threads));
export const loadThreads = () => {
  const saved = localStorage.getItem("chatThreads");
  console.log("Loaded threads:", saved);
  return saved ? JSON.parse(saved) : [];
};
