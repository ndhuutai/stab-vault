import React, { useState, useEffect } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';

import LikeButton from '../like-button/like-button.component';
import SaveButton from '../save-button/save-button.component';

import styles from './expanded-learning-path.style.css';

const ExpandedLearningPath = ({ loggedInUser }) => {
  const [learningPath, setLearningPath] = useState();
  const [pathName, setPathName] = useState('');
  const history = useHistory();

  const { id } = useParams();

  console.log(learningPath);

  useEffect(() => {
    fetch(`/api/userpaths/${id}`)
      .then((res) => res.json())
      .then((result) => {
        setLearningPath(result);
        setPathName(result.name);
      });
  }, []);

  function handleClick(collection) {
    history.push('/collection-viewer', {
      collection,
    });
  }

  return (
    <div className={styles.Background}>
      <main className={styles.Main}>
        <h1 className={styles.Heading}>{pathName} Path</h1>
        <ul>
          {learningPath ? (
            learningPath.collections.map((collection) => (
              <div className={styles.Card}>
                <div className={styles.Title} onClick={() => handleClick(collection)}>
                  {collection.title}
                </div>
              </div>
            ))
          ) : (
            // collections.map((collection) => <ExpandedPathView key={collection._id} i={collection} expanded={expanded} setExpanded={setExpanded} />)
            <li> Loading...</li>
          )}
        </ul>
        <button className={styles.AddCollectionButton} onClick={() => console.log('clicked')} type="button">
          Like
        </button>
        <button className={styles.AddCollectionButton} onClick={() => console.log('clicked')} type="button">
          Save This Path
        </button>
      </main>
    </div>
  );
};

export default ExpandedLearningPath;
