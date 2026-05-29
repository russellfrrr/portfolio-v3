export const SiteBackground = () => {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-black">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:42px_42px] opacity-20" />
      <div className="absolute inset-0 animate-[drift_18s_linear_infinite] bg-[radial-gradient(circle_at_center,transparent_0,transparent_28%,black_70%)]" />
    </div>
  );
};