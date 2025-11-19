import React, { useState, useEffect } from 'react';
import { COURSE_CONTENT } from './constants';
import { Module, Lesson, UserProgress } from './types';
import { Quiz } from './components/Quiz';
import { CodePlayground } from './components/CodePlayground';
import { AiTutor } from './components/AiTutor';
import { ChevronRight, Award, BookOpen, Check, Cpu, Lock, Terminal, Settings, Cog, Eye, Repeat, Code2, Flag } from 'lucide-react';

const App: React.FC = () => {
  // State
  const [progress, setProgress] = useState<UserProgress>({
    completedLessons: [],
    currentModuleId: COURSE_CONTENT[0].id,
    currentLessonId: COURSE_CONTENT[0].lessons[0].id,
    coins: 0
  });

  // Derived State
  const currentModuleIndex = COURSE_CONTENT.findIndex(m => m.id === progress.currentModuleId);
  const currentModule = COURSE_CONTENT[currentModuleIndex];
  const currentLessonIndex = currentModule.lessons.findIndex(l => l.id === progress.currentLessonId);
  const currentLesson = currentModule.lessons[currentLessonIndex];

  const handleLessonComplete = () => {
    if (!progress.completedLessons.includes(currentLesson.id)) {
      setProgress(prev => ({
        ...prev,
        completedLessons: [...prev.completedLessons, currentLesson.id],
        coins: prev.coins + 50
      }));
    }
    setIsQuizMode(false);
  };

  const [isQuizMode, setIsQuizMode] = useState(false);

  // Helpers
  const isLessonCompleted = (id: string) => progress.completedLessons.includes(id);
  const isModuleLocked = (index: number) => {
    if (index === 0) return false;
    const prevModule = COURSE_CONTENT[index - 1];
    const lastLessonOfPrev = prevModule.lessons[prevModule.lessons.length - 1];
    return !isLessonCompleted(lastLessonOfPrev.id);
  };

  const goToNextLesson = () => {
    if (currentLessonIndex < currentModule.lessons.length - 1) {
      // Next lesson in same module
      setProgress(prev => ({
        ...prev,
        currentLessonId: currentModule.lessons[currentLessonIndex + 1].id
      }));
    } else if (currentModuleIndex < COURSE_CONTENT.length - 1) {
      // Next module
      const nextMod = COURSE_CONTENT[currentModuleIndex + 1];
      setProgress(prev => ({
        ...prev,
        currentModuleId: nextMod.id,
        currentLessonId: nextMod.lessons[0].id
      }));
    }
  };

  const handleNavigate = (modId: string, lessonId: string) => {
    // Find indexes to check locked state
    const modIdx = COURSE_CONTENT.findIndex(m => m.id === modId);
    if (isModuleLocked(modIdx)) return;
    
    setProgress(prev => ({
      ...prev,
      currentModuleId: modId,
      currentLessonId: lessonId
    }));
    setIsQuizMode(false);
  };

  const getModuleIcon = (iconType: string) => {
    switch (iconType) {
      case 'python': return <Terminal className="w-4 h-4" />;
      case 'setup': return <Settings className="w-4 h-4" />;
      case 'motor': return <Cog className="w-4 h-4" />;
      case 'sensor': return <Eye className="w-4 h-4" />;
      case 'loop': return <Repeat className="w-4 h-4" />;
      case 'function': return <Code2 className="w-4 h-4" />;
      case 'logic': return <Cpu className="w-4 h-4" />;
      case 'project': return <Flag className="w-4 h-4" />;
      default: return <Terminal className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 text-slate-900 overflow-hidden">
      
      {/* Sidebar */}
      <div className="w-72 bg-white border-r border-slate-200 flex-shrink-0 hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-2 mb-1">
             <div className="w-8 h-8 bg-yellow-400 rounded flex items-center justify-center text-yellow-900 font-bold shadow-sm">
               S
             </div>
             <h1 className="font-bold text-xl tracking-tight">Maestro Python Spike</h1>
          </div>
          <p className="text-xs text-slate-400 font-medium">Python para Principiantes en Lego</p>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          {COURSE_CONTENT.map((module, mIdx) => (
            <div key={module.id} className="mb-6">
              <div className={`px-6 py-2 flex items-center justify-between ${isModuleLocked(mIdx) ? 'opacity-50' : ''}`}>
                <div className="flex items-center gap-2 text-slate-500">
                  {getModuleIcon(module.icon)}
                  <h2 className="text-xs font-bold uppercase tracking-wider">{module.title.split(':')[0]}</h2>
                </div>
                {isModuleLocked(mIdx) && <Lock className="w-3 h-3 text-slate-400"/>}
              </div>
              <ul>
                {module.lessons.map((lesson, lIdx) => {
                   const active = lesson.id === progress.currentLessonId;
                   const completed = isLessonCompleted(lesson.id);
                   const locked = isModuleLocked(mIdx);

                   return (
                     <li key={lesson.id}>
                       <button
                         onClick={() => !locked && handleNavigate(module.id, lesson.id)}
                         disabled={locked}
                         className={`w-full text-left px-6 py-2 flex items-center gap-3 transition-colors text-sm font-medium
                           ${active ? 'bg-indigo-50 text-indigo-700 border-r-4 border-indigo-600' : 'text-slate-600 hover:bg-slate-50'}
                           ${locked ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                         `}
                       >
                         <div className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center border 
                           ${completed ? 'bg-green-500 border-green-500 text-white' : 'border-slate-300 bg-white'}
                         `}>
                           {completed && <Check className="w-3 h-3" />}
                           {!completed && !locked && <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>}
                         </div>
                         <span className="truncate">{lesson.title}</span>
                       </button>
                     </li>
                   );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-slate-200 bg-slate-50">
          <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm border border-slate-200">
            <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
               <Award className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-bold uppercase">Monedas</p>
              <p className="text-lg font-bold text-slate-800">{progress.coins}</p>
            </div>
          </div>
          <div className="mt-4 text-center">
             <p className="text-xs text-slate-400 font-medium">© 2025 Gustavo Gómez</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Mobile Header */}
        <div className="md:hidden h-16 bg-white border-b border-slate-200 flex items-center px-4 justify-between flex-shrink-0">
          <span className="font-bold">Maestro Spike</span>
          <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold">🪙 {progress.coins}</span>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-12 max-w-5xl mx-auto w-full">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
            <span>{currentModule.title}</span>
            <ChevronRight className="w-4 h-4" />
            <span className="font-medium text-indigo-600">{currentLesson.title}</span>
          </div>

          {/* Lesson Header */}
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{currentLesson.title}</h1>
            <div className="h-1 w-20 bg-indigo-500 rounded-full"></div>
          </header>

          {/* Content Switcher: Lesson vs Quiz */}
          {!isQuizMode ? (
            <div className="animate-fade-in pb-24">
              <div className="prose prose-lg prose-indigo max-w-none text-slate-600 mb-8">
                {currentLesson.content.split('\n').map((line, i) => {
                    // Simple rendering of text vs code blocks vs headers
                    if (line.startsWith('### ')) return <h3 key={i} className="text-xl font-bold text-slate-800 mt-8 mb-3">{line.replace('### ', '')}</h3>;
                    if (line.startsWith('**')) return <p key={i} className="mb-3 font-medium text-slate-800">{line.replace(/\*\*/g, '')}</p>;
                    if (line.startsWith('    ')) return <pre key={i} className="bg-slate-800 text-blue-300 p-4 rounded-lg font-mono text-sm my-4 overflow-x-auto shadow-sm">{line.trim()}</pre>;
                    if (line.trim().startsWith('```')) return null; // Skip markers
                    if (line === '') return <br key={i} />;
                    return <p key={i} className="mb-3 leading-relaxed">{line}</p>;
                })}
              </div>

              {/* Code Example Display (if static snippet exists) */}
              {currentLesson.codeSnippet && (
                 <div className="mb-8">
                    <div className="flex items-center gap-2 mb-2">
                        <Cpu className="w-5 h-5 text-indigo-600" />
                        <span className="font-bold text-slate-700">Código de Ejemplo</span>
                    </div>
                    <div className="bg-slate-900 text-blue-100 p-6 rounded-xl font-mono text-sm shadow-lg border-l-4 border-yellow-400 overflow-x-auto">
                        <pre>{currentLesson.codeSnippet}</pre>
                    </div>
                 </div>
              )}

              {/* Interactive Challenge */}
              {currentLesson.challenge ? (
                <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 md:p-8 mb-12 shadow-sm">
                  <h3 className="text-xl font-bold text-indigo-900 mb-2 flex items-center gap-2">
                    ⚡ Desafío de Código
                  </h3>
                  <p className="text-indigo-700 mb-4">{currentLesson.challenge.description}</p>
                  <CodePlayground 
                    initialCode={currentLesson.challenge.initialCode}
                    expectedKeywords={currentLesson.challenge.expectedKeywords}
                    successMessage={currentLesson.challenge.successMessage}
                    onSuccess={() => setIsQuizMode(true)} 
                  />
                  <p className="text-center text-xs text-indigo-400 mt-4">¡Completa el desafío para desbloquear el Quiz!</p>
                </div>
              ) : (
                <button 
                   onClick={() => setIsQuizMode(true)}
                   className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg transform transition-all active:scale-95 flex items-center justify-center gap-2 mx-auto display-block mb-12"
                >
                   <BookOpen className="w-5 h-5" />
                   Ir al Quiz
                </button>
              )}

            </div>
          ) : (
            <div className="animate-fade-in pb-24">
               <Quiz 
                 questions={currentLesson.quiz} 
                 onComplete={handleLessonComplete} 
               />
            </div>
          )}
          
          {/* Success State (Completed Lesson) */}
          {isLessonCompleted(currentLesson.id) && !isQuizMode && (
             <div className="mt-8 p-8 bg-green-50 rounded-2xl border border-green-100 text-center animate-bounce-in mb-24">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-green-800 mb-2">¡Lección Completada!</h2>
                <p className="text-green-600 mb-6">Has dominado este tema. +50 Monedas</p>
                <button 
                  onClick={goToNextLesson}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full shadow-md transition-colors"
                >
                  Siguiente Lección <ChevronRight className="inline w-4 h-4 ml-1" />
                </button>
             </div>
          )}
        </div>
      </main>

      <AiTutor />
    </div>
  );
};

export default App;