import React, { useRef } from "react";
import { Textarea } from "@/components/ui/textarea";

interface PromptInputI {
  handleSubmit: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  query: string;
  setQuery: (value: string) => void;
}
function PromptInput({ handleSubmit, query, setQuery }: PromptInputI) {
  const textAreaRef = useRef(null);

  return (
    <Textarea
      ref={textAreaRef}
      className="pr-12 overflow-y-hidden"
      value={query}
      onKeyDown={async (e) => {
        if (e.key === "Enter") {
          handleSubmit(e);
        }
      }}
      onChange={(e) => {
        if (e.target.value === "") {
          console.log(e.target.value, "here");
          //@ts-ignore
          textAreaRef.current.style.height = "40px";
        }
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
  );
}

export default PromptInput;
