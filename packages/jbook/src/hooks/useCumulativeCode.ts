import { useTypedSelector } from './use-typed-selector';

export function useCumulativeCode(cellId: string) {
  return useTypedSelector((state) => {
    const { data, order } = state.cells;
    const orderedCells = order.map((id) => data[id]);

    const showFunc = `
        import _React from 'react';
        import _ReactDOM from 'react-dom/client';
        
        const rootElement = document.querySelector('#root');
        const root = rootElement ? _ReactDOM.createRoot(rootElement) : null;

        var show = (value) => {

          if (typeof value === 'object') {
            if (value.$$typeof && value.props) {
              root.render(value);
            } else {
              rootElement.innerHTML = JSON.stringify(value);
            }
          } else {
            rootElement.innerHTML = value;
          }
        };
      `;

    const showFuncNoop = `var show = () => {};`;

    const cumulativeCode = [];

    for (let c of orderedCells) {
      if (c.type === 'code') {
        if (c.id === cellId) cumulativeCode.push(showFunc);
        else cumulativeCode.push(showFuncNoop);
        cumulativeCode.push(c.content);
      }
      if (c.id === cellId) {
        break;
      }
    }

    // const codeCells = orderedCells.filter((cell) => cell.type === 'code');
    // const codeStrings = codeCells.map((cell) => cell.content);

    return cumulativeCode;
  }).join('\n');
}
