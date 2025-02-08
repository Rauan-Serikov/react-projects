import "./UserPage.css";
import { Link, Outlet } from "react-router-dom";
import like from "../../assets/like.svg"
import userLogo from "../../assets/userLogo_white.svg"
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { FC } from "react";


const UserPage: FC = () => {
    const user = useSelector((state: RootState) => state.user);

    return (
        <>
        {user.isAuthenticated ? (
            <section className="user">
            <h1 className="user-title">Мой аккаунт</h1>

            <div className="user-wrapper">
                <div className="user-sub-wrapper">
                    <Link className="user-button" to="/profile/favorites">
                        <img className="user-icon" src={like} alt="like" />
                    </Link>

                    <Link className="user-button" to="/profile/favorites">
                        Избранные фильмы
                    </Link>
                </div>

                <div className="user-sub-wrapper">
                    <Link className="user-button" to="/profile/settings">
                        <img className="user-icon" src={userLogo} alt="user" />
                    </Link>

                    <Link className="user-button" to="/profile/settings">
                        Настройка аккаунта
                    </Link>
                </div>
            </div>

            <div className="user-content">
                <Outlet />
            </div>
        </section>
        ) : (<p>Пользователь не авторизован</p>)}
        </>
    )
}

export default UserPage;