import { useEffect, useState } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai';
import './App.css'

const GOOGLE_GEMINI_API_KEY = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(
  GOOGLE_GEMINI_API_KEY
);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

function App() {
  const [res, setRes] = useState();

  useEffect(() => {

  const generateContent = async () => {
    const prompt = `Gere 5 perguntas de múltipla escolha sobre games online. Produza um JSON no formato a seguir:
    
    Questions = { "question": string, "options": array<string>, "correct": string }
    Return: array<Questions>`
      const result = await model.generateContent(prompt);
      const cleanedResult = result.response.text().replace(/```json|```|\n`$/g, '').trim()
      console.log(cleanedResult);
      setRes(JSON.parse(cleanedResult));
  }
  generateContent();
  },[])

  return (
    <div>
     {JSON.stringify(res)}
    </div>
  )
}

export default App
