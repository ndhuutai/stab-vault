/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import PathEditorContext from '../../contexts/path-editor-context';
import { addCollection } from '../../actions/path-editor';
import styles from './collection-expand-view.css';

const ExpandedCollectionView = ({ i, expanded, setExpanded }) => {
  // if you change the variable i to anything else it breaks. i don't know why.
  const isOpen = i === expanded;
  const {
    collectionID, title, description, category,
  } = i;
  const history = useHistory();
  const { dispatch } = useContext(PathEditorContext);

  const handleUse = () => {
    dispatch(
      addCollection({
        _id: collectionID,
        title,
        description,
        category,
      }),
    );
    history.push('/path-editor');
  };

  return (
    <div className={styles.CollectionItem}>
      <motion.header
        className={styles.CollectionHeader}
        initial={false}
        animate={{ backgroundColor: isOpen ? '#3F3D56' : '#3F3D56' }}
        onClick={() => setExpanded(isOpen ? false : i)}
      >
        <h3>{title}</h3>
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
            <motion.div transition={{ duration: 0.8 }} className={styles.CollectionView}>
              <p>{description}</p>
              <button className={styles.Button} onClick={handleUse} type="button">
                Use
              </button>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExpandedCollectionView;
