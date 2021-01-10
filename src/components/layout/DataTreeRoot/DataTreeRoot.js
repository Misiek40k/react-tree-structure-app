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
  const [selectOption, setSelectOption] = useState(data.select.variant.medium);
  const [dataTreeState, setDataTreeState] = useState(initialState);

  const openPopup = () => {
    setPopupOpenState(true);
  };

  const closePopup = () => {
    setPopupOpenState(false);
    setPopupInputValue('');
  };

  const generateTreeNodeId = (parentNodeId) => {
    if (parentNodeId) {
      return `${parentNodeId}-1`;
    } else {
      return `1`;
    }
  };

  const addDataNode = (title, variant, parentNodeId) => {
    const dataNode = {
      data: {
        id: generateTreeNodeId(parentNodeId),
        parentId: parentNodeId ? parentNodeId : null,
        variant,
        title,
      },
      children: [],
    };

    const parentNode = parentNodeId ? findDataTreeNode(parentNodeId) : null;

    if (parentNode) {
      parentNode.children.push(dataNode);
    } else {
      if (!dataTreeState) {
        setDataTreeState({ dataNode });
      }
    }
  };

  // const removeDataTreeNode = () => {
  // };

  // const toggleDataNodeChildrenOpeators = (parentNodeId) => {
  // };

  const findDataTreeNode = (nodeId = '1') => {
    let searchNode = null;

    traverseDataTree(nodeId, (currentNode) => {
      searchNode = currentNode;
    });

    return searchNode;
  };

  const traverseDataTree = (searchNodeId, callback) => {
    const queue = [...dataTreeState];

    if (callback) {
      while (queue.length > 0) {
        const currentNode = queue.shift();

        if (currentNode.data.id === searchNodeId) {
          callback(currentNode);
          return;
        }
        for (const childNode of currentNode.children) {
          queue.push(childNode);
        }
      }
    }
  };

  const rootDataTreeNode = findDataTreeNode();
  const dataTreeNodeProps = {
    dataTreeNode: rootDataTreeNode,
    openPopup,
  };

  const popupProps = {
    closePopup,
    addDataNode,
    selectOption,
    setSelectOption,
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
