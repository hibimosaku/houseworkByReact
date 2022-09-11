import React, { FC } from "react";

type Props = {
  children: string;
  onClick: () => void;
};

const Button: FC<Props> = (props) => {
  const { children, onClick } = props;
  return (
    <button
      className="block px-4 py-1 bg-green-500 rounded-lg text-white"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
