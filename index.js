function contains(node, list) {
  return node && list.includes(node.name);
}

module.exports = (api, options) => {
  const t = api.types;
  const tpl = api.template;
  const getValue = (v) => {
    if (!v) return null;
    if (typeof v === 'string') {
      const ast = tpl.ast(v);
      if (ast.type === 'ExpressionStatement') {
        return ast.expression;
      }
      return null;
    }
    if (typeof v === 'function') {
      return v(api, options);
    }
    return null;
  };
  return {
    name: 'class-properties',
    visitor: {
      ClassDeclaration(path) {
        const classes = options.classes || [];
        const superClasses = options.superClasses || [];
        const { id, superClass } = path.node;
        if (
          options.all ||
          contains(id, classes) ||
          contains(superClass, superClasses)
        ) {
          const props = options.props || [];
          props.forEach((v) => {
            const key = t.identifier(v.key);
            // compute value
            let value = getValue(v.value);
            if (!value && v.key === 'name' && v.static && id) {
              value = t.stringLiteral(id.name);
            }
            // add class property
            path.get('body').unshiftContainer('body', t.classProperty(
              key,
              value,
              null,
              null,
              v.computed,
              v.static
            ));
          });
        }
      }
    }
  };
};