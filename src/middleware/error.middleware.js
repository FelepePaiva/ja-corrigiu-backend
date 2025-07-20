import { ZodError } from 'zod';
import { ValidationError } from 'sequelize'; 

export const errorHandler = (err, req, res, next) => {
 // 🔍 Adicione log para depuração
  console.error("🔥 [ERROR HANDLER] Erro capturado:", err);

  if (err instanceof ZodError) {
    console.log("📦 Body recebido:", req.body);
    console.log("📛 Tipo de classId:", typeof req.body.classId);
    return res.status(400).json({
      type: "validation",
      errors: err.errors
    });
  }

  if (err instanceof ValidationError) {
    return res.status(400).json({
      type: "sequelize",
      errors: err.errors.map(e => e.message)
    });
  }

  if (err.message) {
    return res.status(400).json({ error: err.message });
  }

  return res.status(500).json({ error: "Erro interno do servidor" });
};
