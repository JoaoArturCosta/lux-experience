// Image optimization utilities
export const optimizeImageUrl = (url, width = 400, height = 600) => {
  if (!url) return null;

  // If it's already an Unsplash URL, optimize it
  if (url.includes("unsplash.com")) {
    const baseUrl = url.split("?")[0];
    return `${baseUrl}?w=${width}&h=${height}&fit=crop&crop=entropy&auto=format&q=80`;
  }

  // For other URLs, return as is
  return url;
};

export const getImageDimensions = (containerWidth, aspectRatio = 2 / 3) => {
  return {
    width: containerWidth,
    height: containerWidth / aspectRatio,
  };
};

export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

export const validateImageUrl = async (url) => {
  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok;
  } catch {
    return false;
  }
};

export const getFallbackImage = (category) => {
  const fallbackImages = {
    action: "/images/action-placeholder.jpg",
    comedy: "/images/comedy-placeholder.jpg",
    drama: "/images/drama-placeholder.jpg",
  };
  return fallbackImages[category] || "/images/default-placeholder.jpg";
};

export const generatePlaceholderImage = (title, category) => {
  // Generate a simple placeholder based on title and category
  const colors = {
    action: "#f44336",
    comedy: "#ff9800",
    drama: "#9c27b0",
  };

  const color = colors[category] || "#666666";
  const initials = title
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return `data:image/svg+xml,${encodeURIComponent(`
    <svg width="400" height="600" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="600" fill="${color}"/>
      <text x="200" y="300" font-family="Arial, sans-serif" font-size="48" fill="white" text-anchor="middle" dominant-baseline="middle">${initials}</text>
    </svg>
  `)}`;
};
