import './cell-list-item.css';
import ActionBar from './action-bar';
import CodeCell from './code-cell';
import TextEditor from './text-editor';

import { Cell } from '../state';

interface CellListItemProps {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = function ({ cell }) {
  let child: JSX.Element;

  if (cell.type === 'code') {
    child = (
      <>
        <div className='action-bar-wrapper'>
          <ActionBar id={cell.id} />
        </div>
        <CodeCell cell={cell} />
      </>
    );
  } else {
    child = (
      <>
        <TextEditor cell={cell} />
        <ActionBar id={cell.id} />
      </>
    );
  }

  return <div className='cell-list-item'>{child}</div>;
};

export default CellListItem;
