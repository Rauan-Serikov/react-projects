import { z } from "zod";
import { validateResponse } from "./validateResponse";

const API_URL = 'https://cinemaguide.skillbox.cc'

export const UserSchema = z.object({
    favorites: z.array(z.string()),
    surname: z.string(),
    name: z.string(),
    email: z.string(),
});

export type User = z.infer<typeof UserSchema>;

const RegisterSchema = z.object({
    email: z.string().email("Некорректный формат email").min(1, "Email обязателен"),
    password: z.string().min(4, "Пароль должен быть не менее 4 символов").min(1, "Пароль обязателен"),
    name: z.string().min(1, "Имя обязательно"),
    surname: z.string().min(1, "Фамилия обязательна"),
});

const LoginSchema = z.object({
    email: z.string().email("Некорректный формат email").min(1, "Email обязателен"),
    password: z.string().min(4, "Пароль должен быть не менее 4 символов").min(1, "Пароль обязателен"),
});

export type RegisterData = z.infer<typeof RegisterSchema>;
export type LoginData = z.infer<typeof LoginSchema>;

export function fetchUser(): Promise<User> {
    return fetch(`${API_URL}/profile`, {
        method: "GET",
        credentials: "include",
    })
        .then((response) => {
            if (!response.ok) {
                if (response.status === 401) {
                    // Если пользователь не авторизован
                    throw new Error("401 Unauthorized");
                }
                throw new Error(`Ошибка получения профиля: ${response.status}`);
            }
            return response.json();

        })
        .then((data) => {
            try {
                return UserSchema.parse(data);
            } catch (validationError) {
                console.error("Ошибка валидации данных пользователя:", validationError);
                throw new Error("Ошибка валидации данных");
            }
        });
}

export function registerUser(register: { email: string, password: string, name: string, surname: string }): Promise<void> {
    return fetch(`${API_URL}/user`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(register),
    })
        .then(validateResponse)
        .then(() => undefined)
        .catch((error) => {
            console.error("Ошибка регистрации:", error);
            throw error;
        });
}

export const login = async ({
    email,
    password,
}: {
    email: string;
    password: string;
}): Promise<User> => {
    await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
    });
    return fetchUser();
};

export function logout(): Promise<void> {
    return fetch(`${API_URL}/auth/logout`, {
        method: "GET",
        credentials: "include",
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Ошибка выхода: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            if (data.result) {
                console.log("Выход выполнен успешно");
                localStorage.removeItem("token");
            } else {
                throw new Error("Ошибка: сервер вернул result = false");
            }
        })
        .catch((error) => {
            console.error("Ошибка выполнения logout:", error);
            throw error;
        });
}

export function addToFavorites(id: string): Promise<void> {
    return fetch(`${API_URL}/favorites`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ id }),
    })
        .then(validateResponse)
        .then(() => undefined)
        .catch((error) => {
            console.error("Ошибка регистрации:", error);
            throw error;
        });
}

export function deleteFromFavorites(id: number): Promise<void> {
    return fetch(`${API_URL}/favorites/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ id }),
    })
        .then(validateResponse)
        .then(() => undefined)
        .catch((error) => {
            console.error("Ошибка регистрации:", error);
            throw error;
        });
}