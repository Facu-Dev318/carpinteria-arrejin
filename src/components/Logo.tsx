export default function Logo({ className = '' }) {
  return (
    <div className={`${className}`}>
      <img
        src="/logo-arrejin.png"
        alt="Carpintería Arrejin"
        className="w-full h-full object-contain"
        style={{ padding: '8%' }}
      />
    </div>
  );
}