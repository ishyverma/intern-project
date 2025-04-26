"use client";

import { Input } from "@/components/ui/input";
import { useChat } from "@ai-sdk/react";
import { CornerDownLeft, House, LogOut, Router, UserRound } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import ChatBubble from "@/components/ui/chat-bubble";

const Thread = () => {
  let { messages, isLoading, input, handleInputChange, handleSubmit } =
    useChat();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="dark:bg-[#262626] bg-white p-2 h-[100vh]">
      <div className="flex justify-center">
        <div className="sm:w-[60vw] w-[95vw] h-[90vh] flex flex-col justify-between items-normal">
          <div
            ref={containerRef}
            className="overflow-y-auto scrollbar-hide self-center text-wrap"
          >
            {messages.length === 0 && (
              <div className="h-[75vh] flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-2xl font-bold font-serif">
                    Welcome to Thinkr
                  </h1>
                  <h1 className="text-2xl text-[#A1A1AA] mt-4">
                    What do you want to explore today?
                  </h1>
                  <h1 className="text-2xl text-[#A1A1AA]">
                    I can help you{" "}
                    <span className="italic font-semibold">
                      summarise, code, create images
                    </span>{" "}
                    & more.
                  </h1>
                </div>
              </div>
            )}
            <div className="sm:w-[55vw] w-[85vw]">
              {messages.map((m) => (
                <ChatBubble
                  key={m.id}
                  message={m.content}
                  sentBy={`${m.role === "user" ? "User" : "AI"}`}
                />
              ))}
            </div>
          </div>
          <div className="text-center">
            <div className="relative">
              <form
                className="relative"
                onSubmit={(event) => {
                  event.preventDefault();
                  handleSubmit(event, {
                    data: {
                      prompt: input,
                    },
                  });
                  input = "";
                }}
              >
                <Input
                  onClick={() => {}}
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Type your prompt here"
                  className="w-full h-16 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 pr-24 my-2 border dark:border-[#252527] border-[#E4E4E7]"
                />
                <div className="absolute top-3 right-2">
                  <Button disabled={isLoading} className="px-2 flex gap-1">
                    <div className="font-extrabold text-white dark:text-black">
                      Ask
                    </div>
                    <div>
                      <div className="dark:bg-black bg-white px-3 py-[6px] rounded-lg">
                        <CornerDownLeft className="text-[#A1A1AA] h-6" />
                      </div>
                    </div>
                  </Button>
                </div>
              </form>
            </div>
            <small className="text-black font-grotsek font-medium dark:text-white">
              Thinkr may make mistakes. Check important info and please report
              any bugs.
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Thread;
