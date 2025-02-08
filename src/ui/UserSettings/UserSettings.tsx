import "./UserSettings.css"
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../api/User";
import { logoutUser } from "../../state/user/userSlice";
import { RootState } from "../../state/store";
import { getInitials } from "../../utils/getInitials";
import Button from "../Button/Button";
import { FC } from "react";

const UserSettings: FC = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);

    const handleLogout = async () => {
        try {
            await logout();
            dispatch(logoutUser());
            console.log("Пользователь вышел");
        } catch (error) {
            console.error("Ошибка при выходе:", error);
        }
    };

    return (
        <>
            {user.isAuthenticated ? (
                <section className="user-settings">
                    <div className="user-settings-wrapper">
                        <div className="user-settings-logo">
                            {getInitials(user.name, user.surname)}
                        </div>

                        <div className="user-settings-data">
                            <span className="user-settings-key">Имя Фамилия</span>
                            <span className="user-settings-value">
                                {user.name} {user.surname}
                            </span>
                        </div>
                    </div>

                    <div className="user-settings-wrapper user-settings-wrapper_last">
                        <div className="user-settings-logo user-settings-logo_last"></div>

                        <div className="user-settings-data">
                            <span className="user-settings-key">Электронная почта</span>
                            <span className="user-settings-value">{user.email}</span>
                        </div>
                    </div>

                    <Button type="primary" children="Выйти из аккаунта" onClick={handleLogout} />
                </section>
            ) : (
                <p>Пользователь не авторизован</p>
            )}
        </>
    );
};

export default UserSettings;
