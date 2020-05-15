import React from 'react'

const PropsTable = props => {
  const {propsMetadata} = props
  return (
    props.propsMetadata?
    <table className="table">
      <thead>
        <tr>
          <th>Prop</th>
          <th>Type</th>
          <th>Is Required</th>
          <th>Default Value</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(props.propsMetadata).map(key=>
            {
              const currentProp = props.propsMetadata[key]
              return <TableRow propName={key} key={key} propData={currentProp}/>
            }
        )}
      </tbody>
    </table>
    :<></>
  )
}

const TableRow = props =>{
  const {propName, propData}=props
  return(
    <tr>
      <th acope="row">
        {propName}
      </th>
      <td>
        {propData.type.name}
      </td>
      <td>
        {propData.required.toString()}
      </td>
      <td>
        {propData.defaultValue&&propData.defaultValue.value}
      </td>
      <td>
        {propData.description}
      </td>
  </tr>
  )
}

export default PropsTable
