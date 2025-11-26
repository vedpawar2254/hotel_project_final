# Parallax Hero Component - Integration Guide

## Overview
A production-ready, luxury parallax hero section with:
- ✅ Multi-layer parallax (background, logo, title, subtitle at different speeds)
- ✅ Rounded bottom corners on scroll (0 → 80px)
- ✅ Cinematic fade-in animations
- ✅ GSAP ScrollTrigger for buttery-smooth motion
- ✅ Optimized performance with `will-change` and `transform3d`

## Installation

The component is already created at:
```
src/components/ParallaxHero.jsx
```

GSAP is already installed in your project.

## Usage

### Basic Usage

```jsx
import ParallaxHero from '../components/ParallaxHero';

function HomePage() {
  return (
    <div>
      <ParallaxHero
        backgroundImage="/hero-rooftop.jpg"
        logo="/logo.png"
        title="THE HOLLYWOOD"
        subtitle="Where skyline whispers meet curated cocktails."
      >
        {/* Optional: Add navigation links or CTA buttons */}
        <div className="flex items-center justify-center space-x-4 text-xs tracking-[0.25em] uppercase mt-8">
          <a href="#hours" className="hover:text-luxury-gold transition-colors duration-300">Hours</a>
          <span className="text-luxury-gold">—</span>
          <a href="#menus" className="hover:text-luxury-gold transition-colors duration-300">Menus</a>
          <span className="text-luxury-gold">—</span>
          <a href="#events" className="hover:text-luxury-gold transition-colors duration-300">Events</a>
        </div>
      </ParallaxHero>
      
      {/* Rest of your page content */}
    </div>
  );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `backgroundImage` | string | `'/hero-rooftop.jpg'` | URL of the hero background image |
| `logo` | string | `'/logo.png'` | URL of the logo image |
| `title` | string | `'THE HOLLYWOOD'` | Main heading text |
| `subtitle` | string | `'Where skyline...'` | Subtitle text |
| `children` | ReactNode | - | Additional content (nav links, buttons, etc.) |

## Parallax Speed Configuration

The component uses different scroll speeds for each layer:

```javascript
// Background: 0.5x speed (slowest)
yPercent: 30, scrub: 1.5

// Logo: 0.3x speed
yPercent: -20, scrub: 1

// Title: 0.5x speed
yPercent: -30, scrub: 1.2

// Subtitle: 0.7x speed (fastest)
yPercent: -50, scrub: 0.8
```

To adjust speeds, modify the `yPercent` and `scrub` values in `ParallaxHero.jsx`.

## Rounded Corners Animation

The hero section's bottom corners animate from `0px` to `80px` border-radius as you scroll:

```javascript
gsap.to(heroRef.current, {
  borderBottomLeftRadius: '80px',
  borderBottomRightRadius: '80px',
  scrollTrigger: {
    start: 'top top',
    end: '+=300', // Animates over 300px of scroll
    scrub: 1.5
  }
});
```

Adjust `end: '+=300'` to change how quickly the corners round.

## Performance Optimizations

The component includes several performance optimizations:

1. **Hardware Acceleration**
   ```jsx
   will-change-transform
   transform: 'translateZ(0)'
   backfaceVisibility: 'hidden'
   ```

2. **GSAP Context Cleanup**
   ```javascript
   return () => {
     ctx.revert();
     ScrollTrigger.getAll().forEach(trigger => trigger.kill());
   };
   ```

3. **Smooth Scrubbing**
   - Uses `scrub` values between 0.8-1.5 for buttery motion
   - `ease: 'none'` for scroll-linked animations

## Customization Examples

### Change Parallax Intensity

```javascript
// Make background move faster
gsap.to(bgRef.current, {
  yPercent: 50, // Increase from 30
  scrub: 1
});
```

### Adjust Fade-in Timing

```javascript
tl.from(logoRef.current, {
  opacity: 0,
  y: 30,
  duration: 1.5, // Slower fade-in
  ease: 'power4.out' // Different easing
});
```

### Change Rounded Corner Radius

```javascript
gsap.to(heroRef.current, {
  borderBottomLeftRadius: '120px', // More rounded
  borderBottomRightRadius: '120px',
  // ...
});
```

## Tailwind Classes Used

The component uses these custom Tailwind utilities (already in your `index.css`):

- `.section-luxury` - Luxury section spacing
- `.luxury-gold` - Gold accent color (#C8A962)
- `.luxury-ivory` - Ivory background (#F5F1EB)
- `.luxury-charcoal` - Charcoal text (#0A0A0C)

## Browser Compatibility

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

Requires modern browser with CSS `will-change` and `transform3d` support.

## Troubleshooting

### Parallax feels janky
- Reduce `scrub` values (try 0.5-1.0)
- Ensure images are optimized (<500KB)
- Check for other heavy animations on the page

### Rounded corners not animating
- Verify ScrollTrigger is registered: `gsap.registerPlugin(ScrollTrigger)`
- Check browser console for errors
- Ensure hero section has proper height

### Content not fading in
- Check that GSAP timeline is completing
- Verify refs are properly attached
- Look for CSS conflicts with `opacity`

## Next Steps

1. Replace `/hero-rooftop.jpg` with your high-res image (1920x1080 recommended)
2. Replace `/logo.png` with your logo
3. Customize colors in Tailwind config if needed
4. Add your navigation links in the `children` prop
5. Test on mobile devices and adjust speeds if needed

## Example Integration in Overview.jsx

```jsx
import ParallaxHero from '../components/ParallaxHero';

export default function Overview() {
  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <div className="min-h-screen bg-luxury-ivory">
          <Navbar />
          
          <ParallaxHero
            backgroundImage="/hero-rooftop.jpg"
            logo="/logo.png"
            title="THE HOLLYWOOD"
          >
            <div className="flex items-center justify-center space-x-4 text-xs tracking-[0.25em] uppercase mt-8">
              <a href="#hours">Hours</a>
              <span className="text-luxury-gold">—</span>
              <a href="#menus">Menus</a>
              <span className="text-luxury-gold">—</span>
              <a href="#events">Events</a>
            </div>
          </ParallaxHero>
          
          {/* Rest of your sections */}
        </div>
      </div>
    </div>
  );
}
```

---

**Built with ❤️ for luxury experiences**
