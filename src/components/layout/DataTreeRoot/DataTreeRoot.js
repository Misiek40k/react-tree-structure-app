import { useState } from 'react';
import { settings } from '../../../data/dataStore';
import { initialState } from '../../../data/dataStore';

import SectionHeader from '../../common/SectionHeader/SectionHeader';
import DataTreeNode from '../../features/DataTreeNode/DataTreeNode';
import Popup from '../../features/Popup/Popup';

import styles from './DataTreeRoot.module.scss';

const DataTreeRoot = () => {
  const data = settings.content;

  const [isPopupOpen, setPopupOpenState] = useState(false);
  const [popupInputValue, setPopupInputValue] = useState('');
  const [currentAddNodeId, setCurrentAddNodeId] = useState(null);
  const [dataTreeState, setDataTreeState] = useState(initialState);

  // popup methods

  const openPopup = (nodeId) => {
    setCurrentAddNodeId(nodeId);
    setPopupOpenState(true);
  };

  const closePopup = () => {
    setPopupOpenState(false);
    setPopupInputValue('');
    setCurrentAddNodeId(null);
  };

  // add new dataNode

  const generateNewDataNodeId = (dataTreeNode) => {
    if (dataTreeNode.children.length > 0) {
      const currentSplitIdArray = dataTreeNode.children[dataTreeNode.children.length - 1].data.id.split('-');

      currentSplitIdArray[currentSplitIdArray.length - 1] =
        (parseFloat(currentSplitIdArray[currentSplitIdArray.length - 1]) + 1).toString();

      const newId = currentSplitIdArray.join('-');
      return newId;
    } else {
      return `${dataTreeNode.data.parentId}-1`;
    }
  };

  const generateNewDataNodeOperator = (dataTreeNode) => {
    if (dataTreeNode.children.length > 0) {
      return dataTreeNode.children[0].data.operator;
    } else {
      return data.condition.txt.inner;
    }
  };

  const addDataNodeBtnClick = (parentId) => {
    addDataNode(dataTreeState, parentId);
  };

  const addDataNode = (dataNodesArray, parentId) => {
    dataNodesArray.forEach(dataNode => {
      if (dataNode.data.id === parentId) {
        const newDataNode = {
          data: {
            id: generateNewDataNodeId(dataNode),
            parentId,
            operator: generateNewDataNodeOperator(dataNode),
            title: popupInputValue,
          },
          children: [],
        };

        dataNode.children.push(newDataNode);
        closePopup();
      } else {
        addDataNode(dataNode.children, parentId);
      }
    });

    setDataTreeState([...dataNodesArray]);
  };

  // remove dataNode

  const removeDataNodeBtnClick = (nodeId) => {
    removeNode(dataTreeState, nodeId);
  };

  const removeNode = (dataTreeNodesArray, nodeId) => {
    dataTreeNodesArray.forEach(dataTreeNode => {
      if (dataTreeNode.children.some(childNode => childNode.data.id === nodeId)) {
        dataTreeNode.children = [...dataTreeNode.children.filter(childNode => childNode.data.id !== nodeId)];
      } else {
        removeNode(dataTreeNode.children, nodeId);
      }
    });

    setDataTreeState([...dataTreeNodesArray]);
  };

  // toggle dataNode logic operators

  const toggleDataNodeChildOpeatorsBtnClick = (parentNodeId) => {
    toggleDataTreeOperators(dataTreeState, parentNodeId);
  };

  const toggleDataTreeOperators = (dataTreeNodesArray, parentId) => {
    dataTreeNodesArray.forEach(dataTreeNode => {
      if (dataTreeNode.data.parentId === parentId) {
        dataTreeNode = {
          ...dataTreeNode,
          operator: dataTreeNode.data.operator === data.condition.txt.outer ?
            dataTreeNode.data.operator = data.condition.txt.inner :
            dataTreeNode.data.operator = data.condition.txt.outer,
        };
      } else {
        toggleDataTreeOperators(dataTreeNode.children, parentId);
      }
    });

    setDataTreeState([...dataTreeNodesArray]);
  };

  const rootDataTreeNode = dataTreeState[0];
  const dataTreeNodeProps = {
    dataTreeNode: rootDataTreeNode,
    openPopup,
    removeDataNodeBtnClick,
    toggleDataNodeChildOpeatorsBtnClick,
  };

  const popupProps = {
    closePopup,
    addDataNodeBtnClick,
    popupInputValue,
    setPopupInputValue,
    nodeId: currentAddNodeId,
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

export default DataTreeRoot;
