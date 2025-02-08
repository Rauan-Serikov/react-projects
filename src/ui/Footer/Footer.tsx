import "./Footer.css"
import vk from "../../assets/vk.svg"
import youtube from "../../assets/youtube.svg"
import ok from "../../assets/ok.svg"
import telegram from "../../assets/telegram.svg"
import { FC } from "react"


const Footer: FC = () => {
    return (
        <div className="footer">
            <a className="footer-link" href="http://">
                <img className="footer-icon" src={vk} alt="vk" />
            </a>

            <a className="footer-link" href="http://">
                <img className="footer-icon" src={youtube} alt="vk" />
            </a>

            <a className="footer-link" href="http://">
                <img className="footer-icon" src={ok} alt="vk" />
            </a>

            <a className="footer-link" href="http://">
                <img className="footer-icon" src={telegram} alt="vk" />
            </a>
        </div>
    )
}

export default Footer;