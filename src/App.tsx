import { Send } from "lucide-react";

import { useCallback, useState } from "react";

import { GoogleGenerativeAI } from "@google/generative-ai";

import { create } from "zustand";

const usePrompts = (set: unknown) => ({
  prompts: [],
  addPrompts: (params: string) => {
    set((state: { prompts: string }) => ({
      prompts: [...state.prompts, params],
    }));
  },
});

const promptsStore = create(usePrompts);

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_SOME_KEY);

export default function App() {
  const addQuestions = promptsStore((state) => state.addPrompts);
  const questioner = promptsStore((state) => state.prompts);

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const [prompts, setPrompts] = useState("");
  const [tryAgain, setTryAgain] = useState(false);

  const aiRun = useCallback(async () => {
    try {
      const result = await model.generateContent(prompts);
      const response = result.response.text();
      addQuestions(response?.replace(/[^\w\s]/gi, ""));

      setTimeout(() => {
        if (response) {
          setTryAgain(true);
        }
      }, 5000);
    } catch (error) {
      throw new Error("ups something went wrong!");
    }
  }, [addQuestions, model, prompts]);

  console.log(tryAgain);
  const handleClick = useCallback(() => {
    addQuestions(prompts);
    aiRun();
  }, [addQuestions, aiRun, prompts]);

  return (
    <div className="container h-screen relative overflow-hidden">
      <div className="my-10">
        <h1 className="text-3xl font-bold">Selamat Datang di OpenDe!</h1>
        <p>Silahkan tulis apapun yg ingin kamu cari</p>
      </div>

      <div className="h-[70vh] lg:h-[100vh] overflow-y-scroll">
        {questioner.map((item, index) => {
          return index % 2 === 0 || index === 0 ? (
            <div key={index + 2} className="chat chat-end">
              <div className="chat-bubble">{item}</div>
            </div>
          ) : (
            <div key={index + 1} className="chat chat-start">
              <div className="chat-bubble">{item}</div>
            </div>
          );
        })}
      </div>

      <div className="absolute p-4 w-full flex items-center gap-2 bottom-10 inset-x-0">
        <input
          onChange={(e) => {
            setPrompts(e.target.value);
          }}
          type="text"
          placeholder="Type here"
          className="input w-full input-bordered focus:border-none active:border-none"
        />
        <button onClick={async () => handleClick()} className="btn btn-accent">
          <Send />
        </button>
      </div>
    </div>
  );
}
