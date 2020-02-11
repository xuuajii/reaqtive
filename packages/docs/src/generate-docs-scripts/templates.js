const os = require('os');
const { template, type } = require('react-docgen-renderer-template');

const generatePropsTable = (props, getType) => {
  const entries = Object.entries(props);
  if (entries.length === 0) return 'This component does not have any props.';

  let propsTableHeader = `prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
`;
  return (
    propsTableHeader +
    entries
      .map(
        ([propName, propValue]) =>
          `__${propName}__ | \`${getType(propValue.type)}\` | ${
            propValue.defaultValue ? `\`${propValue.defaultValue}\`` : ''
          } | ${propValue.required ? ':white_check_mark:' : ':x:'} | ${
            propValue.description ? propValue.description : ''
          }`,
      )
      .join(os.EOL)
  );
};

const templateCreator = template({
  unknown: 'Unknown',
  func: 'Function',
  array: 'Array',
  object: 'Object',
  string: 'String',
  number: 'Number',
  bool: 'Boolean',
  node: 'ReactNode',
  element: 'ReactElement',
  symbol: 'Symbol',
  any: '*',
  custom: type`${({ context }) =>
    context.type.raw.includes('function(') ? '(custom validator)' : context.type.raw}`,
  shape: 'Shape',
  arrayOf: type`Array[]<${({ context, getType }) =>
    context.type.value.raw ? context.type.value.raw : getType(context.type.value)}>`,
  objectOf: type`Object[#]<${({ context, getType }) =>
    context.type.value.raw ? context.type.value.raw : getType(context.type.value)}>`,
  instanceOf: type`${({ context }) => context.type.value}`,
  enum: type`Enum(${({ context, getType }) =>
    context.type.computed
      ? context.type.value
      : context.type.value.map(value => getType(value)).join(', ')})`,
  union: type`Union<${({ context, getType }) =>
    context.type.computed
      ? context.type.value
      : context.type.value.map(value => (value.raw ? value.raw : getType(value))).join('\\|')}>`,
});

const headerTemplateObject = templateCreator`### **${({ context }) => context.componentName}**${()=>os.EOL}
${({
  context,
}) => {
  let headerValue = '';
  if (context.srcLinkUrl) {
    headerValue = `${os.EOL}From [\`${context.srcLink}\`](${context.srcLinkUrl})`;
  }
  if (context.description) {
    headerValue += os.EOL + os.EOL + context.description;
  }
  headerValue += os.EOL;
  return headerValue;
}}
`;

const propsTableTemplateObject = templateCreator`
  ${({ context, getType }) => generatePropsTable(context.props, getType)}
`;


module.exports = { headerTemplate: headerTemplateObject, propsTable:propsTableTemplateObject}
