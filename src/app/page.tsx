"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChat } from "@ai-sdk/react";
import { CornerDownLeft } from "lucide-react";

export default function Home() {
  let { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();

  return (
    <div>
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
        />
        <div>
          <Button disabled={isLoading}>
            <div>Ask</div>
            <div>
              <div>
                <CornerDownLeft />
              </div>
            </div>
          </Button>
        </div>
      </form>
      <div>
        {JSON.stringify(messages)}
      </div>
    </div>
  );
}
