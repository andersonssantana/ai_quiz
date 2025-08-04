import { useState, useCallback, useMemo } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import QuizQuestion from './QuizQuestion';
import './App.css';

const API_KEY = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;
const MODEL_NAME = 'gemini-2.0-flash';
const QUESTIONS_COUNT = 5;

if (!API_KEY) {
  console.error('Chave da API do Google Gemini não encontrada. Verifique o arquivo .env e a variável VITE_GOOGLE_GEMINI_API_KEY.');
}

function App() {
  const [subject, setSubject] = useState('');
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const genAI = useMemo(() => new GoogleGenerativeAI(API_KEY), []);
  const model = useMemo(() => genAI.getGenerativeModel({ model: MODEL_NAME }), [genAI]);

  const createPrompt = useCallback((topic) => {
    return `Gere ${QUESTIONS_COUNT} perguntas de múltipla escolha sobre ${topic}. Produza um JSON válido no seguinte formato EXATO (array de objetos):
    [
      { "question": "Texto da pergunta 1", "options": ["Opção A", "Opção B", "Opção C", "Opção D"], "correct": "Opção C" },
      { "question": "Texto da pergunta 2", "options": ["Alt 1", "Alt 2", "Alt 3", "Alt 4"], "correct": "Alt 1" },
      ...
    ]
    IMPORTANTE: Cada pergunta deve ter EXATAMENTE 4 alternativas no array 'options'. Certifique-se que a resposta em 'correct' seja exatamente igual a uma das strings em 'options'. Retorne APENAS o array JSON, sem nenhum texto adicional, markdown ou formatação como 
    \`\`\`json ... \`\`\`.`;
  }, []);

  const validateQuestions = useCallback((questions) => {
    return Array.isArray(questions) && 
           questions.every(q => 
             q.question && 
             Array.isArray(q.options) && 
             q.options.length === 4 &&
             q.correct &&
             q.options.includes(q.correct)
           );
  }, []);

  const parseApiResponse = useCallback((responseText) => {
    const cleanedText = responseText.replace(/```json|```|\n`$/g, '').trim();
    const parsedQuestions = JSON.parse(cleanedText);
    
    if (!validateQuestions(parsedQuestions)) {
      throw new Error('Formato JSON recebido da API é inválido.');
    }
    
    return parsedQuestions;
  }, [validateQuestions]);

  const generateContent = useCallback(async () => {
    const trimmedSubject = subject.trim();
    
    if (!trimmedSubject) {
      setError('Por favor, digite um tema para o quiz.');
      return;
    }
    
    if (!API_KEY) {
      setError('Erro de configuração: Chave da API não encontrada.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setQuestions([]);

    try {
      const prompt = createPrompt(trimmedSubject);
      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      const parsedQuestions = parseApiResponse(responseText);
      
      setQuestions(parsedQuestions);
    } catch (err) {
      console.error('Erro ao gerar conteúdo:', err);
      const errorMessage = err.message.includes('JSON') 
        ? 'A resposta da API não estava no formato JSON esperado.'
        : err.message;
      setError(`Ocorreu um erro ao buscar as perguntas: ${errorMessage}. Tente novamente.`);
    } finally {
      setIsLoading(false);
    }
  }, [subject, model, createPrompt, parseApiResponse]);

  const handleSubjectChange = useCallback((e) => {
    setSubject(e.target.value);
    if (error) setError(null);
  }, [error]);

  return (
    <div className="app-container">
      <div className="header-section">
        <h1>Gerador de Quiz Interativo</h1>
        <div className="input-area">
          <input
            type="text"
            value={subject}
            onChange={handleSubjectChange}
            placeholder="Digite o tema do quiz"
            disabled={isLoading}
            onKeyDown={(e) => e.key === 'Enter' && !isLoading && generateContent()}
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
              <QuizQuestion 
                key={`question-${index}`} 
                questionData={q} 
                questionNumber={index + 1}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
