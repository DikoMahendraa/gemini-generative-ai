import { Smile } from "lucide-react";
import { memo } from "react";
import { useBearStore } from "../stores";

const Introduction: React.FC = () => {
  const author = useBearStore((state) => state.author);
  return (
    <div className="my-10 h-full overflow-hidden flex justify-center items-center">
      <div className="flex-col justify-center items-center">
        <div className="flex justify-center mb-4">
          <Smile color="white" size={40} />
        </div>
        <h1 className="text-3xl font-bold">
          Hi, <span className="capitalize">{author}</span>
        </h1>

        <p className="mt-2">How can I help you today?</p>
      </div>
    </div>
  );
};

export default memo(Introduction);
