"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Mic, SendIcon } from "lucide-react";
import { useState } from "react";
import { OpenAIWhisperAudio } from "langchain/document_loaders/fs/openai_whisper_audio";

export default function Home() {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);
  const [blob, setBlob] = useState<Blob | null>(null);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

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
      </div>
    </main>
  );
}
