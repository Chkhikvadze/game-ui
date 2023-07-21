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
      // backgroundColor: 'grey',
      fontSize: 14,
      maxHeight: 250,
      width: '100%',
      overflowY: 'scroll',
      padding: 10,
      color: '#FFF',
    },
    item: {
      padding: '5px 15px',

      border: '1px solid transparent',
      '&focused': {
        background: 'rgba(255, 255, 255, 0.1)',

        border: '1px solid rgba(255, 255, 255, 0.4)',
        borderRadius: 6,
      },
    },
  },
}
