export default function MainBackground() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-background">
      <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_12px,rgba(128,128,128,0.15)_12px,rgba(128,128,128,0.15)_13px)]"></div>

      <div className="absolute inset-0 bg-background mask-[radial-gradient(ellipse_80%_70%_at_50%_50%,transparent_45%,black_100%)]"></div>
    </div>
  );
}
