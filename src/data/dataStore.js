export const settings = {
  logo: {
    txt: 'HYP',
    icon: 'bars',
  },
  header: {
    title: 'Zadanie rekrutacyjne',
  },
  content: {
    title: 'People',
    buttons: {
      size: {
        large: 'large',
        medium: 'medium',
        small: 'small',
      },
      line: {
        true: 'line',
        outer: 'outerLine',
        inner: 'innerLine',
      },
      variant: {
        success: 'success',
        danger: 'danger',
      },
      icon: {
        plus: 'plus',
        minus: 'minus',
        cancel: 'ban',
      },
    },
    condition: {
      txt: {
        outer: 'And',
        inner: 'Or',
      },
      variant: {
        large: 'large',
        medium: 'medium',
        small: 'small',
      },
    },
    popup: {
      item: 'Add Item',
      option: 'Add Option',
    },
    select: {
      label: 'Chose item size: ',
      txt: {
        medium: 'Medium',
        large: 'Large',
      },
      variant: {
        medium: 'medium',
        large: 'large',
      },
    },
  },
};

export const initialState = [
  {
    id: '1',
    parentId: null,
    variant: 'medium',
    title: 'Age 40+',
    children: [],
  },
  {
    id: '2',
    parentId: null,
    variant: 'large',
    title: 'Ethnicity',
    children: [
      {
        id: '2-1',
        parentId: '2',
        variant: 'medium',
        title: 'Black',
        children: [],
      },
      {
        id: '2-2',
        parentId: '2',
        variant: 'medium',
        title: 'Hispanic',
        children: [],
      },
    ],
  },
  {
    id: '3',
    parentId: null,
    variant: 'medium',
    title: 'Income yearly 45k USD+',
    children: [],
  },
];
