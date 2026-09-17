import React from "react";

export type LogoSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /**
   * Predefined size presets for quick, consistent scaling
   * - xs: h-5 (20px)
   * - sm: h-7 (28px)
   * - md: h-9 (36px)
   * - lg: h-12 (48px)
   * - xl: h-16 (64px)
   * - 2xl: h-20 (80px)
   * @default 'md'
   */
  size?: LogoSize;
  /**
   * Explicit custom height (e.g. '32px', '2.5rem', 40)
   */
  height?: string | number;
  /**
   * Explicit custom width (e.g. '120px', 'auto', 140)
   */
  width?: string | number;
  /**
   * Optional custom CSS classes applied directly to the image or wrapper
   */
  className?: string;
  /**
   * Custom image source if overriding default public webp
   * @default '/images/logo.webp'
   */
  src?: string;
  /**
   * Image alt description for accessibility
   * @default 'SENSORSAE - Predictive IoT & Sensor Intelligence'
   */
  alt?: string;
  /**
   * Optional subtle glow effect around the logo for dark UI themes
   * @default false
   */
  glow?: boolean;
  /**
   * Click event handler
   */
  onClick?: (e: React.MouseEvent<HTMLImageElement | HTMLDivElement>) => void;
}

const SIZE_PRESETS: Record<LogoSize, { imgClass: string }> = {
  xs: { imgClass: "h-5" },
  sm: { imgClass: "h-7" },
  md: { imgClass: "h-9" },
  lg: { imgClass: "h-12" },
  xl: { imgClass: "h-16" },
  "2xl": { imgClass: "h-20" },
};

/**
 * Universal SENSORSAE brand logo component.
 * References `/images/logo.webp` from public assets.
 */
export const Logo: React.FC<LogoProps> = ({
  size = "md",
  height,
  width,
  className = "",
  src = "/images/logo.webp",
  alt = "SENSORSAE - Predictive IoT & Sensor Intelligence",
  glow = false,
  onClick,
  style,
  loading = "lazy",
  decoding = "async",
  ...rest
}) => {
  const sizeConfig = SIZE_PRESETS[size] || SIZE_PRESETS.md;

  const customStyle: React.CSSProperties = {
    ...style,
    ...(height ? { height: typeof height === "number" ? `${height}px` : height } : {}),
    ...(width ? { width: typeof width === "number" ? `${width}px` : width } : {}),
  };

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      decoding={decoding}
      onClick={onClick}
      style={customStyle}
      className={`w-auto object-contain select-none transition-all duration-300 ${
        height ? "" : sizeConfig.imgClass
      } ${glow ? "drop-shadow-[0_0_15px_rgba(59,130,246,0.35)]" : ""} ${
        onClick ? "cursor-pointer hover:opacity-90" : ""
      } ${className}`}
      {...rest}
    />
  );
};

export default Logo;
