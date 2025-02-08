import "./RegisterSuccess.css";
import Button from "../Button/Button";
import logo_icon from "../../assets/logo.svg"
import logo_title from "../../assets/маруся_black.svg"
import { useDispatch } from "react-redux";
import { openModal } from "../../state/modal/modalSlice";

const RegisterSuccess: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const dispatch = useDispatch();

    return (
        <div className="register-success-form">
            <div className="register-success-wrapper">
                <div className="register-success-logo-wrapper">
                    <img className="register-success-logo_icon" src={logo_icon} alt="logo_icon" />
                    <img className="register-success-logo_title" src={logo_title} alt="logo_title" />
                </div>

                <h3 className="register-success-title">Регистрация завершена</h3>

                <p className="register-success-text">Используйте вашу электронную почту для входа</p>

                <Button type="primary" children="Войти" onClick={() =>dispatch(openModal({ type: "login" }))} />
                
                <Button type="x" onClick={onClose} />
            </div>
        </div>
    )
}

export default RegisterSuccess;