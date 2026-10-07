import { useEffect, useState } from "react";
import { DESIGN_W, DESIGN_H } from "../data.js";

export default function Stage({
  children,
  height = DESIGN_H,
  bg = "#000",
  id,
}) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () =>
      setScale(document.documentElement.clientWidth / DESIGN_W);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div
      id={id}
      className="viewport"
      style={{ height: height * scale, background: bg }}
    >
      <div
        className="stage"
        style={{
          width: DESIGN_W,
          height,
          background: bg,
          transform: `scale(${scale})`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
