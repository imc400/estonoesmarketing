// Meta Pixel Integration - Professional Implementation
// Pixel ID: 1010716157553975

(function() {
    'use strict';
    
    // Meta Pixel Base Code
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    
    // Initialize pixel
    fbq('init', '1010716157553975');
    
    // Track PageView
    fbq('track', 'PageView');
    
    // Custom tracking functions
    window.trackFunnelProgress = function(step, pageName) {
        fbq('trackCustom', 'FunnelProgress', {
            step: step,
            page: pageName,
            timestamp: new Date().getTime()
        });
    };
    
    window.trackVideoEngagement = function(action, duration) {
        fbq('trackCustom', 'VideoEngagement', {
            action: action,
            duration: duration || 0
        });
    };
    
    window.trackWhatsAppClick = function() {
        fbq('track', 'Contact');
        fbq('trackCustom', 'WhatsAppClick', {
            source: 'final_page'
        });
    };
    
    window.trackLogosEngagement = function() {
        fbq('trackCustom', 'LogosEngagement', {
            section: 'client_showcase'
        });
    };
    
    // Auto-track scroll depth
    let maxScroll = 0;
    let scrollTracked = {25: false, 50: false, 75: false, 100: false};
    
    function trackScrollDepth() {
        const scrollPercent = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
        maxScroll = Math.max(maxScroll, scrollPercent);
        
        [25, 50, 75, 100].forEach(threshold => {
            if (scrollPercent >= threshold && !scrollTracked[threshold]) {
                scrollTracked[threshold] = true;
                fbq('trackCustom', 'ScrollDepth', {
                    percentage: threshold,
                    page: window.location.pathname
                });
            }
        });
    }
    
    // Throttled scroll tracking
    let scrollTimer = null;
    window.addEventListener('scroll', function() {
        if (scrollTimer) clearTimeout(scrollTimer);
        scrollTimer = setTimeout(trackScrollDepth, 250);
    });
    
    // Track time on page
    const startTime = Date.now();
    let timeTracked = {30: false, 60: false, 120: false, 300: false};
    
    setInterval(function() {
        const timeOnPage = Math.floor((Date.now() - startTime) / 1000);
        
        [30, 60, 120, 300].forEach(threshold => {
            if (timeOnPage >= threshold && !timeTracked[threshold]) {
                timeTracked[threshold] = true;
                fbq('trackCustom', 'TimeOnPage', {
                    seconds: threshold,
                    page: window.location.pathname
                });
            }
        });
    }, 10000); // Check every 10 seconds
    
})();