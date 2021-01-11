import PropTypes from 'prop-types';
import Condition from '../../common/Condition/Condition';
import { settings } from '../../../data/dataStore';
import Title from '../../common/Title/Title';
import Button from '../../common/Button/Button';

import styles from './DataTreeNode.module.scss';

const DataTreeNode = ({ dataTreeNode, openPopup, removeDataTreeNode, toggleDataNodeChildrenOpeators }) => {
  const data = settings.content;

  const nestedDataTreeNodes = (dataTreeNode.children || [])
    .map(nestedDataTreeNode => {
      const nestedDataTreeNodeProps = {
        dataTreeNode: nestedDataTreeNode,
        openPopup,
        removeDataTreeNode,
        toggleDataNodeChildrenOpeators,
      };

      return <DataTreeNode key={nestedDataTreeNode.data.id} {...nestedDataTreeNodeProps} />;
    });

  return (
    <li key={dataTreeNode.data.id} className={styles.component}>
      {dataTreeNode.data.id !== '1' &&
        <Condition
          name={dataTreeNode.data.operator}
          clickAction={toggleDataNodeChildrenOpeators}
          nodeId={dataTreeNode.data.parentId}
        />}
      <div className={styles.listWrapper}>
        <div className={styles.titleWrapper}>
          <Title subtitle={dataTreeNode.data.title} />
          {dataTreeNode.data.id !== '1' &&
            <Button
              variant={`${data.buttons.size.small} ${data.buttons.variant.danger}`}
              name={data.buttons.icon.minus}
              clickAction={removeDataTreeNode}
              nodeId={dataTreeNode.data.id}
            />}
        </div>
        {dataTreeNode.children.length > 0 && <ul className={styles.list}>{nestedDataTreeNodes}</ul>}
        <Button
          variant={`${data.buttons.size.small} ${data.buttons.variant.success}`}
          name={data.buttons.icon.plus}
          clickAction={openPopup}
          nodeId={dataTreeNode.data.id}
        />
      </div>
    </li>
  );
};

DataTreeNode.propTypes = {
  openPopup: PropTypes.func,
  removeDataTreeNode: PropTypes.func,
  toggleDataNodeChildrenOpeators: PropTypes.func,
  dataTreeNode: PropTypes.shape({
    data: PropTypes.shape({
      id: PropTypes.string,
      parentId: PropTypes.parentId,
      operator: PropTypes.string,
      title: PropTypes.string,
    }),
    children: PropTypes.array,
  }).isRequired,
};

export default DataTreeNode;
