export default function Logo({ className = '' }) {
  return (
    <img
      src="/logo-arrejin.png"
      alt="Carpintería Arrejin"
      className={`h-14 w-auto object-contain ${className}`}
    />
  );
}