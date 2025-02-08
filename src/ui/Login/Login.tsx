import "./Login.css";
import { FormField } from "../FormField";
import { FC } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/User";
import { queryClient } from "../../api/queryClient";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../Button/Button";
import { useDispatch } from "react-redux";
import { loginUser } from "../../state/user/userSlice";
import { closeModal, openModal } from "../../state/modal/modalSlice";
import logoImg from "../../assets/logo.svg";
import logoTile from "../../assets/маруся_black.svg";

export const LoginFormSchema = z.object({
  email: z
    .string()
    .email("Некорректный формат email")
    .min(1, "Email обязателен"),
  password: z
    .string()
    .min(4, "Пароль должен быть не менее 4 символов")
    .min(1, "Пароль обязателен"),
});

export type LoginForm = z.infer<typeof LoginFormSchema>;

const LoginForm: FC<{ onClose: () => void }> = ({ onClose }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(LoginFormSchema),
  });
  const loginMutation = useMutation(
    {
      mutationFn: login,
      onSuccess: (data) => {
        dispatch(
          loginUser({
            name: data.name,
            surname: data.surname,
            email: data.email,
          })
        ),
          dispatch(closeModal());
      },
      onError: (error: any) => {
        console.error("Ошибка авторизации:", error);
      },
    },
    queryClient
  );

  return (
    <div className="login">
      <form
        className="login-form"
        onSubmit={handleSubmit(({ email, password }) => {
          loginMutation.mutate({ email, password });
        })}
      >
        <div className="login-logo-wrapper">
          <img className="login-logo" src={logoImg} alt="" />
          <img className="login-logo login-logo_title" src={logoTile} alt="" />
        </div>

        <FormField errorMessage={errors.email?.message}>
          <input
            style={{ backgroundColor: "white" }}
            className="login-input login-input_email"
            type="text"
            placeholder="Электронная почта"
            {...register("email")}
          />
        </FormField>
        <FormField errorMessage={errors.password?.message}>
          <input
            className="login-input login-input_password"
            type="password"
            placeholder="Пароль"
            {...register("password")}
          />
        </FormField>
        {loginMutation.error && <span>{loginMutation.error.message}</span>}
        <Button type="submit" isLoading={loginMutation.isPending}>
          Войти
        </Button>
        <Button
          type="primary"
          onClick={() => dispatch(openModal({ type: "register" }))}
        >
          Регистрация
        </Button>

      <Button type="x" onClick={onClose} />
      </form>
    </div>
  );
};

export default LoginForm;
