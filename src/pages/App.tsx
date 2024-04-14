import Introduction from "../components/Introduction";
import InputPrompts from "../components/InputPrompts";
import ChatBox from "../components/ChatBox";

import { useBearStore } from "../stores";
import AuthorModal from "../components/AuthorModal";

export default function App() {
  const prompt = useBearStore((state) => state.prompt);
  const author = useBearStore((state) => state.author);

  return (
    <div className="container h-screen relative">
      <AuthorModal />
      {prompt.length === 0 && <Introduction />}
      {author.length !== 0 && <ChatBox />}
      <InputPrompts />
    </div>
  );
}
