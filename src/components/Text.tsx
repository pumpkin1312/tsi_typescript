import React from "react";

type SizeType = "small" | "middle" | "large";
type ColorType = "primary" | "secondary";

interface TextProps {
    size: SizeType;
    color: ColorType;
    title: string;    
}

export const Text = (props: TextProps) => {
const { size, color, title} = props;
const defaultClass =
    "flex items-center rounded-2 h-[40px] w-[max-content] px-4 py-2 cursor-pointer";

const classes = {
    colors: {
    primary: {
        button: "bg-auto",
        text: "auto",
        border: "1px solid"
    },
    secondary: {
        button: "bg-auto",
        text: "auto",
        border: "1px solid"
    },
    },
    sizes: {
    small: "font-sm",
    middle: "font-base text-xl",
    large: "font-base min-h-[56px] text-3xl",
    },
};
return (
    <div
    className={
        defaultClass +
        " " +
        classes.sizes[size] +
        " " +
        classes.colors[color].button
    }
    >
    <span className={classes.colors[color].text}>{title}</span>
    </div>
);
};
