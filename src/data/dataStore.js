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
    data: {
      id: '1',
      parentId: null,
      operator: null,
      title: null,
    },
    children: [
      {
        data: {
          id: '1-1',
          parentId: '1',
          operator: 'And',
          title: 'Age 40+',
        },
        children: [],
      },
      {
        data: {
          id: '1-2',
          parentId: '1',
          operator: 'And',
          title: 'Ethnicity',
        },
        children: [
          {
            data: {
              id: '1-2-1',
              parentId: '1-2',
              operator: 'Or',
              title: 'Black',
            },
            children: [],
          },
          {
            data: {
              id: '1-2-2',
              parentId: '1-2',
              operator: 'Or',
              title: 'Hispanic',
            },
            children: [],
          },
        ],
      },
      {
        data: {
          id: '1-3',
          parentId : '1',
          operator: 'And',
          title: 'Income yearly 45k USD+',
        },
        children: [],
      },
    ],
  },
];
