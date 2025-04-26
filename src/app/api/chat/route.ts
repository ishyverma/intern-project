import { google } from "@ai-sdk/google";
import { smoothStream, streamText } from 'ai';

export async function POST(req: Request) {
  const { data } = await req.json()

  const result = streamText({
    model: google('gemini-1.5-flash-001'),
    prompt: data.prompt,
    temperature: 0.9,
    experimental_transform: smoothStream(),
  });

  return result.toDataStreamResponse({});
}