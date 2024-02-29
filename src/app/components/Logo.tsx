import Image from "next/image";

interface IProps {
  width?: number;
  height?: number;
}

export default function Logo({ width, height }: IProps) {

  const defaultWidth = 197;
  const defaultHeight = 34.14;

  const defaultRatio = defaultWidth / defaultHeight;

  const widthByRatio = height !== undefined ? defaultRatio * height : defaultWidth;
  const heightByRatio = width !== undefined ? (1 / defaultRatio) * width : defaultHeight;

  return (
    <Image
      src="/logo.svg"
      alt="CiaoChow Logo"
      width={width ?? widthByRatio}
      height={height ?? heightByRatio}
      priority
    />
  );
}
