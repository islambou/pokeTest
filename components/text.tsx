import React, { FunctionComponent } from "react";
import { Text as RnText, TextProps } from "react-native";

export interface MyTextProps extends TextProps {
  subTitle?: boolean;
  isPlaceholder?: boolean;
  light?: boolean;
  bold?: boolean;
  color?: string;
  size?: number;
  withshadow?: boolean;
}
const Text: FunctionComponent<MyTextProps> = ({ children, ...props }) => {
  let size = props.size;

  return (
    <RnText
      {...props}
      style={[
        props.style,

        props.subTitle
          ? { color: "grey", fontSize: 12, marginBottom: 5 }
          : { color: "#2c3e4d" },
        props.isPlaceholder
          ? { color: "#bbb", fontSize: 12, fontFamily: "grl" }
          : {},
        ,
        props.color ? { color: props.color } : null,
        { textTransform: "capitalize" },
        {
          fontSize: size ? size : 14,
          fontWeight: props.bold ? "bold" : "normal",
        },
        props.withshadow
          ? {
              textShadowColor: "rgba(0, 0, 0, 0.25)",
              textShadowOffset: { width: -1, height: 1 },
              textShadowRadius: 5,
            }
          : null,
      ]}
    >
      {children}
    </RnText>
  );
};
export default Text;
