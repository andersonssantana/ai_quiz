import React, { useState } from 'react';

function QuizQuestion({ questionData }) {
  const { question, options, correct } = questionData;
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleAnswerClick = (option) => {
    if (!isAnswered) {
      setSelectedAnswer(option);
      setIsAnswered(true);
    }
  };

  const getButtonClass = (option) => {
    if (!isAnswered) {
      return 'option-button'; // Estilo padrão antes da resposta
    }

    const isCorrect = option === correct;
    const isSelected = option === selectedAnswer;

    if (isSelected) {
      return isCorrect ? 'option-button correct selected' : 'option-button incorrect selected';
    } else if (isCorrect) {
      // Destaca a correta se o usuário errou
      return 'option-button correct';
    }

    return 'option-button answered'; // Estilo para opções não selecionadas após resposta
  };

  return (
    <div className="quiz-question-container">
      <h3 className="question-text">{question}</h3>
      <div className="options-container">
        {options.map((option, index) => (
          <button
            key={index}
            className={getButtonClass(option)}
            onClick={() => handleAnswerClick(option)}
            disabled={isAnswered} // Desabilita após a resposta
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuizQuestion;
