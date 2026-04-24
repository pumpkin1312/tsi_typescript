import React from "react";

type SizeType = "small" | "middle" | "large";
type ColorType = "primary" | "secondary";
type InputType = "text" | "password" | "email" | "number";

interface InputProps {
    size: SizeType;
    color: ColorType;
    placeholder?: string;
    value?: string;
    onChange?: (value: string)=> void;
    type?: InputType;
}

export const Input = (props: InputProps) => {
const { size, color, placeholder, value, onChange, type="text"} = props;
const defaultClass =
    "flex items-center rounded-2 h-[40px] w-[max-content] px-4 py-2 cursor-pointer border-[2px] border-[#9bb5d4]";

const classes = {
    colors: {
    primary: {
        input: "bg-[#CFE2F3]",
        border: "1px solid",
        placeholder: "placeholder-gray-500",
        label: "text-gray-700"
    },
    secondary: {
        input: "bg-red-500",
        text: "auto",
        placeholder: "placeholder-gray-500",
        label: "text-red-700"
    },
    },
    sizes: {
    small: "rounded-[100px] font-sm h-[30px] p-[10px]",
    middle: "rounded-[14px] font-base h-[35px] p-[10px]",
    large: "rounded-[16px] font-base min-h-[56px] p-[10px]",
    },
};
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
};
const inputClasses = [
        "w-full outline-none transition-all duration-200 border-2 border-[#9bb5d4]",
        classes.sizes[size],
        classes.colors[color].input,
        classes.colors[color].placeholder
    ].join(" ");

return (
        <div className="flex flex-col w-full max-w-[300px]">
            {/* <label className={`mb-1 font-medium ${classes.colors[color].label}`}>
                {placeholder}
            </label> */}
            
            <input
                type={type}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                className={inputClasses}
            />
        </div>
);
};
