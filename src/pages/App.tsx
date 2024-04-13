import Introduction from "../components/Introduction";
import InputPrompts from "../components/InputPrompts";
import ChatBox from "../components/ChatBox";

export default function App() {
  return (
    <div className="container h-screen relative">
      <Introduction />
      <ChatBox />
      <InputPrompts />
    </div>
  );
}
