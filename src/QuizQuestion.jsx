import { useState, useCallback } from 'react';

function QuizQuestion({ questionData, questionNumber }) {
  const { question, options, correct } = questionData;
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleAnswerClick = useCallback((option) => {
    if (!isAnswered) {
      setSelectedAnswer(option);
      setIsAnswered(true);
    }
  }, [isAnswered]);

  const getButtonClass = useCallback((option) => {
    if (!isAnswered) {
      return 'option-button';
    }

    const isCorrect = option === correct;
    const isSelected = option === selectedAnswer;
    
    const classes = ['option-button'];
    
    if (isSelected) {
      classes.push(isCorrect ? 'correct' : 'incorrect', 'selected');
    } else if (isCorrect) {
      classes.push('correct');
    } else {
      classes.push('answered');
    }
    
    return classes.join(' ');
  }, [isAnswered, correct, selectedAnswer]);

  return (
    <div className="quiz-question-container">
      {questionNumber && (
        <div className="question-number">Questão {questionNumber}</div>
      )}
      <h3 className="question-text">{question}</h3>
      <div className="options-container">
        {options.map((option, index) => (
          <button
            key={`option-${index}`}
            className={getButtonClass(option)}
            onClick={() => handleAnswerClick(option)}
            disabled={isAnswered}
            aria-pressed={selectedAnswer === option}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuizQuestion;
