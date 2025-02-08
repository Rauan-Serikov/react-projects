import { FC, ReactNode } from "react";
import "./FormField.css";

interface IFormFieldProps {
  children: ReactNode;
  errorMessage?: string;
}

export const FormField: FC<IFormFieldProps> = ({
  children,
  errorMessage,
}) => {
  return (
    <label className="form-field">
      {children}
      {errorMessage && (
        <span className="form-field-error-text">{errorMessage}</span>
      )}
    </label>
  );
};
