import './add-cell.css';

import { useActions } from '../hooks/use-actions';

interface AddCellProps {
  previousCellId: string | null;
}

const AddCell: React.FC<AddCellProps> = function ({ previousCellId }) {
  const { insertCellAfter } = useActions();

  return (
    <div className='add-cell'>
      <div className='add-buttons'>
        <button
          className='button is-rounded is-small is-primary'
          onClick={() => insertCellAfter(previousCellId, 'code')}
        >
          <span className='icon is-small'>
            <i className='fas fa-plus' />
          </span>
          <span>CODE</span>
        </button>
        <button
          className='button is-rounded is-small is-primary'
          onClick={() => insertCellAfter(previousCellId, 'text')}
        >
          <span className='icon is-small'>
            <i className='fas fa-plus' />
          </span>
          <span>TEXT</span>
        </button>
      </div>
      <div className='divider'></div>
    </div>
  );
};

export default AddCell;
