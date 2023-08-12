import { useDynamicSvg } from "../../hooks/useDynamicSVG.ts";
import "./SVGIcon.css";

type IconButtonProps = {
  iconName: "Cogwheel" | "Close" | "";
  size: number;
  iconClass?: string;
};

function SVGIcon({ iconName, size, iconClass }: IconButtonProps) {
  const { loading, SvgIcon } = useDynamicSvg(iconName);

  return (
    <>
      {loading && <div></div>}
      {SvgIcon === undefined && !loading && (
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <g fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11.5" cy="11.5" r="9.5" opacity=".5" />
              <path
                strokeLinecap="round"
                d="M11.5 15.5a3 3 0 0 1-3-3v-2m3 5a3 3 0 0 0 3-3v-2m-3 5v-5m3 0a3 3 0 1 0-6 0m6 0h-6m6.072 1H16m-9 0h1.5m6 2.5l1 .5m-7-.5l-1 .5m7-5.5l1-.5m-7 .5l-1-.5M20 20l2 2"
              />
            </g>
          </svg>
        </div>
      )}
      {SvgIcon && <SvgIcon width={size} height={size} className={iconClass} />}
    </>
  );
}

export default SVGIcon;
