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

  const generateNewDataNodeId = (dataNode) => {
    const currentSplitIdsArray = dataNode.children[dataNode.children.length - 1].data.id.split('-');

    currentSplitIdsArray[currentSplitIdsArray.length - 1] =
      (parseFloat(currentSplitIdsArray[currentSplitIdsArray.length - 1]) + 1).toString();

    const newId = currentSplitIdsArray.join('-');

    console.log(newId);
    return newId;
  };

  const generateNewDataNodeOperator = (dataNode) => {
    return dataNode.children[0].data.operator;
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

  // toggle dataNode logic operators

  const toggleDataNodeChildOpeatorsBtnClick = (parentNodeId) => {
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

export default ContentContainer;
