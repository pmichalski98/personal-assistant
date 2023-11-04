"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
<<<<<<< HEAD
import { SendIcon } from "lucide-react";
import { FormEvent, useState } from "react";
=======
import { Mic, SendIcon } from "lucide-react";
import { useState } from "react";
import { OpenAIWhisperAudio } from "langchain/document_loaders/fs/openai_whisper_audio";
>>>>>>> 2a8281d12e4225d7ee3b8c45aed7fc09db6b54c5

export default function Home() {
  const [prompt, setPrompt] = useState("");

<<<<<<< HEAD
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
=======
  // async function getTranscript() {
  //   if (!blob) return;
  //   const loader = new OpenAIWhisperAudio(blob);

  //   const docs = await loader.load();

  //   console.log(docs);
  // }

  async function whisper() {
    // const filePath = "./data/testaudio.mp3";

    const loader = new OpenAIWhisperAudio(blob!);

    const docs = await loader.load();

    return docs[0].pageContent;
  }

  async function startRecording() {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    setStream(stream);
    const mediaRecorder = new MediaRecorder(stream);
    setRecorder(mediaRecorder);
    mediaRecorder.start();

    const chunks: Blob[] = [];
    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };
    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: "audio/webm" });
      setBlob(blob);
      const blobUrl = URL.createObjectURL(blob);
      setBlobUrl(blobUrl);
    };
  }

  function stopRecording() {
    if (recorder) {
      recorder.stop();
      recorder.stream.getTracks().map((track) => track.stop());
      const text = whisper();
      console.log(text);
>>>>>>> 2a8281d12e4225d7ee3b8c45aed7fc09db6b54c5
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
<<<<<<< HEAD
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
=======
        <div className="h-1/3">
          {blobUrl && (
            <audio controls>
              {" "}
              <source src={blobUrl} type="audio/mpeg" />
            </audio>
          )}
        </div>
        <div className="flex items-center relative">
          <Input placeholder="Ask me anything..." className="" />
          <div className="absolute top-0 flex justify-center items-center space-x-3 right-0">
            <button
              className="text-slate-400 hover:text-slate-600"
              onClick={startRecording}
            >
              <Mic size="20" />
            </button>
            <Button
              // onClick={(e) => handleClick(e)}
              size="icon"
            >
              <SendIcon />
            </Button>
          </div>
        </div>
>>>>>>> 2a8281d12e4225d7ee3b8c45aed7fc09db6b54c5
      </div>
    </main>
  );
}
