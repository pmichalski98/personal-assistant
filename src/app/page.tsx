"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SendIcon } from "lucide-react";
import { FormEvent, useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [conversation, setConversation] = useState<string>();

  async function handleSubmit(e: FormEvent) {
    const URL = "http://localhost:3002";
    e.preventDefault();
    try {
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };
      const res = await fetch(`${URL}/chat`, {
        method: "POST",
        body: JSON.stringify({
          query: prompt,
        }),
        headers,
      });
      const reader = res.body?.getReader();
      while (true) {
        const chunk = await reader?.read();
        const { done, value } = chunk!;
        if (done) {
          break;
        }
        const decoder = new TextDecoder("utf-8");
        const decodedChunk = decoder.decode(value);
        const lines = decodedChunk.split("\n");
        setConversation((prev) => prev + lines[0]);
        console.log(lines);
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <main className="p-14 justify-center min-h-screen text-xl flex">
      <div className="w-full ">
        <div className="flex gap-4 items-center">
          <Separator className="flex-1/3" />
          <h2>Chat</h2>
          <Separator className="flex-1/3" />
        </div>

        <div className="h-2/3">
          {conversation}
          {/*{conversation &&*/}
          {/*  conversation.map((message) => {*/}
          {/*    return <div key={message}>{message}</div>;*/}
          {/*  })}*/}
        </div>
        <form onSubmit={handleSubmit} className="flex items-center relative">
          <Input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask me anything..."
            className=""
          />
          <Button size="icon" className="absolute top-0 right-0">
            <SendIcon />
          </Button>
        </form>
      </div>
    </main>
  );
}
