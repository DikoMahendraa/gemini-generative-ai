import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface BearState {
  prompt: string[];
  addQuestions: (prompt: string) => void;
}

export const useBearStore = create<BearState>()(
  persist(
    (set) => ({
      prompt: [],
      addQuestions: (params) =>
        set((state) => ({
          prompt: [...state.prompt, params],
        })),
    }),
    {
      name: "bear-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
