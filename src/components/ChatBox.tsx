import { memo } from "react";
import { useBearStore } from "../stores";

const ChatBox = () => {
  const prompt = useBearStore((state) => state.prompt);
  const loading = useBearStore((state) => state.loading);

  return (
    <div className="pb-[10rem] mt-10">
      {prompt?.map((item, index) => {
        return (
          <div key={index}>
            {index % 2 === 0 || index === 0 ? (
              <div className="chat chat-end mb-4">
                <div className="chat-bubble">{item}</div>
              </div>
            ) : (
              <div className="chat-bubble mb-4">{item}</div>
            )}
          </div>
        );
      })}

      {loading && (
        <div className="flex mt-4 flex-col gap-2 w-10/12">
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-1/2"></div>
        </div>
      )}
    </div>
  );
};

export default memo(ChatBox);
