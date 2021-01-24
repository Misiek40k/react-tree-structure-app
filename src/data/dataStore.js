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
    operator: 'And',
    children: [
      {
        id: '11',
        operator: 'Or',
        title: 'Age 40+',
        children: [],
      },
      {
        id: '12',
        operator: 'Or',
        title: 'Ethnicity',
        children: [
          {
            id: '121',
            operator: 'Or',
            title: 'Black',
            children: [],
          },
          {
            id: '122',
            operator: 'Or',
            title: 'Hispanic',
            children: [],
          },
        ],
      },
      {
        id: '13',
        operator: 'Or',
        title: 'Income yearly 45k USD+',
        children: [],
      },
    ],
  },
];
