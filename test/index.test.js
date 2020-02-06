const babel = require('@babel/core');
const assert = require('assert');
const plugin = require('..');

const indent = (strs) => {
  const lines = strs[0].split('\n').slice(1, -1);
  let n = 0;
  return lines.map((s) => {
    if (!n) {
      const space = /^[\s]+/.exec(s);
      n = space ? space[0].length : n;
    }
    return s.substring(n);
  }).join('\n');
};

describe('Test: index.js', () => {
  it('plugin without options do nothing', () => {
    const input = 'class Foo {}';
    const { code } = babel.transform(input, {
      plugins: [plugin]
    });
    assert.strictEqual(code, input);
  });

  it('plugin without props do nothing', () => {
    const input = 'class Foo {}';
    const { code } = babel.transform(input, {
      plugins: [[plugin, { all: true }]]
    });
    assert.strictEqual(code, input);
  });

  it('add class name with options.classes', () => {
    const input = 'class Foo {}';
    const output = indent`
      class Foo {
        static name = "Foo";
      }
    `;
    const { code } = babel.transform(input, {
      plugins: [
        [plugin, {
          classes: ['Foo'],
          props: [{ key: 'name', static: true }]
        }]
      ]
    });
    assert.strictEqual(code, output);
  });

  it('add class name with options.superClasses', () => {
    const input = `
      class Foo extends Node {}
      class Bar {}
    `;
    const output = indent`
      class Foo extends Node {
        static name = "Foo";
      }

      class Bar {}
    `;
    const { code } = babel.transform(input, {
      plugins: [
        [plugin, {
          superClasses: ['Node'],
          props: [{ key: 'name', static: true }]
        }]
      ]
    });
    assert.strictEqual(code, output);
  });

  it('add class name with options.all', () => {
    const input = 'class Foo {}';
    const output = indent`
      class Foo {
        static name = "Foo";
      }
    `;
    const { code } = babel.transform(input, {
      plugins: [
        [plugin, {
          all: true,
          props: [{ key: 'name', static: true }]
        }]
      ]
    });
    assert.strictEqual(code, output);
  });

  it('add class properties', () => {
    const input = 'class Foo {}';
    const output = indent`
      class Foo {
        getName = () => this.name;
        name = "Bar";
      }
    `;
    const { code } = babel.transform(input, {
      plugins: [
        [plugin, {
          all: true,
          props: [
            { key: 'name', value: '"Bar"' },
            { key: 'getName', value: '() => this.name;' }
          ]
        }]
      ]
    });
    assert.strictEqual(code, output);
  });

  it('getValue test', () => {
    const input = 'class Foo {}';
    const output = indent`
      class Foo {
        funValue = "hello";
        wrongType;
        notExpression;
      }
    `;
    const { code } = babel.transform(input, {
      plugins: [
        [plugin, {
          all: true,
          props: [
            { key: 'notExpression', value: 'a;b;' },
            { key: 'wrongType', value: {} },
            { key: 'funValue', value: ({ types: t }) => t.stringLiteral('hello') }
          ]
        }]
      ]
    });
    assert.strictEqual(code, output);
  });
});
