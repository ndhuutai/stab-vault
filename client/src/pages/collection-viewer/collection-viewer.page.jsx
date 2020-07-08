import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import ExpandedCollectionView from '../../components/collection-expand-view/collection-expand-view.component';

const CollectionViewer = () => {
  const [expanded, setExpanded] = useState(0);
  const location = useLocation();
  const history = useHistory();

  const handleClick = () => {
    history.goBack();
  };

  return (
    <div>
      <ExpandedCollectionView
        i={location.state.collection}
        expanded={expanded}
        setExpanded={setExpanded}
        btnName="Complete"
        onBtnClick={handleClick}
      />
    </div>
  );
};

export default CollectionViewer;
