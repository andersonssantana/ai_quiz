import { useState } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai';
import './App.css'

const GOOGLE_GEMINI_API_KEY = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(
  GOOGLE_GEMINI_API_KEY
);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

function App() {
  const [res, setRes] = useState();
  const [subject, setSubject] = useState('qualquer tema')

  const generateContent = async () => {
    const prompt = `Gere 5 perguntas de múltipla escolha sobre ${subject}. Produza um JSON no formato a seguir:
    
    Questions = { "question": string, "options": array<string>, "correct": string }
    Return: array<Questions>`
      const result = await model.generateContent(prompt);
      const cleanedResult = result.response.text().replace(/```json|```|\n`$/g, '').trim()
      setRes(JSON.parse(cleanedResult));
  }

  return (
    <div>
    <input onChange={ e => setSubject(e.target.value) }></input>
    <button onClick={ generateContent }>Gerar quiz</button>
    </div>
  )
}

export default App
