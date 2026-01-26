import { ButtonHTMLAttributes, forwardRef } from 'react';
import Link from 'next/link';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    href?: string;
    className?: string;
}

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', href, ...props }, ref) => {
        const baseStyles = 'inline-flex items-center justify-center rounded-full font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-zinc-950/50';

        const variants = {
            primary: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm hover:shadow-emerald-500/25',
            secondary: 'bg-white/10 hover:bg-white/20 text-white ring-1 ring-white/20',
            outline: 'bg-transparent border border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white',
            ghost: 'bg-transparent text-zinc-400 hover:text-white hover:bg-white/5',
        };

        const sizes = {
            sm: 'px-4 py-2 text-sm',
            md: 'px-6 py-2.5 text-base',
            lg: 'px-8 py-3 text-lg',
        };

        const combinedClassName = cn(
            baseStyles,
            variants[variant],
            sizes[size],
            className
        );

        if (href) {
            return (
                <Link
                    href={href}
                    className={combinedClassName}
                // @ts-ignore - Next.js Link doesn't technically accepting button refs perfectly but this is for standard usage
                >
                    {props.children}
                </Link>
            );
        }

        return (
            <button
                ref={ref as React.Ref<HTMLButtonElement>}
                className={combinedClassName}
                {...props}
            />
        );
    }
);

Button.displayName = "Button";
