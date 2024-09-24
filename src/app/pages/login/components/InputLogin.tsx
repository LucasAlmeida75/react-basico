import React from "react";

interface IInputLoginProps {
    label: string;
    value: string;
    type: string;

    onChange: (newValue: string) => void;
    onPressEnter?: () => void;
}

/* export const InputLogin: React.FC<IInputLoginProps> = (props) => {
    return (
        <label htmlFor="">
            <span>{props.label}</span>
            <input
                type={props.type}
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && props.onPressEnter ? props.onPressEnter() : undefined}
            />
        </label>
    );
} */

//Só é necessário usar desta forma o componente se for utilizar o useRef
export const InputLogin = React.forwardRef<HTMLInputElement, IInputLoginProps>((props, ref) => {
    return (
        <label htmlFor="">
            <span>{props.label}</span>
            <input
                type={props.type}
                value={props.value}
                ref={ref}
                onChange={e => props.onChange(e.target.value)}
                onKeyDown={e => e.key === 'Enter' ? props.onPressEnter && props.onPressEnter() : undefined}
            />
        </label>
    );
});