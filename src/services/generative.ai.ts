import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_VERCEL_ENV);

const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export { model };
