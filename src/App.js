import logo from './logo.svg';
import './App.scss';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import store from './redux/store';
import AppLocale from './i18n';
import DatePicker from './datepicker';

function App() {
  const currentAppLocale = AppLocale.he;

  return (
    <Provider store={store}>
      <IntlProvider
      locale={currentAppLocale.locale}
      messages={currentAppLocale.messages}
      >
        <div className="App" dir="rtl">
          <header className="App-header">
            <DatePicker />
          </header>
        </div>
      </IntlProvider>
    </Provider>
  );
}

export default App;
