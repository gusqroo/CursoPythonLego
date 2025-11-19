import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  try {
    const apiKey = process.env.VITE_API_KEY; // <-- variable de Vercel
    if (!apiKey) {
      return res.status(500).json({ error: "API KEY no configurada" });
    }

    const ai = new GoogleGenAI({ apiKey });

    const { message, history } = req.body;

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

    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7
      }
    });

    const result = await chat.sendMessage({ message });
    return res.status(200).json({ text: result.text });

  } catch (error) {
    console.error("Gemini API error:", error);
    return res.status(500).json({ error: "Error procesando la solicitud" });
  }
}
