export const validate = (schema, source = 'body') => (req, res, next) => {
  try {
    const parsed = schema.parse(req[source]);
    req[source] = parsed;
    next();
  } catch (err) {
    console.log("[BACKEND] Requisição recebida:", req.body);
    console.log("Tipo de classId:", typeof req.body.classId);
    console.error('Erro de validação Zod:', err);
    next(err); 
  }
};
