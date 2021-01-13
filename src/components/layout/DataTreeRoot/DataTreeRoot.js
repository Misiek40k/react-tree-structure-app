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
    if (dataNode.children.length > 0) {
      const currentSplitIdArray = dataNode.children[dataNode.children.length - 1].data.id.split('-');

      currentSplitIdArray[currentSplitIdArray.length - 1] =
        (parseFloat(currentSplitIdArray[currentSplitIdArray.length - 1]) + 1).toString();

      const newId = currentSplitIdArray.join('-');
      return newId;
    } else {
      return `${dataNode.data.parentId}-1`;
    }
  };

  const generateNewDataNodeOperator = (dataNode) => {
    if (dataNode.children.length > 0) {
      return dataNode.children[0].data.operator;
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
          operator: dataNode.data.operator === data.condition.txt.outer ?
            dataNode.data.operator = data.condition.txt.inner :
            dataNode.data.operator = data.condition.txt.outer,
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
