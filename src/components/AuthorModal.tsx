import { useEffect } from "react";
import { useBearStore } from "../stores";

export default function AuthorModal() {
  const author = useBearStore((state) => state.author);
  const setAuthor = useBearStore((state) => state.setAuthor);

  useEffect(() => {
    if (typeof window !== "undefined" && author.length === 0) {
      const usernameElement = document.getElementById("username");
      if (usernameElement instanceof HTMLDialogElement) {
        usernameElement.showModal();
      } else {
        console.error("Element with id 'username' is not a dialog element.");
      }
    }
  }, [author.length]);

  return (
    <dialog id="username" className="modal">
      <div className="modal-box w-full">
        <p className="mb-4 font-semibold">Your name </p>
        <input
          type="text"
          onChange={(e) => {
            setAuthor(e.target.value);
          }}
          placeholder="Enter your name"
          className="input input-bordered w-full"
        />
        <ul className="list-disc px-4 mt-4 gap-2">
          <li className="text-xs italic">min 4 characters </li>
          <li className="text-xs italic">max 20 Chart</li>
        </ul>

        <div className="modal-action">
          <form method="dialog">
            <button
              disabled={author.length < 4 || author.length > 20}
              className="btn btn-info text-white"
            >
              Done
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
