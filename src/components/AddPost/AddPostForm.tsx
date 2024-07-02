import { revalidatePath } from "next/cache";

export default function AddPostForm() {
  const addPost = async (formData: FormData) => {
    "use server";
    const response = await fetch("https://dummyjson.com/posts/add", {
      method: "POST",
      body: JSON.stringify({
        title: formData.get("title"),
        body: formData.get("body"),
        userId: 1,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    revalidatePath("/posts");
  };

  return (
    <form
      action={addPost}
      className="flex flex-col rounded max-w-[700px] mb-10 mx-auto space-y-2"
    >
      <input
        type="text"
        name="title"
        placeholder="Title"
        className="border rounded h-10 w-96 px-3  text-black"
      />
      <textarea
        name="body"
        placeholder="Body"
        className="border rounded w-96 p-3 text-black"
        rows={5}
        required
      />
      <button className="border rounded" type="submit">
        Submit
      </button>
    </form>
  );
}
