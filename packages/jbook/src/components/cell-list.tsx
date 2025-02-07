import './cell-list.css';
import AddCell from './add-cell';
import CellListItem from './cell-list-item';

import { Fragment } from 'react/jsx-runtime';
import { useTypedSelector } from '../hooks/use-typed-selector';

const CellList: React.FC = function () {
  const cells = useTypedSelector(({ cells: { order, data } }) =>
    order.map((id) => data[id])
  );

  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell previousCellId={cell.id} />
    </Fragment>
  ));

  return (
    <div className='cell-list'>
      <AddCell previousCellId={null} />
      {renderedCells}
    </div>
  );
};

export default CellList;
