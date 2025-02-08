import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { closeModal } from "../../state/modal/modalSlice";
import Login from "../../ui/Login/Login";
import Register from "../../ui/Register/Register";
import RegisterSuccess from "../../ui/RegisterSuccess/RegisterSuccess";
import { FC } from "react";

const Modal: FC = () => {
  const dispatch = useDispatch();
  const { isOpen, modalType } = useSelector((state: RootState) => state.modal);

  if (!isOpen) return null;

  const closeModalHandler = () => {
    dispatch(closeModal());
  };

  switch (modalType) {
    case "login":
      return <Login onClose={closeModalHandler} />;
    case "register":
      return <Register onClose={closeModalHandler} />;
    case "registerSuccess":
      return <RegisterSuccess onClose={closeModalHandler} />;
    // case "video":
    //   return trailerLink ? <Video link={trailerLink} onClose={closeModalHandler} /> : null;
    default:
      return null;
  }
};

export default Modal;
