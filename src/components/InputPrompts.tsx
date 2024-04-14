import { Send, Trash } from "lucide-react";
import { memo, useCallback, useState } from "react";
import { model } from "../services/generative.ai";
import { useBearStore } from "../stores";

const InputPrompt: React.FC = () => {
  const [value, setValue] = useState("");
  const setQuestions = useBearStore((state) => state.setQuestions);
  const setLoading = useBearStore((state) => state.setLoading);
  const prompt = useBearStore((state) => state.prompt);
  const hasTrash = prompt.length > 1;

  const onGenerativeAI = useCallback(async () => {
    setLoading(true);
    if (value.length > 2) {
      try {
        const result = await model.generateContent(value);
        const response = result.response.text();
        if (response.length > 1) {
          setQuestions(response);
        }
        setLoading(false);
        setValue("");
      } catch (error) {
        setLoading(false);
        throw new Error("ups something went wrong!");
      }
    }
  }, [setLoading, setQuestions, value]);

  const onChangePrompt = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target;
      setValue(val.value);
    },
    []
  );

  const onSendPrompt = useCallback(() => {
    setQuestions(value);
    onGenerativeAI();
  }, [onGenerativeAI, setQuestions, value]);

  const onResetQnA = useCallback(() => useBearStore.persist.clearStorage(), []);

  return (
    <div className="fixed p-4 w-full bg-dark-primary container flex items-center gap-2 bottom-0 inset-x-0">
      <input
        required
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangePrompt(e)}
        type="text"
        placeholder="Enter your commands here"
        className="input w-full input-bordered focus:border-none active:border-none"
      />
      <button
        disabled={value.length < 2}
        onClick={onSendPrompt}
        className="btn btn-accent"
      >
        <Send color="white" />
      </button>
      {hasTrash && (
        <button onClick={onResetQnA} className="btn btn-error">
          <Trash color="white" />
        </button>
      )}
    </div>
  );
};

export default memo(InputPrompt);
