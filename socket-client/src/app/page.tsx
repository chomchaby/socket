"use client";
import EssayInput from "@/components/EssayInput";
import { useState, useEffect } from "react";
import { socket } from "@/socket";

export default function Home() {
  const questionList = ["Q1", "Q2", "Q3"];
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [transport, setTransport] = useState("N/A");
  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.io.engine.off("upgrade");
    };
  }, []);
  const handleSendMessage = (question: string, answer: string) => {
    console.log(question, answer);
    socket.emit("sent-message", { question, answer, timestamp: Date.now() });
  };
  // for test the performance, we sent request every second
  useEffect(() => {
    const interval = setInterval(() => {
      sendSocketRequest();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  const sendSocketRequest = () => {
    const data = {
      message: "Hello from client!",
      timestamp: Date.now(),
    };

    socket.emit("greeting", data);
    console.log("Socket request sent:", data);
  };
  ////////////////////////////////////////////////
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <p>Status: {isConnected ? "connected" : "disconnected"}</p>
        <p>Transport: {transport}</p>
        {questionList.map((q, index) => (
          <EssayInput
            key={index}
            question={q}
            onAnswerChange={(answer: string) => {
              handleSendMessage(q, answer);
            }}
          ></EssayInput>
        ))}
      </main>
    </div>
  );
}
