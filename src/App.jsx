import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import QuizQuestion from './QuizQuestion';
import './App.css';

const GOOGLE_GEMINI_API_KEY = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;

if (!GOOGLE_GEMINI_API_KEY) {
  console.error("Chave da API do Google Gemini não encontrada. Verifique o arquivo .env e a variável VITE_GOOGLE_GEMINI_API_KEY.");
}

const genAI = new GoogleGenerativeAI(GOOGLE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

function App() {
  const [subject, setSubject] = useState('');
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateContent = async () => {
    if (!subject.trim()) {
      setError("Por favor, digite um tema para o quiz.");
      return;
    }
    if (!GOOGLE_GEMINI_API_KEY) {
        setError("Erro de configuração: Chave da API não encontrada.");
        return;
    }

    setIsLoading(true);
    setError(null);
    setQuestions([]);

    const prompt = `Gere 5 perguntas de múltipla escolha sobre ${subject}. Produza um JSON válido no seguinte formato EXATO (array de objetos):
    [
      { "question": "Texto da pergunta 1", "options": ["Opção A", "Opção B", "Opção C", "Opção D"], "correct": "Opção C" },
      { "question": "Texto da pergunta 2", "options": ["Alt 1", "Alt 2", "Alt 3"], "correct": "Alt 1" },
      ...
    ]
    Certifique-se que a resposta em 'correct' seja exatamente igual a uma das strings em 'options'. Retorne APENAS o array JSON, sem nenhum texto adicional, markdown ou formatação como 
    \`\`\`json ... \`\`\`.
    `;

    try {
      const result = await model.generateContent(prompt);
      const responseText = result.response.text();

      let parsedQuestions;
      try {

        const cleanedText = responseText.replace(/```json|```|\n`$/g, '').trim();
        parsedQuestions = JSON.parse(cleanedText);

        if (!Array.isArray(parsedQuestions) || parsedQuestions.some(q => !q.question || !Array.isArray(q.options) || !q.correct)) {
            throw new Error("Formato JSON recebido da API é inválido.");
        }

      } catch (parseError) {
        console.error("Erro ao parsear JSON:", parseError);
        console.error("Texto recebido da API:", responseText);
        throw new Error("A resposta da API não estava no formato JSON esperado.");
      }

      setQuestions(parsedQuestions);
    } catch (err) {
      console.error("Erro ao gerar conteúdo:", err);
      setError(`Ocorreu um erro ao buscar as perguntas: ${err.message}. Tente novamente.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="header-section">
        <h1>Gerador de Quiz Interativo</h1>
        <div className="input-area">
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Digite o tema do quiz"
            disabled={isLoading}
          />
          <button onClick={generateContent} disabled={isLoading}>
            {isLoading ? 'Gerando...' : 'Gerar Quiz'}
          </button>
        </div>
      </div>

      <div className="content-section">
        {error && <p className="error-message">{error}</p>}

        {questions.length > 0 && (
          <div className="quiz-container">
            <h2>Quiz sobre: {subject}</h2>
            {questions.map((q, index) => (
              <QuizQuestion key={index} questionData={q} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
