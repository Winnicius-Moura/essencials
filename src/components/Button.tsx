import React from 'react';

export interface IButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  backgroundColor?: string;
  color?: string;
}

export const Button: React.FunctionComponent<IButtonProps> = (props) => {
  const { children, backgroundColor, color, style } = props;

  let defaultStyle: React.CSSProperties = style || {};

  if (backgroundColor) defaultStyle.backgroundColor = backgroundColor;
  if (color) defaultStyle.color = color;

  return (
    <button style={defaultStyle} {...props}>
      {children}
    </button>
  );
};
