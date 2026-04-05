export default function Logo({ className = '' }) {
  return (
    <div className={`${className}`}>
      <img
        src="/Captura_de_pantalla_2026-04-04_213652.png"
        alt="Carpintería Arrejin"
        className="w-full h-full object-contain"
        style={{ padding: '8%' }}
      />
    </div>
  );
}