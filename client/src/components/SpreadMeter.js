import { useEffect, useState } from "react";
import "../css/spreadRange.css";

const SpreadMeter = ({
  min,
  max,
  value,
  direction = 0,
  size,
  unit = "bps", // need i18n integration
}) => {
  const [sliderPosition, setSliderPosition] = useState("");

  const thumbWidth = size === "big" ? 93 : 65;

  useEffect(() => {
    const initialPosition = ((value - min) / (max - min)) * 100;

    const sliderPositionWithWidth =
      initialPosition < 10
        ? `${initialPosition}%`
        : `calc(${initialPosition}% - ${thumbWidth / 2}px)`;
    setSliderPosition(sliderPositionWithWidth);
  });

  return (
    <div className={`x-slider-container-${size}`}>
      <div className={`x-slider-${size}`}>
        <div
          className={`x-track-${size}`}
          style={{ transform: "rotate(-360deg)" }}
        />
        {value > 0 && sliderPosition && (
          <div
            className={`x-thumb-${size}`}
            style={{ left: `${sliderPosition}` }}
          >
            <div className={`x-number-${size}`}>{value}</div>
          </div>
        )}

        {value <= 0 && (
          <div
            className={`x-thumb-${size} x-thumb-no-spread`}
            style={{ left: `20px` }}
          >
            <div className={`x-number-${size}`}></div>
          </div>
        )}
      </div>
      <div className={`x-unit-${size}`}>
        <div className={`x-min-unit-${size}`}>
          {min} {unit}
        </div>
        <div className={`x-max-unit-${size}`}>
          {max} {unit}
        </div>
      </div>
    </div>
  );
};

export default SpreadMeter;
