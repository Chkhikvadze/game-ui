export default {
  '&multiLine': {
    // height: 20,
    maxHeight: 100,

    input: {
      // padding: 9,
      border: 'none',
      color: '#fff',
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: '14px',
      lineHeight: '22px',
    },
  },

  suggestions: {
    list: {
      backgroundColor: 'transparent',
      border: '1px solid rgba(0,0,0,0.15)',
      fontSize: 14,
      maxHeight: 250,
      width: 150,
      overflowY: 'scroll',
    },
    item: {
      padding: '5px 15px',

      borderBottom: '1px solid rgba(0,0,0,0.15)',
      '&focused': {
        backgroundColor: '#cee4e5',
      },
    },
  },
}
