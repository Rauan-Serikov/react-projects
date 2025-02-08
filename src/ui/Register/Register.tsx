import { FormField } from "../FormField";
import "./Register.css";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../api/queryClient";
import { FC } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "../../api/User";
import { openModal } from "../../state/modal/modalSlice";
import { useDispatch } from "react-redux";
import Button from "../Button/Button";
import logoImg from "../../assets/logo.svg";
import logoTile from "../../assets/маруся_black.svg";

const RegisterFormSchema = z.object({
  email: z
    .string()
    .email("Некорректный формат email")
    .min(1, "Email обязателен"),
  password: z
    .string()
    .min(4, "Пароль должен быть не менее 4 символов")
    .min(1, "Пароль обязателен"),
  name: z.string().min(1, "Имя обязательно"),
  surname: z.string().min(1, "Фамилия обязательна"),
});

type RegisterForm = z.infer<typeof RegisterFormSchema>;

const Register: FC<{ onClose: () => void }> = ({ onClose }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(RegisterFormSchema),
  });

  const registerMutation = useMutation(
    {
      mutationFn: registerUser,
      onSuccess: () => {
        dispatch(openModal({ type: "registerSuccess" }));
      },
    },
    queryClient
  );

  return (
    <div className="register">
      <form
        className="register-form"
        onSubmit={handleSubmit(({ email, password, name, surname }) => {
          registerMutation.mutate({ email, password, name, surname });
        })}
      >
        <div className="register-logo-wrapper">
          <img className="register-logo" src={logoImg} alt="" />
          <img
            className="register-logo register-logo_title"
            src={logoTile}
            alt=""
          />
        </div>

        <h3 className="register-title">Регистрация</h3>

        <FormField errorMessage={errors.email?.message}>
          <input
            className="register-input register-input_email"
            type="text"
            placeholder="Электронная почта"
            {...register("email")}
          />
        </FormField>
        <FormField errorMessage={errors.name?.message}>
          <input
            className="register-input register-input_text"
            type="text"
            placeholder="Имя"
            {...register("name")}
          />
        </FormField>
        <FormField errorMessage={errors.surname?.message}>
          <input
            className="register-input register-input_text"
            type="text"
            placeholder="Фамилия"
            {...register("surname")}
          />
        </FormField>
        <FormField errorMessage={errors.password?.message}>
          <input
            className="register-input register-input_password"
            type="password"
            placeholder="Пароль"
            {...register("password")}
          />
        </FormField>
        {registerMutation.error && (
          <span>{registerMutation.error?.message}</span>
        )}
        <Button type="submit" isLoading={registerMutation.isPending}>
          Создать аккаунт
        </Button>

        <Button type="x" onClick={onClose} />
      </form>
    </div>
  );
};

export default Register;
