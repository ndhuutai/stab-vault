import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import styles from './path-expand-view.css';

const ExpandedPathView = ({ i, expanded, setExpanded }) => {
  // if you change the variable i to anything else it breaks. i don't know why.
  const isOpen = i === expanded;
  const {
    name, description,
  } = i;

  return (
    <div className={styles.PathItem}>
      <motion.header
        className={styles.PathHeader}
        initial={false}
        animate={{ backgroundColor: isOpen ? '#f5f7fa' : '#f5f7fa' }}
        onClick={() => setExpanded(isOpen ? false : i)}
      >
        <h3>{name}</h3>
      </motion.header>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <motion.div transition={{ duration: 0.8 }} className={styles.PathView}>
              <p>{description}</p>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExpandedPathView;
