// Performance Monitoring and Analytics
class PerformanceMonitor {
  constructor() {
    this.metrics = {};
    this.observers = [];
    this.init();
  }
  
  init() {
    // Core Web Vitals monitoring
    this.measureCoreWebVitals();
    
    // Custom performance metrics
    this.measureCustomMetrics();
    
    // Resource loading monitoring
    this.monitorResourceLoading();
    
    // User interaction monitoring
    this.monitorInteractions();
  }
  
  measureCoreWebVitals() {
    // Largest Contentful Paint (LCP)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.metrics.lcp = lastEntry.startTime;
      console.log('LCP:', lastEntry.startTime);
    }).observe({ entryTypes: ['largest-contentful-paint'] });
    
    // First Input Delay (FID)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach(entry => {
        this.metrics.fid = entry.processingStart - entry.startTime;
        console.log('FID:', entry.processingStart - entry.startTime);
      });
    }).observe({ entryTypes: ['first-input'] });
    
    // Cumulative Layout Shift (CLS)
    let clsValue = 0;
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
      this.metrics.cls = clsValue;
      console.log('CLS:', clsValue);
    }).observe({ entryTypes: ['layout-shift'] });
  }
  
  measureCustomMetrics() {
    // Time to Interactive (TTI)
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navTiming = performance.getEntriesByType('navigation')[0];
        this.metrics.tti = navTiming.domInteractive - navTiming.fetchStart;
        console.log('TTI:', this.metrics.tti);
      }, 0);
    });
    
    // Hero section render time
    const heroObserver = new PerformanceObserver((entryList) => {
      entryList.getEntries().forEach(entry => {
        if (entry.name.includes('hero-section')) {
          this.metrics.heroRenderTime = entry.startTime;
          console.log('Hero Render Time:', entry.startTime);
        }
      });
    });
    heroObserver.observe({ entryTypes: ['measure'] });
    
    // Mark hero section rendering
    const heroSection = document.getElementById('hero-section');
    if (heroSection) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            performance.mark('hero-visible');
            performance.measure('hero-render-time', 'navigationStart', 'hero-visible');
            observer.disconnect();
          }
        });
      });
      observer.observe(heroSection);
    }
  }
  
  monitorResourceLoading() {
    // Monitor font loading
    if ('fonts' in document) {
      document.fonts.ready.then(() => {
        this.metrics.fontsLoaded = performance.now();
        console.log('Fonts loaded at:', this.metrics.fontsLoaded);
      });
    }
    
    // Monitor image loading
    const images = document.querySelectorAll('img');
    let imagesLoaded = 0;
    const totalImages = images.length;
    
    images.forEach(img => {
      if (img.complete) {
        imagesLoaded++;
      } else {
        img.addEventListener('load', () => {
          imagesLoaded++;
          if (imagesLoaded === totalImages) {
            this.metrics.allImagesLoaded = performance.now();
            console.log('All images loaded at:', this.metrics.allImagesLoaded);
          }
        });
      }
    });
  }
  
  monitorInteractions() {
    // Scroll performance
    let scrollStart = null;
    let frameCount = 0;
    
    const measureScrollFPS = () => {
      frameCount++;
      if (scrollStart && performance.now() - scrollStart >= 1000) {
        const fps = frameCount;
        this.metrics.scrollFPS = fps;
        console.log('Scroll FPS:', fps);
        frameCount = 0;
        scrollStart = performance.now();
      }
      requestAnimationFrame(measureScrollFPS);
    };
    
    window.addEventListener('scroll', () => {
      if (!scrollStart) {
        scrollStart = performance.now();
        requestAnimationFrame(measureScrollFPS);
      }
    }, { passive: true });
    
    // Click response time
    document.addEventListener('click', (event) => {
      const clickTime = performance.now();
      
      // Measure time to visual feedback
      requestAnimationFrame(() => {
        const responseTime = performance.now() - clickTime;
        this.metrics.clickResponseTime = responseTime;
        console.log('Click response time:', responseTime);
      });
    });
  }
  
  // Memory usage monitoring
  monitorMemoryUsage() {
    if ('memory' in performance) {
      setInterval(() => {
        const memInfo = performance.memory;
        this.metrics.memoryUsage = {
          used: memInfo.usedJSHeapSize,
          total: memInfo.totalJSHeapSize,
          limit: memInfo.jsHeapSizeLimit
        };
        
        // Warn if memory usage is high
        const usagePercent = (memInfo.usedJSHeapSize / memInfo.jsHeapSizeLimit) * 100;
        if (usagePercent > 80) {
          console.warn('High memory usage detected:', usagePercent.toFixed(2) + '%');
        }
      }, 5000);
    }
  }
  
  // Generate performance report
  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      metrics: this.metrics,
      recommendations: this.generateRecommendations()
    };
    
    console.table(this.metrics);
    return report;
  }
  
  generateRecommendations() {
    const recommendations = [];
    
    if (this.metrics.lcp > 2500) {
      recommendations.push('LCP is slow - optimize largest contentful paint element');
    }
    
    if (this.metrics.fid > 100) {
      recommendations.push('FID is high - reduce JavaScript execution time');
    }
    
    if (this.metrics.cls > 0.1) {
      recommendations.push('CLS is high - prevent layout shifts');
    }
    
    if (this.metrics.scrollFPS < 55) {
      recommendations.push('Scroll performance is poor - optimize animations');
    }
    
    return recommendations;
  }
  
  // Send metrics to analytics (placeholder)
  sendMetrics() {
    const report = this.generateReport();
    
    // In a real implementation, you would send this to your analytics service
    console.log('Performance Report:', report);
    
    // Example: Send to Google Analytics 4
    // gtag('event', 'performance_metrics', {
    //   custom_parameter_lcp: this.metrics.lcp,
    //   custom_parameter_fid: this.metrics.fid,
    //   custom_parameter_cls: this.metrics.cls
    // });
  }
}

// Initialize performance monitoring
const performanceMonitor = new PerformanceMonitor();

// Generate report after page load
window.addEventListener('load', () => {
  setTimeout(() => {
    performanceMonitor.sendMetrics();
  }, 2000);
});

export default PerformanceMonitor;