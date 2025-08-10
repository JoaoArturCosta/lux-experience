import { render, screen, fireEvent } from "@testing-library/react";
import ImageWithFallback from "./ImageWithFallback";

describe("ImageWithFallback", () => {
  test("renders image with correct src and alt", () => {
    render(
      <ImageWithFallback src="https://example.com/test.jpg" alt="Test image" />
    );

    const img = screen.getByAltText("Test image");
    expect(img).toHaveAttribute("src", "https://example.com/test.jpg");
  });

  test("shows skeleton loading initially", () => {
    render(
      <ImageWithFallback src="https://example.com/test.jpg" alt="Test image" />
    );

    const skeleton = document.querySelector(".image-skeleton");
    expect(skeleton).toBeInTheDocument();
  });

  test("handles image load successfully", () => {
    render(
      <ImageWithFallback src="https://example.com/test.jpg" alt="Test image" />
    );

    const img = screen.getByAltText("Test image");
    fireEvent.load(img);

    const skeleton = document.querySelector(".image-skeleton");
    expect(skeleton).not.toBeInTheDocument();
  });

  test("handles image error with fallback", () => {
    render(
      <ImageWithFallback
        src="https://invalid-url.com/test.jpg"
        alt="Test image"
        fallbackSrc="/fallback.jpg"
      />
    );

    const img = screen.getByAltText("Test image");
    fireEvent.error(img);

    expect(img).toHaveAttribute("src", "/fallback.jpg");
  });

  test("shows error overlay when fallback also fails", () => {
    render(
      <ImageWithFallback
        src="https://invalid-url.com/test.jpg"
        alt="Test image"
        fallbackSrc="/fallback.jpg"
      />
    );

    const img = screen.getByAltText("Test image");
    fireEvent.error(img); // First error
    fireEvent.error(img); // Fallback error

    const errorOverlay = screen.getByText("Image unavailable");
    expect(errorOverlay).toBeInTheDocument();
  });
});
