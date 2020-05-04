import PropTypes from 'prop-types'

const triggerType = [
  PropTypes.shape({
      type: 'fieldSelection',
      params: PropTypes.shape({
        fieldName:PropTypes.string,
        value:PropTypes.string,
      })
    }),
    PropTypes.shape({
      type: 'fieldSelections',
      params: PropTypes.shape({
        fieldName:PropTypes.string,
        value:PropTypes.arrayOf(PropTypes.shape({
          qText: PropTypes.string,
          qIsNumeric: PropTypes.bool,
          qNumber: PropTypes.number
        })),
      })
    }),
    PropTypes.shape({
      type: 'clearField',
      params: PropTypes.shape({
        fieldName:PropTypes.string,
      })
    })
]

export default triggerType
