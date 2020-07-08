import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import LikeButton from '../like-button/like-button.component';
import SaveButton from '../save-button/save-button.component';

import styles from './expanded-learning-path.style.css';

const ExpandedLearningPath = ({ loggedInUser }) => {
  const [collection, setCollection] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    fetch(`/api/userpaths/${id}`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setCollection(result);
      });
  }, []);

  return (
    <div className={styles.Background}>
      <main className={styles.PathEditorPage}>
        <ul className={styles.PathEditor}>
          {/* {chosenCollections.length > 0 && */}
          {/* chosenCollections.map(({ title }, i) => <Item key={title} i={i} name={title} setPosition={setPosition} moveItem={moveItem} />)} */}
          place holder :D
        </ul>
        <button className={styles.AddCollectionButton} onClick={() => 'clicked'} type="button">
          Like
        </button>
        <button className={styles.AddCollectionButton} onClick={() => 'clicked'} type="button">
          Save
        </button>
      </main>
      <div className={styles.Animation}>
        {/* <Animation animationName="pathEditorIntro" /> */}
        placeholder
      </div>
    </div>

    // <div key={collection._id} className="collection-div">
    //   <h1>{collection.name}</h1>
    //   <h3>{collection.description}</h3>

    //   <div className="creator">
    //     <div className="creator__label">Creator:</div>
    //     <div className="creator__author">{collection.author}</div>
    //   </div>

    //   {collection.links && (
    //     <div className="links">
    //       {collection.links.map((link) => (
    //         <div className="links__item" key={link}>
    //           <a href={link} target="_blank" rel="noreferrer">
    //             {link}
    //           </a>
    //         </div>
    //       ))}
    //     </div>
    //   )}

    //   {loggedInUser ? (
    //     <div>
    //       <br />
    //       <LikeButton loggedInUser={loggedInUser} id={id} />
    //       <SaveButton loggedInUser={loggedInUser} id={id} />
    //     </div>
    //   ) : (
    //     <div>
    //       <Link to="/register">Register</Link>
    //       &nbsp;or&nbsp;
    //       <Link to="/login">Login</Link>
    //       &nbsp;to save this collection
    //     </div>
    //   )}
    // </div>
  );
};

export default ExpandedLearningPath;
