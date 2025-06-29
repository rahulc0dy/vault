// Performance Optimization Implementation
// This file contains the immediate fixes that can be applied

// 1. Optimized Debounce Function with RAF
function optimizedDebounce(fn, ms = 0) {
  let rafId = null;
  let timeoutId = null;
  
  return (...args) => {
    // Cancel previous calls
    if (rafId) cancelAnimationFrame(rafId);
    if (timeoutId) clearTimeout(timeoutId);
    
    if (ms === 0) {
      rafId = requestAnimationFrame(() => fn(...args));
    } else {
      timeoutId = setTimeout(() => {
        rafId = requestAnimationFrame(() => fn(...args));
      }, ms);
    }
  };
}

// 2. Intersection Observer for Lazy Loading
class LazyLoader {
  constructor() {
    this.imageObserver = new IntersectionObserver(
      this.handleImageIntersection.bind(this),
      {
        rootMargin: '50px 0px',
        threshold: 0.01
      }
    );
    
    this.componentObserver = new IntersectionObserver(
      this.handleComponentIntersection.bind(this),
      {
        rootMargin: '100px 0px',
        threshold: 0.01
      }
    );
  }
  
  handleImageIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        
        // Load high-quality image
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        
        // Load srcset if available
        if (img.dataset.srcset) {
          img.srcset = img.dataset.srcset;
          img.removeAttribute('data-srcset');
        }
        
        img.classList.add('loaded');
        this.imageObserver.unobserve(img);
      }
    });
  }
  
  handleComponentIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const componentName = element.tagName.toLowerCase();
        
        // Dynamic import for components
        import(`./components/${componentName}/${componentName}.js`)
          .then(() => {
            element.classList.add('component-loaded');
          })
          .catch(err => console.warn(`Failed to load ${componentName}:`, err));
        
        this.componentObserver.unobserve(element);
      }
    });
  }
  
  observeImages() {
    document.querySelectorAll('img[data-src]').forEach(img => {
      this.imageObserver.observe(img);
    });
  }
  
  observeComponents() {
    const components = ['github-heatmap', 'project-card', 'blog-header'];
    components.forEach(componentName => {
      document.querySelectorAll(componentName).forEach(element => {
        this.componentObserver.observe(element);
      });
    });
  }
}

// 3. Performance-Optimized Animation Controller
class AnimationController {
  constructor() {
    this.animations = new Map();
    this.rafId = null;
    this.isRunning = false;
  }
  
  addAnimation(element, animationFn) {
    const id = Symbol('animation');
    this.animations.set(id, { element, animationFn, active: true });
    
    if (!this.isRunning) {
      this.start();
    }
    
    return id;
  }
  
  removeAnimation(id) {
    this.animations.delete(id);
    
    if (this.animations.size === 0) {
      this.stop();
    }
  }
  
  start() {
    this.isRunning = true;
    this.tick();
  }
  
  stop() {
    this.isRunning = false;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }
  
  tick() {
    if (!this.isRunning) return;
    
    // Use DocumentFragment for batch DOM updates
    const fragment = document.createDocumentFragment();
    
    this.animations.forEach(({ element, animationFn, active }, id) => {
      if (active && this.isElementVisible(element)) {
        animationFn(element);
      }
    });
    
    this.rafId = requestAnimationFrame(() => this.tick());
  }
  
  isElementVisible(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top < window.innerHeight &&
      rect.bottom > 0 &&
      rect.left < window.innerWidth &&
      rect.right > 0
    );
  }
}

// 4. Resource Loading Optimizer
class ResourceOptimizer {
  constructor() {
    this.criticalResources = new Set();
    this.deferredResources = new Set();
  }
  
  preloadCriticalFonts() {
    const criticalFonts = [
      'assets/fonts/Iosevka-Bold.woff2',
      'assets/fonts/SpaceMono-Regular.ttf'
    ];
    
    criticalFonts.forEach(fontUrl => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = fontUrl;
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  }
  
  loadDeferredCSS() {
    const deferredCSS = [
      'components/github-heatmap/github-heatmap.css',
      'components/project-card/project-card.css'
    ];
    
    // Load after critical rendering
    requestIdleCallback(() => {
      deferredCSS.forEach(cssUrl => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = cssUrl;
        document.head.appendChild(link);
      });
    });
  }
  
  optimizeImages() {
    // Convert lazy loading setup
    document.querySelectorAll('img').forEach(img => {
      if (img.loading !== 'lazy' && !this.isAboveFold(img)) {
        img.loading = 'lazy';
        
        // Add low-quality placeholder
        if (!img.src.includes('data:')) {
          const placeholder = this.generatePlaceholder(img);
          img.dataset.src = img.src;
          img.src = placeholder;
        }
      }
    });
  }
  
  isAboveFold(element) {
    const rect = element.getBoundingClientRect();
    return rect.top < window.innerHeight;
  }
  
  generatePlaceholder(img) {
    // Generate a tiny base64 placeholder
    const canvas = document.createElement('canvas');
    canvas.width = 10;
    canvas.height = 10;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#B9DDDA20';
    ctx.fillRect(0, 0, 10, 10);
    return canvas.toDataURL();
  }
}

// 5. Initialize Performance Optimizations
document.addEventListener('DOMContentLoaded', () => {
  const lazyLoader = new LazyLoader();
  const animationController = new AnimationController();
  const resourceOptimizer = new ResourceOptimizer();
  
  // Initialize optimizations
  lazyLoader.observeImages();
  lazyLoader.observeComponents();
  resourceOptimizer.preloadCriticalFonts();
  resourceOptimizer.loadDeferredCSS();
  resourceOptimizer.optimizeImages();
  
  // Performance monitoring
  if ('performance' in window) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log('Performance Metrics:', {
          'Page Load Time': perfData.loadEventEnd - perfData.fetchStart,
          'DOM Content Loaded': perfData.domContentLoadedEventEnd - perfData.fetchStart,
          'First Paint': performance.getEntriesByType('paint')[0]?.startTime || 'N/A'
        });
      }, 0);
    });
  }
});

// Export for use in other modules
export { optimizedDebounce, LazyLoader, AnimationController, ResourceOptimizer };