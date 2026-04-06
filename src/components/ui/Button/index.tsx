"use client";

import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

// styles
import styles from "./index.module.css";

type Variant = "filled" | "ghost" | "text";

interface ButtonProps {
  variant?: Variant;
  href?: string;
  external?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Button({
  variant = "filled",
  href,
  external = false,
  children,
  className = "",
  onClick,
}: ButtonProps) {
  const cls = `${styles.btn} ${styles[variant]} ${className}`;

  if (href) {
    const linkProps: AnchorHTMLAttributes<HTMLAnchorElement> = {
      href,
      className: cls,
      ...(external ? { target: "_blank", rel: "noopener noreferrer" } : {}),
    };
    return <a {...linkProps}>{children}</a>;
  }

  const btnProps: ButtonHTMLAttributes<HTMLButtonElement> = { className: cls, onClick };
  return <button {...btnProps}>{children}</button>;
}
