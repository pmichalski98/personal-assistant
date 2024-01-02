"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SendIcon } from "lucide-react";
import { FormEvent, useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";

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
  const textAreaRef = useRef(null);
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

  console.log(conversation);
  return (
    <main className="p-14  min-h-screen text-xl flex flex-col justify-between ">
      <div>
        <div className="flex gap-4 items-center">
          <Separator className="flex-1/3" />
          <h2>Chat</h2>
          <Separator className="flex-1/3" />
        </div>

        <div className="">
          {conversation &&
            conversation.map((message, index) => {
              return (
                <div className="" key={message.id}>
                  {index > 0 && (
                    <div className="py-4">
                      <h2>
                        {message.role === "assistant"
                          ? "Your assistant"
                          : "You"}
                      </h2>
                      <p>{message.content}</p>
                    </div>
                  )}
                </div>
              );
            })}
          {gptResponse ||
            (conversation.length > 0 && (
              <div className="py-4">
                <h2>Your assistant</h2>
                <p>{gptResponse}</p>
              </div>
            ))}
          {errorMsg && (
            <div className=" flex justify-center items-center h-full ">
              <p className="bg-red-500 p-4 rounded">{errorMsg}</p>
            </div>
          )}
        </div>
      </div>
      <form onSubmit={handleSubmit} className=" items-center relative">
        <Textarea
          ref={textAreaRef}
          className="pr-12"
          value={query}
          onKeyDown={async (e) => {
            if (e.key === "Enter") {
              await handleSubmit(e);
            }
          }}
          onChange={(e) => {
            //@ts-ignore
            const scrollHeight = textAreaRef.current?.scrollHeight;
            //@ts-ignore
            textAreaRef.current.style.height =
              scrollHeight > 40 && `${scrollHeight}px`;
            setQuery(e.target.value);
          }}
          required
          placeholder="Ask me anything..."
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
