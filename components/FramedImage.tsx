import ImageWithLoader from "./ImageWithLoader";

type FramedImageProps = {
  src: string;
  alt: string;
  // Tailwind classes that size the frame, e.g. "h-[308px] w-[275px] md:h-[500px] md:w-[500px]".
  className: string;
  sizes: string;
  preload?: boolean;
};

// The site's signature picture treatment: a bronze frame with the photo
// floating slightly up and to the left of it.
export default function FramedImage({ src, alt, className, sizes, preload }: FramedImageProps) {
  return (
    <div className={`relative shrink-0 border-[6px] border-bronze ${className}`}>
      <div className="absolute -left-[20px] -top-[26px] h-full w-full animate-float shadow-[64px_64px_160px_-40px_rgba(0,0,0,0.24)] md:-left-[21px] md:-top-[27px]">
        <ImageWithLoader
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          preload={preload}
          className="object-cover"
        />
      </div>
    </div>
  );
}
