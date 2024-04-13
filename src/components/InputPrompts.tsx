import { Send, Trash } from "lucide-react";
import { useCallback, useState } from "react";
import { model } from "../services/generative.ai";
import { useBearStore } from "../stores";

const InputPrompt: React.FC = () => {
  const [value, setValue] = useState("");
  const addQuestions = useBearStore((state) => state.addQuestions);
  const prompt = useBearStore((state) => state.prompt);
  const hasTrash = prompt.length > 1;

  const onGenerativeAI = useCallback(async () => {
    addQuestions(value);
    try {
      const result = await model.generateContent(value);
      const response = result.response.text();
      addQuestions(response?.replace(/[^\w\s]/gi, "\n"));
      setValue("");
    } catch (error) {
      throw new Error("ups something went wrong!");
    }
  }, [addQuestions, value]);

  const onChangePrompt = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target;
      setValue(val.value);
    },
    []
  );

  const onSendPrompt = useCallback(() => onGenerativeAI(), [onGenerativeAI]);

  return (
    <div className="fixed p-4 w-full bg-dark-primary container flex items-center gap-2 bottom-0 inset-x-0">
      <input
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangePrompt(e)}
        type="text"
        placeholder="Enter your commands here"
        className="input w-full input-bordered focus:border-none active:border-none"
      />
      <button onClick={onSendPrompt} className="btn btn-accent">
        <Send />
      </button>
      {hasTrash && (
        <button
          onClick={() => useBearStore.persist.clearStorage()}
          className="btn btn-error"
        >
          <Trash />
        </button>
      )}
    </div>
  );
};

export default InputPrompt;
