import PropTypes from 'prop-types'

const triggerType = PropTypes.oneOf(
  PropTypes.shape(
    {
      type: 'fieldSelection',
      params: PropTypes.shape({
        fieldName:PropTypes.string,
        value:PropTypes.string,
      })
    },
    {
      type: 'fieldSelections',
      params: PropTypes.shape({
        fieldName:PropTypes.string,
        value:PropTypes.arrayOf(PropTypes.shape({
          qText: PropTypes.string,
          qIsNumeric: PropTypes.bool,
          qNumber: PropTypes.number
        })),
      })
    },
    {
      type: 'clearField',
      params: PropTypes.shape({
        fieldName:PropTypes.string,
      })
    }
  )
)

export default triggerType
