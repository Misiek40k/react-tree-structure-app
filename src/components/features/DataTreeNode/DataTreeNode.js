import PropTypes from 'prop-types';
import { settings } from '../../../data/dataStore';

import Condition from '../../common/Condition/Condition';
import Title from '../../common/Title/Title';
import Button from '../../common/Button/Button';

import styles from './DataTreeNode.module.scss';

const DataTreeNode = ({ dataTreeNode, openPopup, removeDataNodeBtnClick,
  toggleDataNodeChildOpeatorsBtnClick, operator }) => {
  const data = settings.content;

  const nestedDataTreeNodes = (dataTreeNode.children || [])
    .map(nestedDataTreeNode => {
      const nestedDataTreeNodeProps = {
        dataTreeNode: nestedDataTreeNode,
        openPopup,
        removeDataNodeBtnClick,
        toggleDataNodeChildOpeatorsBtnClick,
        operator: dataTreeNode.operator,
      };

      return <DataTreeNode key={nestedDataTreeNode.id} {...nestedDataTreeNodeProps} />;
    });

  return (
    <li key={dataTreeNode.id} className={styles.component}>
      {dataTreeNode.id !== '1' &&
        <Condition
          name={operator}
          clickAction={toggleDataNodeChildOpeatorsBtnClick}
          nodeId={dataTreeNode.id}
        />}
      <div className={styles.listWrapper}>
        <div className={styles.titleWrapper}>
          <Title subtitle={dataTreeNode.title} />
          {dataTreeNode.id !== '1' &&
            <Button
              variant={`${data.buttons.size.small} ${data.buttons.variant.danger}`}
              name={data.buttons.icon.minus}
              clickAction={removeDataNodeBtnClick}
              nodeId={dataTreeNode.id}
            />}
        </div>
        {dataTreeNode.children.length > 0 && <ul className={styles.list}>{nestedDataTreeNodes}</ul>}
        <Button
          variant={`${data.buttons.size.small} ${data.buttons.variant.success}`}
          name={data.buttons.icon.plus}
          clickAction={openPopup}
          nodeId={dataTreeNode.id}
        />
      </div>
    </li>
  );
};

DataTreeNode.propTypes = {
  openPopup: PropTypes.func,
  removeDataNodeBtnClick: PropTypes.func,
  toggleDataNodeChildOpeatorsBtnClick: PropTypes.func,
  operator: PropTypes.string,
  dataTreeNode: PropTypes.shape({
    id: PropTypes.string,
    operator: PropTypes.string,
    title: PropTypes.string,
    children: PropTypes.array,
  }).isRequired,
};

export default DataTreeNode;
