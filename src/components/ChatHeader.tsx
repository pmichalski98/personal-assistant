import { Separator } from "@/components/ui/separator";

function ChatHeader() {
  return (
    <div className="flex gap-4 items-center">
      <Separator className="flex-1/3" />
      <h2>Chat</h2>
      <Separator className="flex-1/3" />
    </div>
  );
}

export default ChatHeader;
