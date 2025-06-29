# Website Performance Optimization Plan

## Current Performance Analysis

### 1. Loading Speed Issues Identified

#### Critical Bottlenecks:
- **Font Loading**: Multiple font files (8+ font faces) loaded synchronously
- **Image Assets**: Large unoptimized images in art gallery (JPG files up to potentially 2-5MB each)
- **CSS Bundle Size**: Single large CSS file with unused styles
- **JavaScript Execution**: Heavy DOM manipulation in custom elements
- **Background Assets**: SVG background tiles loaded on every page

#### Current Estimated Metrics:
- **Page Load Time**: 4-6 seconds (exceeds 3s target)
- **First Contentful Paint**: 2-3 seconds
- **Largest Contentful Paint**: 3-5 seconds
- **Cumulative Layout Shift**: High due to font swapping

### 2. Performance Issues by Component

#### Navigation (site-navbar):
- **Problem**: Complex scroll/mouse event handlers firing frequently
- **Impact**: Potential frame drops during scroll
- **Current FPS**: Likely 45-55 FPS during scroll

#### Homepage Animations:
- **Problem**: Multiple CSS animations running simultaneously
- **Impact**: High CPU usage on lower-end devices
- **Sprite Animations**: Multiple elements with `steps()` animations

#### Image Gallery:
- **Problem**: All images loaded immediately, no lazy loading
- **Impact**: Massive initial payload (20+ images)

## Optimization Strategy

### Phase 1: Immediate Fixes (Week 1)

#### 1.1 Font Optimization
```css
/* Implement font-display: swap for all fonts */
@font-face {
  font-family: 'Iosevka';
  src: url('assets/fonts/Iosevka-Bold.woff2') format('woff2');
  font-display: swap; /* Add this to all font faces */
  font-weight: bold;
}

/* Preload critical fonts only */
<link rel="preload" href="assets/fonts/Iosevka-Bold.woff2" as="font" type="font/woff2" crossorigin>
```

#### 1.2 Image Optimization
- Convert all JPG art pieces to WebP (already partially done)
- Implement responsive images with srcset
- Add lazy loading to gallery images
- Compress images to 80% quality

#### 1.3 CSS Optimization
- Split CSS into critical and non-critical
- Inline critical CSS for above-the-fold content
- Defer non-critical CSS loading

### Phase 2: Performance Improvements (Week 2)

#### 2.1 JavaScript Optimization
```javascript
// Optimize scroll handlers with passive listeners
window.addEventListener("scroll", debounce(this.#onScroll), { passive: true });

// Use Intersection Observer for animations
const animationObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
}, { rootMargin: '50px' });
```

#### 2.2 Animation Optimization
- Use `transform` and `opacity` only for animations
- Implement `will-change` property strategically
- Use CSS containment for isolated components

### Phase 3: Advanced Optimizations (Week 3-4)

#### 3.1 Resource Loading Strategy
```html
<!-- Critical resource hints -->
<link rel="dns-prefetch" href="//fonts.googleapis.com">
<link rel="preconnect" href="//fonts.gstatic.com" crossorigin>

<!-- Lazy load non-critical components -->
<script type="module">
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        import('./components/github-heatmap/github-heatmap.js');
      }
    });
  });
</script>
```

#### 3.2 Bundle Optimization
- Implement code splitting for components
- Use dynamic imports for non-critical features
- Tree-shake unused CSS

## Specific Recommendations

### 1. Font Loading Strategy
**Current**: 8 font files loaded synchronously
**Target**: 2-3 critical fonts with font-display: swap
**Expected Improvement**: 1-2 seconds faster FCP

### 2. Image Optimization
**Current**: ~20 large images loaded immediately
**Target**: Lazy-loaded WebP images with placeholders
**Expected Improvement**: 60-80% reduction in initial payload

### 3. JavaScript Performance
**Current**: Heavy DOM manipulation on scroll
**Target**: Optimized event handlers with RAF throttling
**Expected Improvement**: Consistent 60 FPS scrolling

### 4. CSS Optimization
**Current**: Single large CSS file
**Target**: Critical CSS inline, rest deferred
**Expected Improvement**: 0.5-1 second faster rendering

## Implementation Priority

### High Priority (Immediate Impact):
1. Add `font-display: swap` to all fonts
2. Implement lazy loading for gallery images
3. Optimize scroll event handlers
4. Compress and convert images to WebP

### Medium Priority (Week 2):
1. Split CSS into critical/non-critical
2. Implement Intersection Observer for animations
3. Add resource hints and preloading
4. Optimize sprite animations

### Low Priority (Long-term):
1. Implement service worker for caching
2. Add performance monitoring
3. Consider CDN for static assets
4. Implement progressive enhancement

## Expected Results

### Target Metrics:
- **Page Load Time**: < 3 seconds
- **First Contentful Paint**: < 1.5 seconds
- **Largest Contentful Paint**: < 2.5 seconds
- **Cumulative Layout Shift**: < 0.1
- **Scroll Performance**: Consistent 60 FPS
- **Interaction Response**: < 100ms

### Performance Budget:
- **JavaScript**: < 200KB compressed
- **CSS**: < 50KB critical, < 100KB total
- **Images**: < 500KB initial load
- **Fonts**: < 100KB critical fonts

## Monitoring and Testing

### Tools to Use:
1. **Lighthouse** - Overall performance scoring
2. **WebPageTest** - Detailed loading analysis
3. **Chrome DevTools** - Performance profiling
4. **Core Web Vitals** - User experience metrics

### Key Metrics to Track:
- Page load time across different devices
- Frame rate during scroll and animations
- Memory usage over time
- Network payload size
- Time to interactive

This optimization plan should improve your website's performance significantly, targeting the 3-second load time and 60 FPS smooth interactions you're aiming for.