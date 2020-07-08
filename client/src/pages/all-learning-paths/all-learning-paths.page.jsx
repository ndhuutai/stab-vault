import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import LearningPath from '../../components/learning-paths/learning-path/learning-path.component';
import styles from './all-learning-paths.style.css';

const AllLearningPaths = ({ loggedInUser, userPaths }) => {
  const [learningPaths, setLearningPaths] = useState([]);
  const [searchText, setSearchText] = useState('');
  const { userId } = useParams();
  // const [learningPathsByCategory, setlearningPathsByCategory] = useState(null);

  // transform likes to number
  const transformLikes = (lPaths) =>
    lPaths.map((learningPath) => ({
      ...learningPath,
      likes: learningPath.likes.length,
    }));

  const sortByLikes = (a, b) => {
    if (a.likes > b.likes) {
      return -1;
    }
    if (a.likes === b.likes) {
      return 0;
    }
    return 1;
  };

  useEffect(() => {
    // Check if we are trying to get all learning paths for a specific user
    if (userPaths) {
      fetch(`/api/userpaths/${userId}`)
        .then((res) => res.json())
        .then((result) => {
          setLearningPaths(transformLikes(result));
        });

      return;
    }
    // Otherwise just get all learning paths
    fetch('/api/userpaths')
      .then((res) => res.json())
      .then((result) => {
        // assume result is an array
        // transformLikes -> sort by like by default
        setLearningPaths(transformLikes(result));
      });
  }, [userId]);

  const handleSearchChange = (e) => {
    const text = e.target.value.toLowerCase();
    setSearchText(text);
  };

  const handleFilterChange = (e) => {
    const learningPathsCopy = [...learningPaths];
    switch (e.target.value) {
      case 'saved':
        // TODO: decide what to do with "saved" filter
        break;
      default:
        setLearningPaths(learningPathsCopy.sort(sortByLikes));
    }
  };

  // const putLearningPathsInCategories = (learningPathsFromDb) => {
  //   const newLearningPaths = learningPathsFromDb.reduce((acc, curPath) => {
  //     if (!acc[curPath.category]) {
  //       acc[curPath.category] = [];
  //     }
  //     acc[curPath.category].push(curPath);
  //     return acc;
  //   }, {});

  //   setlearningPathsByCategory(learningPathsByCategory);
  // };

  const learningPathsToRender = learningPaths.filter((path) => {
    if (path.tags.length > 0) {
      for (let i = 0; i < path.tags.length; i += 1) {
        if (path.tags[i].toLowerCase().includes(searchText)) {
          return true;
        }
      }
    }
    return path.description.toLowerCase().includes(searchText);
  });

  return (
    <div className={styles.Container}>
      <h1>{userPaths ? `${userId}'s Learning Paths` : 'All Learning Paths'}</h1>

      <div>
        <label htmlFor="search-input">Search</label>
        <input id="search-input" type="text" onChange={handleSearchChange} />
        <label htmlFor="filter-select">Filter by:</label>
        <select name="filter" id="filter-select" onChange={handleFilterChange}>
          <option value="likes">Likes</option>
          <option value="saved">Saved</option>
        </select>
        <label htmlFor="sort-select">Sort by:</label>
        <select name="sort" id="sort-select">
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {learningPathsToRender[0] !== undefined ? (
        learningPathsToRender.map((learningPath) => (
          <LearningPath
            key={learningPath._id}
            id={learningPath._id}
            name={learningPath.name}
            description={learningPath.description}
            author={learningPath.author}
            loggedInUser={loggedInUser}
          />
        ))
      ) : (
        <li> Loading...</li>
      )}
    </div>
  );
};

export default AllLearningPaths;
