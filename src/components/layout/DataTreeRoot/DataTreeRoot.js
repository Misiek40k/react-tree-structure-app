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
  const [editOption, setEditOption] = useState(null);
  const [selectOption, setSelectOption] = useState(data.select.variant.medium);
  const [dataTreeState, setDataTreeState] = useState(initialState);

  // const openPopup = (id) => {
  //   if (id) { setEditOption(id); }
  //   setPopupOpenState(true);
  // };

  const closePopup = () => {
    setPopupOpenState(false);
    setPopupInputValue('');
    setEditOption(null);
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

    traverseDataTree((node) => {
      if (node.data.id === nodeId) {
        searchNode = node;
      }
    });

    return searchNode;
  };

  const traverseDataTree = (callback) => {
    const queue = [...dataTreeState];

    if (callback) {
      while (queue.length) {
        const currentNode = queue.shift();
        callback(currentNode);

        for (const childNode of currentNode.children) {
          queue.push(childNode);
        }
      }
    }
  };

  const popupProps = {
    closePopup,
    addDataNode,
    editOption,
    selectOption,
    setSelectOption,
    popupInputValue,
    setPopupInputValue,
  };

  const rootDataTreeNode = findDataTreeNode();

  return (
    <section className={styles.component}>
      <SectionHeader title={data.title} />
      <ul className={styles.list}>
        <DataTreeNode dataTreeNode={rootDataTreeNode} />
      </ul>
      {isPopupOpen ? <Popup {...popupProps} /> : null}
    </section>
  );
};

export default ContentContainer;
