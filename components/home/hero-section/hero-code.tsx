export function CodeIntro() {
  return (
    <div className="mt-8 w-full rounded-xl bg-foreground/5 border border-foreground/10 p-4 font-mono text-sm leading-6">
      <p>
        <span className="text-teal-600 font-semibold">const</span>{' '}
        <span className="text-fuchsia-600 font-medium">umar</span>{' '}
        <span className="text-foreground/80">= {'{'}</span>
      </p>

      <p className="pl-4">
        <span className="text-cyan-700 font-medium">role</span>
        <span className="text-foreground/80">:</span>{' '}
        <span className="text-green-600">&quot;Full Stack Developer&quot;</span>
        <span className="text-foreground/80">,</span>
      </p>

      <p className="pl-4">
        <span className="text-cyan-700 font-medium">projects</span>
        <span className="text-foreground/80">:</span>{' '}
        <span className="text-green-600">&quot;5 shipped&quot;</span>
        <span className="text-foreground/80">,</span>
      </p>

      <p className="pl-4">
        <span className="text-cyan-700 font-medium">openSource</span>
        <span className="text-foreground/80">:</span>{' '}
        <span className="text-orange-600 font-medium">2</span>
        <span className="text-foreground/80">,</span>
      </p>

      {/* <p className="pl-4">
        <span className="text-cyan-700 font-medium">focus</span>
        <span className="text-foreground/80">:</span>{' '}
        <span className="text-green-600">"Accessibility & Performance"</span>
        <span className="text-foreground/80">,</span>
      </p> */}

      <p className="pl-4">
        <span className="text-cyan-700 font-medium">available</span>
        <span className="text-foreground/80">:</span>{' '}
        <span className="text-red-600 font-semibold">true</span>
      </p>

      <p>
        <span className="text-foreground/80">{'}'}</span>
      </p>
    </div>
  );
}
