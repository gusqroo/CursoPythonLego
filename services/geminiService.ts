import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.VITE_API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `
Eres "Spike", un experto amigable, enérgico y motivador en LEGO Education SPIKE Prime y programación en Python.
Tu audiencia es un estudiante de 11 años que habla español y no tiene experiencia previa en programación.

Reglas:
1. Mantén las respuestas cortas (máximo 3 oraciones usualmente).
2. Usa analogías simples (ej. Las variables son cajas, los bucles son como repetir tareas del hogar).
3. Usa emojis para ser amigable. 🤖✨
4. Si te preguntan sobre código, proporciona ejemplos de Python muy simples y específicos para la librería de SPIKE Prime (ej. usando el módulo 'spike').
5. Fomenta la experimentación y la curiosidad.
6. No resuelvas las preguntas del quiz por ellos, pero dales pistas.
7. Responde siempre en Español.
`;

export const getAiResponse = async (userMessage: string, history: {role: string, text: string}[]) => {
  try {
    if (!apiKey) return "Estoy desconectado ahora mismo (Falta API Key). ¡Pero sigue intentando!";
    
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    const result = await chat.sendMessage({
      message: userMessage
    });

    return result.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "¡Ups! Mis circuitos están un poco atascados. Intenta preguntar de nuevo en un momento. 🤖";
  }
};
