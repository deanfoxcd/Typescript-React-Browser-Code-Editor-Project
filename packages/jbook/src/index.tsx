import 'bulmaswatch/superhero/bulmaswatch.min.css';
import ReactDOM from 'react-dom/client';
import '@fortawesome/fontawesome-free/css/all.min.css';

import { Provider } from 'react-redux';
import CellList from './components/cell-list';
import { store } from './state';

const el = document.getElementById('root');

const root = ReactDOM.createRoot(el!);

const App = () => {
  return (
    <Provider store={store}>
      <div>
        {/* <CodeCell /> */}
        {/* <TextEditor /> */}
        <CellList />
      </div>
    </Provider>
  );
};

root.render(<App />);
