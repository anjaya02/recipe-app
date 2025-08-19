export function notFound(_, res) {
  res.status(404).json({ message: "Not Found" });
}

export function errorHandler(err, req, res, next) {
  console.error(err);
  // Handle validation errors (e.g., from Joi or Mongoose)
  if (err.name === "ValidationError" || err.isJoi) {
    return res
      .status(400)
      .json({ message: err.message, details: err.details || undefined });
  }
  // Handle authentication errors
  if (err.name === "UnauthorizedError" || err.status === 401) {
    return res.status(401).json({ message: err.message || "Unauthorized" });
  }
  // Handle forbidden errors
  if (err.status === 403) {
    return res.status(403).json({ message: err.message || "Forbidden" });
  }
  // Handle custom errors with status
  if (err.status && typeof err.status === "number") {
    return res.status(err.status).json({ message: err.message });
  }
  // Fallback to generic server error
  res.status(500).json({ message: "Server error" });
}
