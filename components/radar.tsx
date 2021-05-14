// credit : https://gist.github.com/brianfoody/49e22e66ffff3709904e5e17981c2a4a

import React, { useMemo } from "react";
import { View } from "react-native";
import Svg, { Circle, Line, Polygon, G, Text } from "react-native-svg";

export type RadarData = {
  value: number;
  label: string;
};

type Props = {
  radarData: RadarData[];
  size: number;
};

type Point = [number, number];

const svgY = (degrees: number) => degrees + 180;

function degToRadians(degrees: number) {
  var pi = Math.PI;
  return degrees * (pi / 180);
}

const calculateEdgePointFn =
  (center: number, radius: number) =>
  (degree: number, scale: number = 1): Point => {
    const degreeInRadians = degToRadians(degree);
    const degreeInRadiansY = degToRadians(svgY(degree));
    return [
      center + Math.cos(degreeInRadians) * radius * scale,
      center + Math.sin(degreeInRadiansY) * radius * scale,
    ];
  };

export default (props: Props) => {
  const viewBoxSize = props.size || 120;
  const viewBoxCenter = viewBoxSize * 0.5;
  const radius = viewBoxSize * 0.4;

  const numberOfItems = props.radarData.length;
  const lengthMedian = numberOfItems / 2 - 1;

  const calculateEdgePoint = useMemo(
    () => calculateEdgePointFn(viewBoxCenter, radius),
    [radius]
  );

  const horizontalMarginFactor = (i: number) => {
    const index = i + 1;

    if (index > lengthMedian && index < numberOfItems - 1) return -1;
    if (index === lengthMedian || index === numberOfItems - 1) return 0;
    return 1;
  };

  const verticalMarginFactor = (i: number) => {
    const index = i + 1;
    if (index === lengthMedian) return -1;
    if (index === numberOfItems - 1) return 2;
    return 0;
  };

  const anglesPerLine = 360 / numberOfItems;
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: viewBoxSize,
      }}
    >
      <Svg
        height="100%"
        width="100%"
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
      >
        {[0, 1, 2, 3].map((i) => (
          <Circle
            key={`circle_outline_${i}`}
            cx={viewBoxCenter}
            cy={viewBoxCenter}
            r={(i + 1) * radius * 0.25}
            stroke="black"
            strokeOpacity="0.2"
            strokeWidth="0.5"
            fill="transparent"
          />
        ))}

        {props.radarData.map((item, i) => {
          const x1 = calculateEdgePoint(i * anglesPerLine)[0];
          const y1 = calculateEdgePoint(i * anglesPerLine)[1];
          const x2 = calculateEdgePoint(i * anglesPerLine + 180)[0];
          const y2 = calculateEdgePoint(i * anglesPerLine + 180)[1];
          const horizontalMarginFactorVal = horizontalMarginFactor(i);
          const verticalMarginFactorVal = verticalMarginFactor(i);
          return (
            <G key={"label" + i}>
              <Line
                key={`crosshair_${i}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="black"
                strokeOpacity="0.2"
                strokeWidth="0.5"
                fill="transparent"
              />
              <Text
                fill="#fff"
                textAnchor={
                  horizontalMarginFactorVal === 1
                    ? "start"
                    : horizontalMarginFactorVal === -1
                    ? "end"
                    : "middle"
                }
                x={Math.floor(x1 + horizontalMarginFactorVal * 10)}
                y={Math.floor(y1 + verticalMarginFactorVal * 10)}
                fontSize={12}
                fontWeight="bold"
                stroke="rgba(0,0,0,0.15)"
              >
                {item.label}
              </Text>
            </G>
          );
        })}

        <Polygon
          stroke={"rgba(0,0,0,0.8)"}
          strokeWidth={1.2}
          fill={"rgba(0,0,0,0.3)"}
          fillOpacity={0.9}
          points={`${props.radarData.map((r, i) => {
            const edgePoint = calculateEdgePoint(
              i * anglesPerLine,
              r.value / 100
            );
            return `${edgePoint[0]},${edgePoint[1]}`;
          })}`}
        />
      </Svg>
    </View>
  );
};
