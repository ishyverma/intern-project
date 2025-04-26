import { cva } from "class-variance-authority";
import { Copy, Download, ThumbsDown, ThumbsUp } from "lucide-react";
import { Button } from "./button";
import { toast } from "sonner";

interface ChatBubbleProps {
  sentBy: "User" | "AI";
  message: string | string[];
}

const chatBubble = cva(["rounded"], {
  variants: {
    intent: {
      user: [
        "flex p-5 rounded-2xl w-auto max-w-lg flex justify-self-end dark:bg-[#171717] bg-[#FAFAFA] dark:text-white text-black mt-2",
      ],
      ai: ["mt-2 bg-[#FAFAFA] p-5 rounded-2xl w-auto"],
    },
  },
});

const ChatBubble = ({ sentBy, message }: ChatBubbleProps) => {
  return (
    <>
      <div className={`flex ${sentBy === "User" ? "justify-self-end" : ""}`}>
        <div className="flex gap-1 flex-col">
          <div>
            <div
              className={`flex items-center ${
                sentBy === "User" && "justify-self-start"
              } gap-3`}
            >
              <div
                className={`bg-black w-8 h-8 rounded-full flex ${
                  sentBy === "User" && "justify-self-end"
                }`}
              />
              <div className="text-sm font-medium">
                {sentBy == "User" ? <p>Shy</p> : <p>Generative Agent</p>}
              </div>
            </div>
          </div>
          <div
            className={`${
              sentBy === "User"
                ? chatBubble({ intent: "user" })
                : chatBubble({ intent: "ai" })
            }`}
          >
            <div className="mt-2">{message}</div>
          </div>
        </div>
      </div>
      {sentBy === "AI" && (
        <div className={`flex gap-2 items-center  mt-2`}>
          <Button
            onClick={() => {
                toast.success("Copied Successfully")
            }}
            size={"icon"}
            variant={"link"}
            className="cursor-pointer hover:bg-secondary transition-all"
          >
            <Copy />
          </Button>
          <Button
            size={"icon"}
            variant={"link"}
            className="cursor-pointer hover:bg-secondary transition-all"
          >
            <Download />
          </Button>
          <Button
            size={"icon"}
            variant={"link"}
            className="cursor-pointer hover:bg-secondary transition-all"
          >
            <ThumbsUp />
          </Button>
          <Button
            size={"icon"}
            variant={"link"}
            className="cursor-pointer hover:bg-secondary transition-all"
          >
            <ThumbsDown />
          </Button>
        </div>
      )}
    </>
  );
};

export default ChatBubble;
