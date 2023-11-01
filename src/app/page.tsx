"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { SendIcon } from "lucide-react";

//e: MouseEvent<HTMLButtonElement, MouseEvent>
async function handleClick(e: MouseEvent) {
  // const button = document.querySelector("#voice");
  const button = e.currentTarget;
  if (!button) return;
  console.log(e.currentTarget);

  button.addEventListener("click", async () => {
    await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
  });
}

export default function Home() {
  return (
    <main className="p-14 justify-center min-h-screen text-xl flex">
      <div className="w-full ">
        <div className="flex gap-4 items-center">
          <Separator className="flex-1/3" />
          <h2>Chat</h2>
          <Separator className="flex-1/3" />
        </div>
        <div className="h-1/3"></div>
        <div className="flex items-center relative">
          <Input placeholder="Ask me anything..." className="" />
          <Button
            onClick={(e) => handleClick(e)}
            size="icon"
            className="absolute top-0 right-0"
          >
            <SendIcon />
          </Button>
        </div>
      </div>
    </main>
  );
}
