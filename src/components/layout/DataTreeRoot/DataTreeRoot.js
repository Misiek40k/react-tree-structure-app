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

  const openPopup = nodeId => {
    setCurrentAddNodeId(nodeId);
    setPopupOpenState(true);
  };

  const closePopup = () => {
    setCurrentAddNodeId(null);
    setPopupInputValue('');
    setPopupOpenState(false);
  };

  // add new dataNode

  const generateNewDataNodeId = dataTreeNode => {
    if (dataTreeNode.children.length > 0) {
      const currentSplitIdArray = dataTreeNode.children[dataTreeNode.children.length - 1].id.split('-');

      currentSplitIdArray[currentSplitIdArray.length - 1] =
        (parseFloat(currentSplitIdArray[currentSplitIdArray.length - 1]) + 1).toString();

      const newId = currentSplitIdArray.join('-');
      return newId;
    } else {
      return `${dataTreeNode.id}-1`;
    }
  };

  const addDataNodeBtnClick = nodeId => {
    addDataTreeNode(dataTreeState, nodeId);
  };

  const addDataTreeNode = (dataTreeNodesArray, nodeId) => {
    dataTreeNodesArray.forEach(dataTreeNode => {
      if (dataTreeNode.id === nodeId) {
        const newDataTreeNode = {
          id: generateNewDataNodeId(dataTreeNode),
          operator: data.condition.txt.inner,
          title: popupInputValue,
          children: [],
        };

        dataTreeNode.children.push(newDataTreeNode);
        closePopup();
      } else {
        addDataTreeNode(dataTreeNode.children, nodeId);
      }
    });

    setDataTreeState([...dataTreeNodesArray]);
  };

  // remove dataNode

  const removeDataNodeBtnClick = nodeId => {
    removeNode(dataTreeState, nodeId);
  };

  const removeNode = (dataTreeNodesArray, nodeId) => {
    dataTreeNodesArray.forEach(dataTreeNode => {
      if (dataTreeNode.children.some(childNode => childNode.id === nodeId)) {
        dataTreeNode.children = [...dataTreeNode.children.filter(childNode => childNode.id !== nodeId)];
      } else {
        removeNode(dataTreeNode.children, nodeId);
      }
    });

    setDataTreeState([...dataTreeNodesArray]);
  };

  // toggle dataNode logic operators

  const toggleDataNodeChildOpeatorsBtnClick = nodeId => {
    toggleDataNodeChildOperators(dataTreeState, nodeId);
  };

  const toggleDataNodeChildOperators = (dataTreeNodesArray, nodeId) => {
    dataTreeNodesArray.forEach(dataTreeNode => {
      if (dataTreeNode.children.some(childNode => childNode.id === nodeId)) {
        dataTreeNode.operator = dataTreeNode.operator === data.condition.txt.outer ?
          dataTreeNode.operator = data.condition.txt.inner :
          dataTreeNode.operator = data.condition.txt.outer;
      } else {
        toggleDataNodeChildOperators(dataTreeNode.children, nodeId);
      }
    });

    setDataTreeState([...dataTreeNodesArray]);
  };

  // child component props

  const dataTreeNodeProps = {
    dataTreeNode: dataTreeState[0],
    openPopup,
    removeDataNodeBtnClick,
    toggleDataNodeChildOpeatorsBtnClick,
    operator: dataTreeState[0].operator,
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
