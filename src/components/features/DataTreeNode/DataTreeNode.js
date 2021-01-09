import PropTypes from 'prop-types';

import styles from './DataTreeNode.module.scss';

const DataTreeNode = ({dataTreeNode}) => {
  const nestedDataTreeNodes = (dataTreeNode.children || [])
    .map(nestedDataTreeNode => {
      return <DataTreeNode dataTreeNode={nestedDataTreeNode} key={nestedDataTreeNode.data.id} />;
    });

  return (
    <li key={dataTreeNode.data.id} className={styles.component}>
      <span>{dataTreeNode.data.title}</span>
      {dataTreeNode.children.length > 0 && <ul>{nestedDataTreeNodes}</ul>}
    </li>
  );
};

DataTreeNode.propTypes = {
  dataTreeNode: PropTypes.shape({
    data: PropTypes.shape({
      id: PropTypes.string,
      parentId: PropTypes.parentId,
      variant: PropTypes.string,
      title: PropTypes.string,
    }),
    children: PropTypes.array,
  },
  ).isRequired,
};

export default DataTreeNode;
