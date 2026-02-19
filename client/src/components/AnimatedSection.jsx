import useScrollAnimation from '../hooks/useScrollAnimation';

/**
 * Wrapper that animates its children into view on scroll.
 *
 * @param {string}  animation   - CSS class to apply ('fade-in-up' | 'fade-in' | 'slide-in-left' | 'slide-in-right' | 'scale-in' | 'blur-in')
 * @param {number}  delay       - delay in ms before animation starts
 * @param {number}  threshold   - 0-1 visibility threshold
 * @param {string}  className   - extra classes
 * @param {boolean} stagger     - if true, staggers children with --i CSS variable
 */
const AnimatedSection = ({
    children,
    animation = 'fade-in-up',
    delay = 0,
    threshold = 0.15,
    className = '',
    as: Tag = 'div',
    stagger = false,
    ...props
}) => {
    const [ref, isVisible] = useScrollAnimation({ threshold });

    return (
        <Tag
            ref={ref}
            className={`scroll-animated ${isVisible ? `animate-visible ${animation}` : 'animate-hidden'} ${stagger ? 'stagger-children' : ''} ${className}`}
            style={{ animationDelay: `${delay}ms`, transitionDelay: `${delay}ms` }}
            {...props}
        >
            {children}
        </Tag>
    );
};

export default AnimatedSection;
