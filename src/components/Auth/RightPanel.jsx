// components/auth/RightPanel.jsx
export default function RightPanel({ children, className = "" }) {
  return (
    <div className={`w-full md:w-1/2 h-full flex flex-col p-8 md:p-16 relative bg-background-dark ${className}`}>
      {children}
    </div>
  );
}