import React, { useState, useEffect } from 'react';

import LearningPath from '../../components/learning-paths/learning-path/learning-path.component';

import styles from './all-paths-specific.style.css';

const AllLearningPaths = ({ loggedInUser, userCollections }) => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    // Get all collections
    fetch('/api/userpaths')
      .then((res) => res.json())
      .then((result) => {
        // assume result is an array
        // transformLikes -> sort by like by default
        setCollections(result);
      });
  }, []);

  return (
    <div className={styles.Background}>
      <main className={styles.Main}>
        <h1 className={styles.Heading}>All Learning Paths</h1>
        {collections[0] !== undefined ? (
          collections.map((collection) => <LearningPath key={collection._id} id={collection._id} {...collection} loggedInUser={loggedInUser} />)
        ) : (
          // collections.map((collection) => <ExpandedPathView key={collection._id} i={collection} expanded={expanded} setExpanded={setExpanded} />)
          <li> Loading...</li>
        )}
      </main>
    </div>
  );
};

export default AllLearningPaths;
