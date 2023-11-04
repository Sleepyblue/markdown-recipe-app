import React from "react";
import "./SpreadSVG.css";
import Sprite from "../../../icons/Sprite.svg";

interface SpreadSVGProps {
  svg: string;
  fill?: string;
  stroke?: string;
  size?: number;
  title?: string;
  className?: string[];
}

const SpreadSVG: React.FC<SpreadSVGProps> = ({
  svg,
  fill = "transparent",
  stroke = "black",
  size = "24",
  title,
  className,
}) => {
  const combinedClasses = (classes: string[] | undefined) => classes?.join(" ");

  return (
    <svg
      className={combinedClasses(className)}
      fill={fill}
      stroke={stroke}
      width={size}
      height={size}
      role={title ? "img" : "presentation"}
    >
      {title && <title>{title}</title>}
      <use href={`${Sprite}#${svg}`} />
    </svg>
  );
};

export default SpreadSVG;
