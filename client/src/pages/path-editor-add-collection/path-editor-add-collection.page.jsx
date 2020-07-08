import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ExpandedCollectionView from '../../components/collection-expand-view/collection-expand-view.component';

import styles from './path-editor-add-collection.style.css';

const AddCollectionView = () => {
  const history = useHistory();

  const [collectionsByCategory, setCollections] = useState(null);

  const putCollectionsInCategories = (collectionsFromDb) => {
    const newCollections = collectionsFromDb.reduce((acc, curCollection) => {
      if (!acc[curCollection.category]) {
        acc[curCollection.category] = [];
      }
      acc[curCollection.category].push(curCollection);
      return acc;
    }, {});

    setCollections(newCollections);
  };

  useEffect(() => {
    fetch('/api/collections')
      .then((result) => result.json())
      .then((result) => {
        // TODO: check result before pushing back to the other page
        const collectionsFromDb = result.map(({ _id, title, description, category }) => ({
          _id,
          title,
          description,
          category,
        }));
        putCollectionsInCategories(collectionsFromDb);
      });
  }, []);

  const handleNew = () => {
    history.push('/collection-editor');
  };

  const handleCancel = () => {
    // replace url stack's current entry since we cancel
    // so that user's url stack won't get cluttered.
    history.replace('/path-editor');
  };

  // nested loop, optimize later?
  const collectionsRender =
    collectionsByCategory &&
    Object.keys(collectionsByCategory).map((category) => (
      <>
        <div className={styles.CategoryText}>{category}</div>
        <hr />
        {collectionsByCategory[category].map((collection) => (
          <div className={styles.CollectionView}>
            <ExpandedCollectionView
              key={collection.title + collection.category}
              title={collection.title}
              category={collection.category}
              description={collection.description}
              collectionID={collection._id}
            />
          </div>
        ))}
      </>
    ));

  return (
    <div className={styles.AddCollectionPage}>
      {/* {collections.length < 1
        ? 'Loading...'
        : collections.map(({ title, category, description }) => (
            <ExpandedCollectionView key={title} title={title} category={category} description={description} />
          ))} */}
      {collectionsRender}
      <div className={styles.AddCollectionButtons}>
        <button className={styles.CancelButton} type="button" onClick={handleCancel}>
          Cancel
        </button>
        <button className={styles.AddButton} type="button" onClick={handleNew}>
          New
        </button>
      </div>
    </div>
  );
};

export default AddCollectionView;
