import React, {
  useContext, useEffect, useState, useRef,
} from 'react';

import { useHistory, useLocation } from 'react-router-dom';
import { motion, useMotionValue } from 'framer-motion';
import move from 'array-move';
import findIndex from './find-index';
import styles from './path-editor.style.css';

import PathEditorContext from '../../contexts/path-editor-context';
import { setCollections } from '../../actions/path-editor';

// --- reference only ---
// const initialColors = [
//   ['#FF008C', 'HTML'],
//   ['#D309E1', 'CSS'],
//   ['#9C1AFF', 'Internet'],
//   ['#7700FF', 'Javascript'],
//   ['#9700FF', 'FLEXBOX!'],
// ];

// --- reference only ---
// const initialColors = [['#FF008C'], ['#D309E1'], ['#9C1AFF'], ['#7700FF'], ['#9700FF']];

// --- reference only ---
// const heights = {
//   '#FF008C': 50,
//   '#D309E1': 50,
//   '#9C1AFF': 50,
//   '#7700FF': 50,
//   '#9700FF': 50,
// };

// Spring configs
const onTop = { zIndex: 1 };
const flat = {
  zIndex: 0,
  transition: { delay: 0.3 },
};

const Item = ({
  setPosition, moveItem, i, name,
}) => {
  const [isDragging, setDragging] = useState(false);

  // We'll use a `ref` to access the DOM element that the `motion.li` produces.
  // This will allow us to measure its height and position, which will be useful to
  // decide when a dragging element should switch places with its siblings.
  const ref = useRef(null);

  // By manually creating a reference to `dragOriginY` we can manipulate this value
  // if the user is dragging this DOM element while the drag gesture is active to
  // compensate for any movement as the items are re-positioned.
  const dragOriginY = useMotionValue(0);

  // Update the measured position of the item so we can calculate when we should rearrange.
  useEffect(() => {
    setPosition(i, {
      height: ref.current.offsetHeight,
      top: ref.current.offsetTop,
    });
  });

  return (
    <motion.li
      className={styles.PathEditorItem}
      ref={ref}
      initial={false}
      // If we're dragging, we want to set the zIndex of that item to be on top of the other items.
      animate={isDragging ? onTop : flat}
      style={{ background: '#FF008C', height: 50 }} // background is of the Item
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 1.12 }}
      drag="y"
      dragOriginY={dragOriginY}
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={1}
      onDragStart={() => setDragging(true)}
      onDragEnd={() => setDragging(false)}
      onDrag={(e, { point }) => moveItem(i, point.y)}
      positionTransition={({ delta }) => {
        if (isDragging) {
          // If we're dragging, we want to "undo" the items movement within the list
          // by manipulating its dragOriginY. This will keep the item under the cursor,
          // even though it's jumping around the DOM.
          dragOriginY.set(dragOriginY.get() + delta.y);
        }

        // If `positionTransition` is a function and returns `false`, it's telling
        // Motion not to animate from its old position into its new one. If we're
        // dragging, we don't want any animation to occur.
        return !isDragging;
      }}
    >
      <p className={styles.PathEditorName}>{name}</p>
    </motion.li>
  );
};

const PathEditor = () => {
  // reference only
  // const [colors, setColors] = useState(initialColors);
  const history = useHistory();
  const location = useLocation();
  const { chosenCollections, dispatch } = useContext(PathEditorContext);

  // We need to collect an array of height and position data for all of this component's
  // `Item` children, so we can later us that in calculations to decide when a dragging
  // `Item` should swap places with its siblings.
  const positions = useRef([]).current;
  const setPosition = (i, offset) => {
    positions[i] = offset;
  };

  // Find the ideal index for a dragging item based on its position in the array, and its
  // current drag offset. If it's different to its current index, we swap this item with that
  // sibling.
  const moveItem = (i, dragOffset) => {
    const targetIndex = findIndex(i, dragOffset, positions);
    if (targetIndex !== i) dispatch(setCollections(move(chosenCollections, i, targetIndex)));
  };

  const handleAdd = () => {
    history.push(`${location.pathname}/add-collection`);
  };

  // const handleSave = () => {
  //   fetch('/api/collection/')
  // }

  return (
    <div>
      <main className={styles.PathEditorPage}>
        <ul className={styles.PathEditor}>
          {chosenCollections.length > 0
            && chosenCollections.map(({ title }, i) => <Item key={title} i={i} name={title} setPosition={setPosition} moveItem={moveItem} />)}
        </ul>
        <button className={styles.AddCollectionButton} onClick={handleAdd} type="button">
          Add
        </button>
        <button className={styles.AddCollectionButton} onClick={handleAdd} type="button">
          Save
        </button>
      </main>
    </div>
  );
};

export default PathEditor;
