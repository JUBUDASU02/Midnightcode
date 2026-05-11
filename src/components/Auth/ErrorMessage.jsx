// components/auth/ErrorMessage.jsx
export default function ErrorMessage({ error, className = "" }) {
  if (!error) return null;
  return <p className={`text-red-400 text-sm ${className}`}>{error.message || error}</p>;
}