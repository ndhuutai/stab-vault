import React from 'react';
import { Link } from 'react-router-dom';

import LikeButton from '../like-button/like-button.component';
import SaveButton from '../save-button/save-button.component';

import styles from './learning-path.style.css';

const LearningPath = ({ id, title, name, description, author, loggedInUser }) => (
  <Link key={id} className={styles.Card} to={`/userpaths/${id}`}>
    <h1 className={styles.Title}>{name}</h1>
    {/* <h3>{description}</h3> */}

    {/* <div className={styles["creator"]}>
      <div className={styles["creator__label"]}>Creator:</div>
      <div className={styles["creator__author"]}>{author}</div>
    </div>
    <div>
      <Link to={`/collections/${id}`} className={styles["collection__button"]}>
        View Learing Path
      </Link>
    </div> */}
    {/* {loggedInUser ? (
      <div>
        <br />
        <LikeButton loggedInUser={loggedInUser} id={id} />
        <SaveButton loggedInUser={loggedInUser} id={id} />
      </div>
    ) : (
      <div>
        <br />
        <Link to="/register">Register</Link>
        &nbsp;or&nbsp;
        <Link to="/login">Login</Link>
        &nbsp;to save this collection
      </div>
    )} */}
  </Link>
);

export default LearningPath;
