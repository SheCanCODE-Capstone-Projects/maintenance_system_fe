import Image from "next/image";

type BrandMarkProps = {
  size?: number;
  className?: string;
};

export default function BrandMark({ size = 40, className = "" }: BrandMarkProps) {
  return (
    <span
      className={`inline-flex items-center justify-center overflow-hidden rounded-full bg-white shadow-sm ${className}`.trim()}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <Image
        src="/brand-mark.svg"
        alt=""
        width={size}
        height={size}
        className="h-full w-full object-cover"
      />
    </span>
  );
}
