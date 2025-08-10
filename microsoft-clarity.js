// Microsoft Clarity Integration - Professional Implementation
// Project ID: ssuk6qnfjr

(function() {
    'use strict';
    
    // Microsoft Clarity Base Code
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "ssuk6qnfjr");
    
    // Custom tracking functions for Clarity
    window.trackClarityFunnelProgress = function(step, pageName) {
        if (typeof clarity === 'function') {
            clarity('set', 'funnel_step', step);
            clarity('set', 'page_name', pageName);
            clarity('event', 'funnel_progress', {
                step: step,
                page: pageName,
                timestamp: new Date().getTime()
            });
        }
    };
    
    window.trackClarityVideoEngagement = function(action, duration) {
        if (typeof clarity === 'function') {
            clarity('set', 'video_action', action);
            clarity('event', 'video_engagement', {
                action: action,
                duration: duration || 0,
                video_title: 'nacho_sales_video'
            });
        }
    };
    
    window.trackClarityWhatsAppClick = function() {
        if (typeof clarity === 'function') {
            clarity('set', 'conversion_type', 'whatsapp_lead');
            clarity('event', 'whatsapp_conversion', {
                source: 'final_page',
                contact_method: 'whatsapp',
                conversion_value: 'high_intent'
            });
        }
    };
    
    window.trackClarityLogosEngagement = function() {
        if (typeof clarity === 'function') {
            clarity('event', 'social_proof_engagement', {
                element_type: 'client_logos',
                engagement_time: 3000,
                social_proof_type: 'client_showcase'
            });
        }
    };
    
    window.trackClarityButtonClick = function(buttonName, stepName) {
        if (typeof clarity === 'function') {
            clarity('event', 'cta_click', {
                button_name: buttonName,
                step_name: stepName,
                button_type: 'primary_cta'
            });
        }
    };
    
    window.trackClarityPsychologyReaction = function(reaction) {
        if (typeof clarity === 'function') {
            clarity('event', 'psychology_engagement', {
                reaction_type: reaction,
                engagement_level: 'high',
                psychology_technique: 'transparency_paradox'
            });
        }
    };
    
    // Auto-identify user segments based on behavior
    function identifyUserSegment() {
        const currentHour = new Date().getHours();
        const isWeekend = [0, 6].includes(new Date().getDay());
        const isMobile = window.innerWidth <= 768;
        
        let segment = [];
        
        if (currentHour >= 9 && currentHour <= 17) segment.push('business_hours');
        else if (currentHour >= 18 && currentHour <= 22) segment.push('evening_browser');
        else segment.push('night_owl');
        
        if (isWeekend) segment.push('weekend_visitor');
        else segment.push('weekday_visitor');
        
        if (isMobile) segment.push('mobile_user');
        else segment.push('desktop_user');
        
        if (typeof clarity === 'function') {
            clarity('set', 'user_segment', segment.join('_'));
            clarity('set', 'device_type', isMobile ? 'mobile' : 'desktop');
            clarity('set', 'visit_time', currentHour);
        }
    }
    
    // Track high-value interactions for session replay prioritization
    window.trackHighValueInteraction = function(interactionType) {
        if (typeof clarity === 'function') {
            clarity('set', 'high_value_session', 'true');
            clarity('event', 'high_value_interaction', {
                interaction: interactionType,
                priority: 'high'
            });
        }
    };
    
    // Track scroll patterns specific to funnel analysis
    let scrollEvents = [];
    let lastScrollTime = 0;
    
    function trackScrollPattern() {
        const now = Date.now();
        const scrollTop = window.scrollY;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = Math.round((scrollTop / documentHeight) * 100);
        
        if (now - lastScrollTime > 1000) { // Track significant scroll events
            scrollEvents.push({
                percent: scrollPercent,
                time: now,
                speed: 'normal'
            });
            
            // Detect reading vs scanning behavior
            if (scrollEvents.length > 3) {
                const recentEvents = scrollEvents.slice(-3);
                const avgScrollSpeed = recentEvents.reduce((acc, curr, idx) => {
                    if (idx === 0) return 0;
                    return acc + (curr.percent - recentEvents[idx-1].percent);
                }, 0) / 2;
                
                let scrollBehavior = 'normal';
                if (avgScrollSpeed > 15) scrollBehavior = 'scanning';
                else if (avgScrollSpeed < 5) scrollBehavior = 'reading';
                
                if (typeof clarity === 'function') {
                    clarity('set', 'scroll_behavior', scrollBehavior);
                }
            }
            
            lastScrollTime = now;
        }
    }
    
    // Throttled scroll tracking
    let scrollTimer = null;
    window.addEventListener('scroll', function() {
        if (scrollTimer) clearTimeout(scrollTimer);
        scrollTimer = setTimeout(trackScrollPattern, 500);
    });
    
    // Track rage clicks (frustration indicator)
    let clickCounts = {};
    document.addEventListener('click', function(e) {
        const element = e.target;
        const elementId = element.id || element.className || element.tagName;
        
        if (!clickCounts[elementId]) {
            clickCounts[elementId] = { count: 0, lastClick: 0 };
        }
        
        const now = Date.now();
        if (now - clickCounts[elementId].lastClick < 1000) {
            clickCounts[elementId].count++;
            if (clickCounts[elementId].count >= 3) {
                // Rage click detected
                if (typeof clarity === 'function') {
                    clarity('event', 'rage_click', {
                        element: elementId,
                        click_count: clickCounts[elementId].count,
                        frustration_level: 'high'
                    });
                }
            }
        } else {
            clickCounts[elementId].count = 1;
        }
        
        clickCounts[elementId].lastClick = now;
    });
    
    // Initialize user segmentation
    window.addEventListener('load', function() {
        setTimeout(identifyUserSegment, 1000);
        
        // Set page-specific tags
        const pageName = getPageName();
        if (typeof clarity === 'function') {
            clarity('set', 'page_type', pageName);
            clarity('set', 'funnel_version', 'v1.0');
            clarity('set', 'marketing_campaign', 'organic_funnel');
        }
    });
    
    function getPageName() {
        const path = window.location.pathname;
        if (path.includes('index') || path === '/') return 'landing_page';
        if (path.includes('step2d')) return 'client_logos';
        if (path.includes('step3')) return 'video_page';
        if (path.includes('step4')) return 'final_contact';
        if (path.includes('step2')) return 'personal_photo';
        return 'unknown';
    }
    
    // Track exit intent
    document.addEventListener('mouseleave', function(e) {
        if (e.clientY < 0) {
            if (typeof clarity === 'function') {
                clarity('event', 'exit_intent', {
                    page: getPageName(),
                    time_on_page: Math.floor((Date.now() - performance.timing.navigationStart) / 1000)
                });
            }
        }
    });
    
})();