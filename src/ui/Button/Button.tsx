import "./Button.css"

type ButtonProps = {
    type?: 'primary' | 'secondary' | 'withIcon' | 'x' | 'pause' | 'submit' | 'mobile-icon';
    isLoading?: boolean;
    onClick?: (e: React.SyntheticEvent<HTMLButtonElement>) => void;
    children?: React.ReactNode;
}

const Button = ({isLoading, children, onClick, type }: ButtonProps) => {
    return (
        <button
            className={`Button ${type}`}
            onClick={onClick}
        >
             {isLoading ? <>Loading...</> : children}
        </button>
    )
}

export default Button;