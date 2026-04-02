export default function Logo({ className = '' }) {
  return (
    <img
      src="/logo-arrejin.png"
      alt="Carpintería Arrejin"
      className={`h-16 w-auto object-contain ${className}`}
    />
  );
}