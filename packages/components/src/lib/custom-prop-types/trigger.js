import PropTypes from 'prop-types'

const fieldSelectionTrigger = PropTypes.shape({
    type: 'fieldSelection',
    params: PropTypes.shape({
      fieldName:PropTypes.string,
      value:PropTypes.string,
    })
  })

const fieldSelectionsTrigger = PropTypes.shape({
  type: 'fieldSelections',
  params: PropTypes.shape({
    fieldName:PropTypes.string,
    value:PropTypes.arrayOf(PropTypes.shape({
      qText: PropTypes.string,
      qIsNumeric: PropTypes.bool,
      qNumber: PropTypes.number
    })),
  })
})

const clearFieldTrigger =  PropTypes.shape({
  type: 'clearField',
  params: PropTypes.shape({
    fieldName:PropTypes.string,
  })
})

const triggerType = PropTypes.oneOf([clearFieldTrigger,fieldSelectionsTrigger,fieldSelectionTrigger])

export default triggerType
