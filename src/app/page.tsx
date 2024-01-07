"use client";

import { Button } from "@/components/ui/button";
import { SendIcon } from "lucide-react";
import React, { FormEvent, useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import ChatHeader from "@/components/ChatHeader";
import PromptInput from "@/app/PromptInput";

interface ConversationT {
  id: number;
  content: string;
  role: "assistant" | "user";
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [gptResponse, setGptResponse] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [conversation, setConversation] = useState<ConversationT[]>([]);

  console.log(conversation);
  async function handleSubmit(e: FormEvent) {
    setGptResponse("");
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
          query,
        }),
        headers,
      });
      const reader = res.body?.getReader();
      while (true) {
        const chunk = await reader?.read();
        const { done, value } = chunk!;
        if (done) {
          setConversation([
            ...conversation,
            { role: "assistant", content: gptResponse, id: Math.random() },
            { role: "user", content: query, id: Math.random() },
          ]);
          break;
        }
        const decoder = new TextDecoder("utf-8");
        const decodedChunk = decoder.decode(value);
        setErrorMsg("");
        setGptResponse((prev) => prev.concat(decodedChunk));
      }
      setQuery("");
      console.log({ gptResponse }, { query });
    } catch (e) {
      setErrorMsg("Error: No connection with API");
    }
    console.log({ gptResponse }, { query });
  }

  return (
    <main className="p-14 min-h-screen text-xl flex flex-col justify-between ">
      <div>
        <ChatHeader />
        <div className="text-base">
          {conversation &&
            conversation.map((message, index) => {
              return (
                <div className="" key={message.id}>
                  {index > 0 && (
                    <div className="py-4">
                      <h2 className="font-bold">
                        {message.role === "assistant" ? "Assistant" : "You"}
                      </h2>
                      <p className="font-light text-slate-300/90">
                        {message.content}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          {conversation.length > 0 && (
            <div className="py-4">
              <h2 className="font-semibold">Assistant</h2>
              <p className="font-light text-slate-300/90">{gptResponse}</p>
            </div>
          )}
          {errorMsg && (
            <div className=" flex justify-center mt-12 ">
              <p className="bg-red-500 p-4 rounded">{errorMsg}</p>
            </div>
          )}
        </div>
      </div>
      <form onSubmit={handleSubmit} className=" items-center relative">
        <PromptInput
          handleSubmit={handleSubmit}
          query={query}
          setQuery={setQuery}
        />
        <Button
          type="submit"
          size="icon"
          className="absolute bottom-0 right-0 "
        >
          <SendIcon />
        </Button>
      </form>
    </main>
  );
}
