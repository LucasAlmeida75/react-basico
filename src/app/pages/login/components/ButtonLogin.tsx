interface IButtonLoginProps {
    type?: "submit" | "button" | "reset";
    onClick: () => void;
    children: React.ReactNode;
}

export const ButtonLogin: React.FC<IButtonLoginProps> = ({type, onClick, children}) => {
    return (
        <button type={type} onClick={e => onClick}>
            {children}
        </button>
    )
}