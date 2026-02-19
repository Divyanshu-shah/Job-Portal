import { useState, useEffect, useRef } from 'react';

/**
 * Animated number counter that counts from 0 to `end`.
 *
 * @param {number|string} end       - target value (can include suffixes like '10K+')
 * @param {number}        duration  - animation duration in ms (default 2000)
 * @param {string}        className - extra CSS classes
 */
const CountUp = ({ end, duration = 2000, className = '', ...props }) => {
    const [count, setCount] = useState(0);
    const [started, setStarted] = useState(false);
    const ref = useRef(null);

    // Parse numeric portion and suffix
    const raw = String(end);
    const match = raw.match(/^([\d.]+)(.*)$/);
    const numericEnd = match ? parseFloat(match[1]) : 0;
    const suffix = match ? match[2] : '';

    useEffect(() => {
        const node = ref.current;
        if (!node) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.unobserve(node); } },
            { threshold: 0.3 }
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!started) return;
        const startTime = performance.now();
        const step = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(eased * numericEnd);
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [started, numericEnd, duration]);

    const display = numericEnd >= 1
        ? Math.round(count) + suffix
        : count.toFixed(1) + suffix;

    return (
        <span ref={ref} className={className} {...props}>
            {display}
        </span>
    );
};

export default CountUp;
