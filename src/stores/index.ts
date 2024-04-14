import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface BearState {
  prompt: string[];
  loading: boolean;
  author: string;
  setQuestions: (prompt: string) => void;
  setLoading: (params: boolean) => void;
  setAuthor: (params: string) => void;
}

export const useBearStore = create<BearState>()(
  persist(
    (set) => ({
      author: "",
      prompt: [],
      loading: false,
      setQuestions: (params) =>
        set((state) => ({
          prompt: [...state.prompt, params],
        })),
      setLoading: (params) =>
        set(() => ({
          loading: params,
        })),
      setAuthor: (params) =>
        set(() => ({
          author: params,
        })),
    }),
    {
      name: "bear-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
