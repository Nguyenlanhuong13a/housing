"use client";

import { ReactNode } from "react";

interface DashboardShellProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export function DashboardShell({ children, title, subtitle }: DashboardShellProps) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {(title || subtitle) && (
        <div className="mb-10 text-center md:text-left">
          {title && <h1 className="text-4xl font-bold text-sage-700 tracking-tight mb-2">{title}</h1>}
          {subtitle && <p className="text-sage-600/70 font-medium">{subtitle}</p>}
        </div>
      )}
      <div className="flex flex-col gap-8">
        {children}
      </div>
    </div>
  );
}
