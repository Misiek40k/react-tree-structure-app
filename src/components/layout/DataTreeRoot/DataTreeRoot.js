import { useState } from 'react';
import { settings } from '../../../data/dataStore';
import { initialState } from '../../../data/dataStore';

import SectionHeader from '../../common/SectionHeader/SectionHeader';
import DataTreeNode from '../../features/DataTreeNode/DataTreeNode';
import Popup from '../../features/Popup/Popup';

import styles from './DataTreeRoot.module.scss';

const ContentContainer = () => {
  const data = settings.content;

  const [isPopupOpen, setPopupOpenState] = useState(false);
  const [popupInputValue, setPopupInputValue] = useState('');
  const [dataTreeState, setDataTreeState] = useState(initialState);

  const openPopup = () => {
    setPopupOpenState(true);
  };

  const closePopup = () => {
    setPopupOpenState(false);
    setPopupInputValue('');
  };

  // add new dataNode

  const generateTreeNodeId = (parentNodeId) => {
    if (parentNodeId) {
      return `${parentNodeId}-1`;
    } else {
      return `1`;
    }
  };

  const addDataNode = (title, variant, parentNodeId) => {
    const newDataNode = {
      data: {
        id: generateTreeNodeId(parentNodeId),
        parentId: parentNodeId ? parentNodeId : null,
        variant,
        title,
      },
      children: [],
    };

    const parentNode = null;

    if (parentNode) {
      parentNode.children.push(newDataNode);
    } else {
      if (!dataTreeState) {
        setDataTreeState({ newDataNode });
      }
    }
  };

  // remove dataNode

  const removeDataTreeNode = (nodeId) => {
    removeNode(dataTreeState, nodeId);
  };

  const removeNode = (dataNodesArray, nodeId) => {
    dataNodesArray.forEach(dataNode => {
      if (dataNode.children.some(childNode => childNode.data.id === nodeId)) {
        dataNode.children = [...dataNode.children.filter(childNode => childNode.data.id !== nodeId)];
      } else {
        removeNode(dataNode.children, nodeId);
      }
    });

    setDataTreeState([...dataNodesArray]);
  };

  // toggle dataNode operators

  const toggleDataNodeChildrenOpeators = (parentNodeId) => {
    mutateDataTreeOperators(dataTreeState, parentNodeId);
  };

  const mutateDataTreeOperators = (dataNodesArray, parentId) => {
    dataNodesArray.forEach(dataNode => {
      if (dataNode.data.parentId === parentId) {
        dataNode = {
          ...dataNode,
          operator: dataNode.data.operator === 'And' ? dataNode.data.operator = 'Or' : dataNode.data.operator = 'And',
        };
      } else {
        mutateDataTreeOperators(dataNode.children, parentId);
      }
    });

    setDataTreeState([...dataNodesArray]);
  };

  const rootDataTreeNode = dataTreeState[0];
  const dataTreeNodeProps = {
    dataTreeNode: rootDataTreeNode,
    openPopup,
    removeDataTreeNode,
    toggleDataNodeChildrenOpeators,
  };

  const popupProps = {
    closePopup,
    addDataNode,
    popupInputValue,
    setPopupInputValue,
  };

  return (
    <section className={styles.component}>
      <SectionHeader title={data.title} />
      <ul className={styles.rootList}>
        <DataTreeNode {...dataTreeNodeProps} />
      </ul>
      {isPopupOpen ? <Popup {...popupProps} /> : null}
    </section>
  );
};

export default ContentContainer;
