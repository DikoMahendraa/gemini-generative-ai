import { useBearStore } from "../stores";

export default function ChatBox() {
  const questions = useBearStore((state) => state.prompt);

  return (
    <div className="pb-[10rem]">
      {questions?.map((item, index) => {
        return (
          <div key={index}>
            {index % 2 === 0 || index === 0 ? (
              <div className="chat chat-end">
                <div className="chat-bubble">{item}</div>
              </div>
            ) : (
              <div className="chat chat-start">
                <div className="chat-bubble">{item}</div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
