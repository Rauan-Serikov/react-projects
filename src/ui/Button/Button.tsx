import React, { forwardRef } from "react";
import "./Button.css";

type ButtonProps = {
  type?: "primary" | "secondary" | "withIcon" | "x" | "pause" | "submit" | "mobile-icon";
  isLoading?: boolean;
  onClick?: (e: React.SyntheticEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ isLoading, children, onClick, type }: ButtonProps, ref) => {
  return (
    <button
      className={`Button ${type}`}
      onClick={onClick}
      ref={ref}
    >
      {isLoading ? <>Loading...</> : children}
    </button>
  );
});

export default Button;