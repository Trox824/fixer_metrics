"use client";

export function Sidebar() {
  return (
    <aside className="flex h-full w-64 flex-shrink-0 flex-col border-r border-border bg-card">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-border px-4">
        <span className="text-lg font-semibold text-foreground">Fixer Agent</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3">
        <div
          className="flex items-center gap-3 rounded-lg bg-accent-muted px-3 py-2.5 text-sm font-medium text-accent"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          <span>Metrics Dashboard</span>
        </div>
      </nav>
    </aside>
  );
}
