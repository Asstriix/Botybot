import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { question } = req.body;
  if (!question) return res.status(400).json({ error: "No question provided" });

  try {
    // Aquí colocas tu webhook de n8n
    const response = await axios.post("TU_WEBHOOK_DE_N8N", { question });

    const answer = response.data?.answer || "No hay respuesta";

    res.status(200).json({ answer });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ answer: "Error procesando la pregunta" });
  }
}
