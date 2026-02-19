import { useEffect, useRef, useState } from 'react';

/**
 * Triggers a CSS animation when the element scrolls into view.
 * @param {object} options
 * @param {number} options.threshold - 0–1, how much of the element must be visible (default 0.15)
 * @param {string} options.rootMargin - IntersectionObserver root margin (default '0px 0px -40px 0px')
 * @param {boolean} options.once - only animate once (default true)
 */
const useScrollAnimation = ({ threshold = 0.15, rootMargin = '0px 0px -40px 0px', once = true } = {}) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (once) observer.unobserve(node);
                } else if (!once) {
                    setIsVisible(false);
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, [threshold, rootMargin, once]);

    return [ref, isVisible];
};

export default useScrollAnimation;
