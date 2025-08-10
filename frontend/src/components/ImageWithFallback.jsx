import { useState, useRef, useEffect } from "react";

const ImageWithFallback = ({
  src,
  alt,
  fallbackSrc = "/placeholder-movie.jpg",
  className = "",
  onLoad,
  onError,
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    setImgSrc(src);
    setIsLoading(true);
    setHasError(false);
  }, [src]);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
    onLoad?.();
  };

  const handleError = () => {
    if (imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    } else {
      setIsLoading(false);
      setHasError(true);
    }
    onError?.();
  };

  return (
    <div className={`image-container ${className}`}>
      {isLoading && (
        <div className="image-skeleton">
          <div className="skeleton-animation"></div>
        </div>
      )}
      <img
        ref={imgRef}
        src={imgSrc}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={`image-content ${isLoading ? "loading" : ""} ${
          hasError ? "error" : ""
        }`}
        {...props}
      />
      {hasError && imgSrc === fallbackSrc && (
        <div className="image-error-overlay">
          <span>Image unavailable</span>
        </div>
      )}
    </div>
  );
};

export default ImageWithFallback;
