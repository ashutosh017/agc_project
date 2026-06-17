import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex py-3 text-zinc-500 dark:text-zinc-400 text-xs tracking-wider uppercase font-medium" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        <li className="inline-flex items-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-white transition-colors duration-200"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
        </li>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          
          return (
            <li key={idx} className="flex items-center">
              <ChevronRight className="w-3.5 h-3.5 text-zinc-300 dark:text-zinc-700 mx-1 shrink-0" />
              {isLast || !item.href ? (
                <span className="text-zinc-800 dark:text-zinc-200 font-semibold truncate max-w-[150px] sm:max-w-xs">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-zinc-900 dark:hover:text-white transition-colors duration-200"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
