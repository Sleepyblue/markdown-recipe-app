import { useDynamicSvg } from "../../hooks/useDynamicSVG.ts";
import "./SVGIcon.css";

type IconButtonProps = {
  iconName: "Cogwheel";
  size: number;
};

function SVGIcon({ iconName, size }: IconButtonProps) {
  const { loading, SvgIcon } = useDynamicSvg(iconName);

  return (
    <>
      {loading && <div></div>}
      {SvgIcon && <SvgIcon width={size} height={size} />}
    </>
  );
}

export default SVGIcon;
