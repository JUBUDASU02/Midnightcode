// components/auth/AuthFooter.jsx
export default function AuthFooter({ 
  links = [
    { text: "Privacy", href: "#" },
    { text: "Terms", href: "#" },
    { text: "Support", href: "#" }
  ] 
}) {
  return (
    <footer className="mt-auto pt-8 flex justify-center gap-6 text-slate-600 text-xs uppercase tracking-widest">
      {links.map((link, index) => (
        <a key={index} href={link.href} className="hover:text-primary transition-colors">
          {link.text}
        </a>
      ))}
    </footer>
  );
}