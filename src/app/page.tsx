"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SendIcon } from "lucide-react";
import { FormEvent, useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3001/test", {
        method: "POST",
        body: JSON.stringify({
          test: prompt,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const textRes = await res.json();
      console.log(textRes);
      setPrompt("");
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
        <div className="h-2/3"></div>
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
