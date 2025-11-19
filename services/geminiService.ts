export const getAiResponse = async (userMessage: string, history: any[]) => {
  try {
    const res = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: userMessage,
        history
      })
    });

    const data = await res.json();
    return data.text || "Error al recibir respuesta.";
  } catch (e) {
    console.error("Frontend error:", e);
    return "¡Ups! Algo falló con el servidor.";
  }
};
