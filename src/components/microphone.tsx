"use client";

import { useState } from "react";
import { Button } from "./ui/button";

export default function Microphone() {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);
  const [blob, setBlob] = useState<Blob | null>(null);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

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
    }
  }

  return;
  <>
    {" "}
    {blobUrl && (
      <audio controls>
        {" "}
        <source src={blobUrl} type="audio/mpeg" />
      </audio>
    )}
    <Button onClick={startRecording}>Start</Button>
    <Button onClick={stopRecording}>Stop</Button>
  </>;
}
