import PropTypes from 'prop-types';
import Condition from '../../common/Condition/Condition';
import { settings } from '../../../data/dataStore';
import Title from '../../common/Title/Title';
import Button from '../../common/Button/Button';

import styles from './DataTreeNode.module.scss';

const DataTreeNode = ({ dataTreeNode, openPopup }) => {
  const data = settings.content;

  const nestedDataTreeNodes = (dataTreeNode.children || [])
    .map(nestedDataTreeNode => {
      const nestedDataTreeNodeProps = {
        dataTreeNode: nestedDataTreeNode,
        openPopup,
      };

      return <DataTreeNode key={nestedDataTreeNode.data.id} {...nestedDataTreeNodeProps} />;
    });

  return (
    <li key={dataTreeNode.data.id} className={styles.component}>
      {dataTreeNode.data.id !== '1' && <Condition name={data.condition.txt.outer} />}
      <div className={styles.listWrapper}>
        <div className={styles.title}>
          <div className={styles.border}>
            <Title title={dataTreeNode.data.title} />
          </div>
        </div>
        {dataTreeNode.children.length > 0 && <ul className={styles.list}>{nestedDataTreeNodes}</ul>}
        <Button
          variant=
            {`${data.buttons.size.medium} ${data.buttons.variant.success}`}
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
  dataTreeNode: PropTypes.shape({
    data: PropTypes.shape({
      id: PropTypes.string,
      parentId: PropTypes.parentId,
      variant: PropTypes.string,
      title: PropTypes.string,
    }),
    children: PropTypes.array,
  }).isRequired,
};

export default DataTreeNode;
