import React from "react";

type SizeType = "small" | "middle" | "large";
type ColorType = "primary" | "secondary" | "disabled" | "login";

interface ButtonProps {
    size: SizeType;
    color: ColorType;
    title: string;
    onClick: () => void;
    children?: React.JSX.Element;
    disabled?: boolean;
}

export const Button = (props: ButtonProps) => {
const { size, color, title, onClick, disabled = false } = props;
const defaultClass =
    "flex items-center rounded-2 h-[40px] w-[max-content] px-4 py-2 cursor-pointer border-[2px] border-[#9bb5d4] justify-center";

const classes = {
    colors: {
    primary: {
        button: "bg-[#CFE2F3]",
        text: "auto",
        border: "1px solid"
    },
    secondary: {
        button: "bg-[#1e4b73]",
        text: "auto text-white",
        border: "1px solid border-[#091621]"
    },
    disabled:{
        button: "bg-gray-300",
        text: "text-gray-700",
        border: "1px solid"
    },
    login:{
        button: "auto",
        text: "text-2xl",
        border: "4px solid rounded-[20%]"
    }
    },
    sizes: {
    small: "rounded-[100px] font-sm",
    middle: "rounded-[14px] font-base min-h-[45px] min-w-[90px]",
    large: "rounded-[16px] font-base min-h-[60px] min-w-[100px]",
    },
};

const handleClick = () => {
    if (!disabled) {
        onClick();
    }
};

const disabledClasses = disabled 
    ? "opacity-50 cursor-not-allowed pointer-events-none" 
    : "";

return (
    <div
    className={
        defaultClass +
        " " +
        classes.sizes[size] +
        " " +
        classes.colors[color].button
    }
    onClick={handleClick}
    aria-disabled={disabled}
    >
    <span className={classes.colors[color].text}>{title}</span>
    </div>
);
};
