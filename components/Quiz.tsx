import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';

interface QuizProps {
  questions: QuizQuestion[];
  onComplete: () => void;
}

export const Quiz: React.FC<QuizProps> = ({ questions, onComplete }) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const question = questions[currentQIndex];

  const handleOptionClick = (index: number) => {
    if (showFeedback) return;
    setSelectedOption(index);
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (selectedOption === question.correctIndex) {
      if (currentQIndex < questions.length - 1) {
        setCurrentQIndex(prev => prev + 1);
        setSelectedOption(null);
        setShowFeedback(false);
      } else {
        onComplete();
      }
    } else {
      // Incorrect: Must retry
      setSelectedOption(null);
      setShowFeedback(false);
    }
  };

  const isCorrect = selectedOption === question.correctIndex;

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-indigo-100 max-w-2xl mx-auto mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-indigo-800 flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-yellow-500" />
          Comprobación de Conocimientos
        </h3>
        <span className="text-sm text-gray-500 font-medium">
          Pregunta {currentQIndex + 1} de {questions.length}
        </span>
      </div>

      <p className="text-lg text-gray-800 mb-6 font-medium">{question.question}</p>

      <div className="space-y-3">
        {question.options.map((option, idx) => {
          let btnClass = "w-full text-left p-4 rounded-lg border-2 transition-all duration-200 font-medium ";
          
          if (showFeedback && selectedOption === idx) {
            if (idx === question.correctIndex) {
              btnClass += "bg-green-100 border-green-500 text-green-800";
            } else {
              btnClass += "bg-red-100 border-red-500 text-red-800";
            }
          } else if (showFeedback && idx === question.correctIndex && selectedOption !== null) {
             // Show correct answer if user guessed wrong
             btnClass += "bg-green-50 border-green-300 text-green-700 opacity-70";
          } else {
            btnClass += "bg-slate-50 border-slate-200 hover:border-indigo-400 hover:bg-indigo-50 text-slate-700";
          }

          return (
            <button
              key={idx}
              onClick={() => handleOptionClick(idx)}
              disabled={showFeedback}
              className={btnClass}
            >
              <div className="flex justify-between items-center">
                <span>{option}</span>
                {showFeedback && selectedOption === idx && (
                  idx === question.correctIndex ? <CheckCircle className="w-5 h-5 text-green-600"/> : <XCircle className="w-5 h-5 text-red-600"/>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {showFeedback && (
        <div className={`mt-6 p-4 rounded-lg ${isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          <p className="font-bold mb-1">{isCorrect ? "¡Correcto!" : "No exactamente..."}</p>
          <p>{question.explanation}</p>
          
          {isCorrect && (
            <button 
              onClick={handleNext}
              className="mt-3 bg-indigo-600 text-white px-6 py-2 rounded-full font-bold hover:bg-indigo-700 shadow-md transform active:scale-95 transition-transform"
            >
              {currentQIndex < questions.length - 1 ? "Siguiente Pregunta" : "Terminar Quiz"}
            </button>
          )}
          
          {!isCorrect && (
            <button 
              onClick={() => { setShowFeedback(false); setSelectedOption(null); }}
              className="mt-3 bg-red-200 text-red-800 px-6 py-2 rounded-full font-bold hover:bg-red-300"
            >
              Intentar de Nuevo
            </button>
          )}
        </div>
      )}
    </div>
  );
};