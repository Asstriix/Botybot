import express from "express";
import { engine } from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Configuración Handlebars
app.engine("hbs", engine({ extname: ".hbs" }));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Public
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// Vista principal
app.get("/", (req, res) => {
  res.render("index");
});

// Endpoint para recibir la pregunta y responder usando n8n
app.post("/ask", async (req, res) => {
  const { question } = req.body;
  if (!question) return res.status(400).json({ error: "No question provided" });

  try {
    // Aquí llamas a tu webhook de n8n
    const response = await axios.post("TU_WEBHOOK_DE_N8N", { question });

    // n8n devuelve la respuesta del bot
    const answer = response.data?.answer || "No hay respuesta";

    res.json({ answer });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ answer: "Error procesando la pregunta" });
  }
});

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
