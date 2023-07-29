import React, { useEffect, useRef, useState } from "react";

type SvgIconType = React.FC<React.SVGProps<SVGElement>>;

export function useDynamicSvg(iconName: string) {
  const importedIconRef = useRef<SvgIconType | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    setLoading(true);

    async function importSvgIcon(): Promise<void> {
      try {
        importedIconRef.current = (
          (await import(`../icons/${iconName}.svg`)) as {
            ReactComponent: SvgIconType;
          }
        ).ReactComponent;
      } catch (err) {
        setError(err);
        // console.error(err);
      } finally {
        setLoading(false);
      }
    }

    void importSvgIcon();
  }, [iconName]);
  return { error, loading, SvgIcon: importedIconRef.current };
}
