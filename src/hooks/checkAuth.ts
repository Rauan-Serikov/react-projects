import { loginUser, logoutUser, finishLoading } from "../state/user/userSlice";
import { AppDispatch } from "../state/store";
import { fetchUser } from "../api/User";

export const checkAuth = async (dispatch: AppDispatch) => {
  try {
    const user = await fetchUser();
    if (user) {
      dispatch(loginUser({ name: user.name, surname: user.surname, email: user.email }));
    } else {
      dispatch(logoutUser());
    }
  } catch (error) {
    console.warn("Ошибка проверки авторизации:", error);
    dispatch(logoutUser());
  } finally {
    dispatch(finishLoading());
  }
};
