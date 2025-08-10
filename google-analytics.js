// Google Analytics 4 Integration - Professional Implementation
// Tracking ID: G-JDNRWYXLDV

(function() {
    'use strict';
    
    // Google Analytics Base Code
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-JDNRWYXLDV', {
        // Enhanced measurement settings
        send_page_view: true,
        anonymize_ip: true,
        allow_ad_features: true,
        cookie_flags: 'SameSite=None;Secure'
    });
    
    // Custom tracking functions
    window.trackGAFunnelProgress = function(step, pageName) {
        gtag('event', 'funnel_progress', {
            'step_name': step,
            'page_name': pageName,
            'funnel_type': 'marketing_consultation',
            'event_category': 'Funnel',
            'event_label': step + '_' + pageName
        });
    };
    
    window.trackGAVideoEngagement = function(action, duration) {
        gtag('event', 'video_engagement', {
            'video_action': action,
            'video_duration': duration || 0,
            'video_title': 'Sales_Video_Nacho',
            'event_category': 'Video',
            'event_label': action
        });
    };
    
    window.trackGAWhatsAppClick = function() {
        // Track as conversion
        gtag('event', 'conversion', {
            'send_to': 'G-JDNRWYXLDV',
            'event_category': 'Lead_Generation',
            'event_label': 'WhatsApp_Contact'
        });
        
        // Track as generate_lead
        gtag('event', 'generate_lead', {
            'currency': 'CLP',
            'value': 249000, // Potential service value
            'lead_source': 'funnel_completion',
            'contact_method': 'whatsapp'
        });
    };
    
    window.trackGALogosEngagement = function() {
        gtag('event', 'engagement', {
            'engagement_type': 'client_logos_view',
            'engagement_time_msec': 3000,
            'event_category': 'Social_Proof',
            'event_label': 'Client_Showcase'
        });
    };
    
    window.trackGAScrollDepth = function(percentage) {
        gtag('event', 'scroll', {
            'scroll_depth': percentage,
            'page_location': window.location.href,
            'page_title': document.title,
            'event_category': 'Engagement',
            'event_label': 'Scroll_' + percentage + '%'
        });
    };
    
    window.trackGATimeOnPage = function(seconds) {
        gtag('event', 'timing_complete', {
            'name': 'time_on_page',
            'value': seconds * 1000, // Convert to milliseconds
            'event_category': 'Engagement',
            'event_label': 'Time_' + seconds + 's'
        });
    };
    
    window.trackGAButtonClick = function(buttonName, stepName) {
        gtag('event', 'click', {
            'button_name': buttonName,
            'step_name': stepName,
            'event_category': 'CTA',
            'event_label': buttonName + '_' + stepName
        });
    };
    
    // Auto-track scroll depth
    let maxScrollGA = 0;
    let scrollTrackedGA = {25: false, 50: false, 75: false, 100: false};
    
    function trackScrollDepthGA() {
        const scrollPercent = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
        maxScrollGA = Math.max(maxScrollGA, scrollPercent);
        
        [25, 50, 75, 100].forEach(threshold => {
            if (scrollPercent >= threshold && !scrollTrackedGA[threshold]) {
                scrollTrackedGA[threshold] = true;
                if (typeof trackGAScrollDepth === 'function') {
                    trackGAScrollDepth(threshold);
                }
            }
        });
    }
    
    // Throttled scroll tracking
    let scrollTimerGA = null;
    window.addEventListener('scroll', function() {
        if (scrollTimerGA) clearTimeout(scrollTimerGA);
        scrollTimerGA = setTimeout(trackScrollDepthGA, 250);
    });
    
    // Track time on page
    const startTimeGA = Date.now();
    let timeTrackedGA = {30: false, 60: false, 120: false, 300: false};
    
    setInterval(function() {
        const timeOnPageGA = Math.floor((Date.now() - startTimeGA) / 1000);
        
        [30, 60, 120, 300].forEach(threshold => {
            if (timeOnPageGA >= threshold && !timeTrackedGA[threshold]) {
                timeTrackedGA[threshold] = true;
                if (typeof trackGATimeOnPage === 'function') {
                    trackGATimeOnPage(threshold);
                }
            }
        });
    }, 10000); // Check every 10 seconds
    
    // Enhanced ecommerce tracking for consultation service
    window.trackGAServiceInterest = function() {
        gtag('event', 'add_to_cart', {
            'currency': 'CLP',
            'value': 249000,
            'items': [{
                'item_id': 'marketing_consultation',
                'item_name': 'Consulta Directa con Nacho',
                'category': 'Marketing Services',
                'quantity': 1,
                'price': 249000
            }]
        });
    };
    
    // Track page performance
    window.addEventListener('load', function() {
        gtag('event', 'page_view', {
            'page_title': document.title,
            'page_location': window.location.href,
            'content_group1': 'Marketing Funnel',
            'content_group2': getStepName()
        });
    });
    
    function getStepName() {
        const path = window.location.pathname;
        if (path.includes('index') || path === '/') return 'Landing_Page';
        if (path.includes('step2d')) return 'Client_Logos';
        if (path.includes('step3')) return 'Video_Page';
        if (path.includes('step4')) return 'Final_Contact';
        if (path.includes('step2')) return 'Personal_Photo';
        return 'Unknown';
    }
    
})();