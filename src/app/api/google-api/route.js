
import { generateContent } from "@/helpers/googleai";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { prompt } = reqBody;

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
    }

    const result = await generateContent(prompt);
    console.log(result);
    
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    console.error("Error generating content:", error);
    return NextResponse.json({ error: "Failed to generate content." }, { status: 500 });
  }
}
