// src/components/PageTransition.js
import { motion } from 'framer-motion';

const PageTransitionV2 = ({ children }) => {
    const variants = {
        initial: {
            opacity: 0,
            y: '100vh',
        },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'tween',
                ease: 'easeOut',
                duration: 0.5,  // Adjust duration to make it faster
            },
        },
        exit: {
            opacity: 0,
            y: '-100vh',
            transition: {
                type: 'tween',
                ease: 'easeIn',
                duration: 0.5,  // Adjust duration to make it faster
            },
        },
    };

    return (
        <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
        >
            {children}
        </motion.div>
    );
};

export default PageTransitionV2;
