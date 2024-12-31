// src/components/PageTransition.js
import { motion } from 'framer-motion';

const PageTransition = ({ children }) => {
    const variants = {
        initial: {
            opacity: 0,
            x: '-100vw',
        },
        animate: {
            opacity: 1,
            x: 0,
            transition: {
                type: 'spring',
                stiffness: 50,
                damping: 20,
                duration: 0.5
            },
        },
        exit: {
            opacity: 0,
            x: '100vw',
            transition: {
                type: 'spring',
                stiffness: 50,
                damping: 20,
                duration: 0.5
            },
        },
    };

    return (
        <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            style={{ position: 'absolute', width: '100%' }} // Điều chỉnh kích thước để khớp với trang
        >
            {children}
        </motion.div>
    );
};

export default PageTransition;
