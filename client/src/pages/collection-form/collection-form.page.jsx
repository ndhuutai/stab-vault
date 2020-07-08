import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import styles from './collection-form.css';

const CollectionForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [linkInput, setLinkInput] = useState([]);

  const history = useHistory();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleCancel = () => {
    history.replace('/path-editor/add-collection');
  };

  const handleAddLink = () => {
    const linkInputEl = <input type="text" id="links" className={styles.Input} placeholder="link to resource" />;
    setLinkInput([...linkInput, linkInputEl]);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    console.log('form event', e);

    fetch('/api/collections', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
        category,
      }),
    })
      .then((result) => result.json())
      .then((result) => {
        // TODO: check result before pushing back to the other page
        if (result) history.push('/path-editor/add-collection');
      });
  };

  return (
    <div className={styles.Container}>
      <form onSubmit={handleFormSubmit} className={styles.Form}>
        <div className={styles.FormHeader}>
          <h1>Add Resource</h1>
        </div>
        <input type="text" id="title" onChange={handleTitleChange} value={title} placeholder="Title" className={styles.Input} />
        <textarea
          type="text"
          id="description"
          onChange={handleDescriptionChange}
          value={description}
          placeholder="Description"
          className={styles.TextArea}
        />
        {linkInput.length > 0 && linkInput}
        <div className={styles.BtnContainer}>
          <button type="button" className={styles.SubmitBtn} onClick={handleAddLink}>
            Add Link
          </button>
        </div>
        <select name="category" id="category" onChange={handleCategoryChange} className={styles.Select}>
          <option value="">Category</option>
          <option value="frontend">Front End</option>
          <option value="backend">Back End</option>
          <option value="devops">Dev Ops</option>
        </select>
        <div className={styles.BtnContainer}>
          <button type="button" onClick={handleCancel} className={styles.CancelBtn}>
            Cancel
          </button>
          <button type="submit" className={styles.SubmitBtn}>
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CollectionForm;
