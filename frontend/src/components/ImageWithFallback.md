# ImageWithFallback Component

A robust React component for handling image loading with fallback support, skeleton loading states, and error handling.

## Features

- **Skeleton Loading**: Shows an animated skeleton while images are loading
- **Fallback Support**: Automatically falls back to a placeholder image if the primary image fails
- **Error Handling**: Displays an error overlay when both primary and fallback images fail
- **Lazy Loading**: Supports native lazy loading for better performance
- **Category-specific Styling**: Different skeleton colors based on film categories
- **Smooth Transitions**: CSS transitions for loading states

## Usage

```jsx
import ImageWithFallback from './ImageWithFallback'

// Basic usage
<ImageWithFallback
  src="https://example.com/image.jpg"
  alt="Description"
/>

// With fallback image
<ImageWithFallback
  src="https://example.com/image.jpg"
  alt="Description"
  fallbackSrc="/placeholder.jpg"
/>

// With custom className and lazy loading
<ImageWithFallback
  src="https://example.com/image.jpg"
  alt="Description"
  className="custom-image"
  loading="lazy"
/>
```

## Props

| Prop          | Type     | Default                  | Description                            |
| ------------- | -------- | ------------------------ | -------------------------------------- |
| `src`         | string   | required                 | Primary image URL                      |
| `alt`         | string   | required                 | Alt text for accessibility             |
| `fallbackSrc` | string   | '/placeholder-movie.jpg' | Fallback image URL                     |
| `className`   | string   | ''                       | Additional CSS classes                 |
| `onLoad`      | function | undefined                | Callback when image loads successfully |
| `onError`     | function | undefined                | Callback when image fails to load      |
| `loading`     | string   | undefined                | Loading attribute ('lazy', 'eager')    |

## States

1. **Loading**: Shows skeleton animation
2. **Success**: Image displays normally
3. **Error with Fallback**: Tries fallback image
4. **Complete Failure**: Shows error overlay

## CSS Classes

- `.image-container`: Main container
- `.image-content`: The actual image element
- `.image-content.loading`: Applied during loading
- `.image-content.error`: Applied when image fails
- `.image-skeleton`: Skeleton loading animation
- `.image-error-overlay`: Error message overlay

## Integration

The component is integrated throughout the application:

- **FilmCarousel**: For movie posters in carousel view
- **FilmDetail**: For detailed movie poster view
- **Wishlist**: For wishlist movie items

## Performance Benefits

- Lazy loading reduces initial page load time
- Skeleton loading provides immediate visual feedback
- Fallback images prevent broken image states
- Optimized image URLs with proper sizing and quality parameters
