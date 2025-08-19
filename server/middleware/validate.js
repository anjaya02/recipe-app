export const validate = (schema) => (req, res, next) => {
  const isBodyMethod =
    req.method === "POST" || req.method === "PUT" || req.method === "PATCH";
  const data = isBodyMethod ? req.body : req.query;

  const { error, value } = schema.validate(data);
  if (error) {
    const msg = error.details?.[0]?.message || error.message;
    return res.status(400).json({ message: msg });
  }

  if (isBodyMethod) {
    req.body = value;
  } else {
    req.validated = value;
  }

  next();
};
