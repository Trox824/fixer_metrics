"use client";

import { useState, useEffect } from "react";

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Check screen size and auto-collapse on mobile
  useEffect(() => {
    const checkScreenSize = () => {
      const isMobile = window.innerWidth < 1208;
      if (isMobile) {
        setIsCollapsed(true);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`overflow-hidden border-r border-border bg-background transition-[width] duration-200 ease-in-out will-change-[width] ${
          isCollapsed ? "w-16" : "w-64"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center justify-between border-b border-border px-4">
            {!isCollapsed && (
              <div className="flex items-center gap-2 opacity-100 transition-opacity duration-200">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </div>
                <span className="whitespace-nowrap font-semibold">Fixer</span>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-2">
            <SidebarLink
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect width="7" height="9" x="3" y="3" rx="1" />
                  <rect width="7" height="5" x="14" y="3" rx="1" />
                  <rect width="7" height="9" x="14" y="12" rx="1" />
                  <rect width="7" height="5" x="3" y="16" rx="1" />
                </svg>
              }
              label="Dashboard"
              isCollapsed={isCollapsed}
              isActive={true}
            />
          </nav>

         
        </div>
      </aside>
    </>
  );
}

interface SidebarLinkProps {
  icon: React.ReactNode;
  label: string;
  isCollapsed: boolean;
  isActive?: boolean;
}

function SidebarLink({
  icon,
  label,
  isCollapsed,
  isActive = false,
}: SidebarLinkProps) {
  return (
    <button
      className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
        isActive
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      } ${isCollapsed ? "justify-center" : ""}`}
      title={isCollapsed ? label : undefined}
    >
      {icon}
      {!isCollapsed && (
        <span className="whitespace-nowrap opacity-100 transition-opacity duration-200">
          {label}
        </span>
      )}
    </button>
  );
}
