import React from "react"

export interface IDefaultPageProps extends React.HTMLAttributes<HTMLDivElement> {
  companyName?: string
  companyImage?: string
  customStyles?: React.CSSProperties
}

export const DefaultPage: React.FunctionComponent<IDefaultPageProps> = ({
  companyName,
  companyImage,
  customStyles,
  children,
  ...restProps
}) => {
  const { style, ...otherProps } = restProps

  let defaultStyle: React.CSSProperties = style || {}

  if (customStyles) {
    defaultStyle = { ...defaultStyle, ...customStyles }
  }

  return (
    <div style={defaultStyle} {...otherProps}>
      <header>
        <h1>{companyName}</h1>
        <img src={companyImage} alt={companyName} />
      </header>
      {children}
    </div>
  );
};