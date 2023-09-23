import "./SVGIcon.css";
import { lazy, Suspense } from "react";

type IconButtonProps = {
  iconName: "Cogwheel" | "Close" | "";
  size: number;
  iconClass?: string;
};

function SVGIcon({ iconName, size, iconClass }: IconButtonProps) {
  const iconPath = `../../../icons/${iconName}.tsx`;

  const DynamicIcon = lazy(
    () =>
      // To supress vite warning: The above dynamic import cannot be analyzed by Vite.
      import(iconPath /* @vite-ignore */) as Promise<{
        default: React.ComponentType<Partial<IconButtonProps>>;
      }>
  );

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DynamicIcon size={size} iconClass={iconClass} />
    </Suspense>
  );
}

export default SVGIcon;
