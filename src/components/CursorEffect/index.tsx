// src/components/CursorEffect/index.tsx
import React, { useEffect, useRef } from 'react';
import styles from './styles.module.css';

const CursorEffect: React.FC = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const cursorDotRef = useRef<HTMLDivElement>(null);
    const trailsRef = useRef<HTMLDivElement[]>([]);
    const mousePos = useRef({ x: 0, y: 0 });
    const cursorPos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        // Don't run on mobile devices
        if ('ontouchstart' in window) return;

        const handleMouseMove = (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY };

            // Update dot position immediately
            if (cursorDotRef.current) {
                cursorDotRef.current.style.left = `${e.clientX}px`;
                cursorDotRef.current.style.top = `${e.clientY}px`;
            }
        };

        const handleMouseDown = () => {
            if (cursorRef.current) {
                cursorRef.current.classList.add(styles.clicking);
            }
            if (cursorDotRef.current) {
                cursorDotRef.current.classList.add(styles.clicking);
            }
        };

        const handleMouseUp = () => {
            if (cursorRef.current) {
                cursorRef.current.classList.remove(styles.clicking);
            }
            if (cursorDotRef.current) {
                cursorDotRef.current.classList.remove(styles.clicking);
            }
        };

        const handleMouseEnterLink = () => {
            if (cursorRef.current) {
                cursorRef.current.classList.add(styles.hovering);
            }
        };

        const handleMouseLeaveLink = () => {
            if (cursorRef.current) {
                cursorRef.current.classList.remove(styles.hovering);
            }
        };

        // Smooth cursor following animation
        const animateCursor = () => {
            const speed = 0.15;
            cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * speed;
            cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * speed;

            if (cursorRef.current) {
                cursorRef.current.style.left = `${cursorPos.current.x}px`;
                cursorRef.current.style.top = `${cursorPos.current.y}px`;
            }

            requestAnimationFrame(animateCursor);
        };

        // Add event listeners
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);

        // Add hover effect for links and buttons
        const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
        interactiveElements.forEach((el) => {
            el.addEventListener('mouseenter', handleMouseEnterLink);
            el.addEventListener('mouseleave', handleMouseLeaveLink);
        });

        // Start animation
        animateCursor();

        // Cleanup
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
            interactiveElements.forEach((el) => {
                el.removeEventListener('mouseenter', handleMouseEnterLink);
                el.removeEventListener('mouseleave', handleMouseLeaveLink);
            });
        };
    }, []);

    // Don't render on mobile
    if (typeof window !== 'undefined' && 'ontouchstart' in window) {
        return null;
    }

    return (
        <>
            {/* Main cursor ring */}
            <div ref={cursorRef} className={styles.cursorRing}>
                <div className={styles.cursorGlow}></div>
            </div>

            {/* Center dot */}
            <div ref={cursorDotRef} className={styles.cursorDot}></div>
        </>
    );
};

export default CursorEffect;
