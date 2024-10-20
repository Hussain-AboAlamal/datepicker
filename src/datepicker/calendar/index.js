/*
 * Calendar component with the following properties
 *
 * title {string}. title of the  calendar
 * value {moment object}. selected date of the calendar
 * minValue {moment object}. the least date available
 * style {object}. customer inline style
 * enabled {boolean}. Calendar is enabled/disabled
 * onDateSelected {callback}. callback to parent when selecting a date
 */
import React, { useState, useEffect, useRef} from 'react';
import { useIntl } from 'react-intl';
import moment from 'moment';

const Calendar = ({title, value, minValue, style, enabled, onDateSelected}) => {
  const intl = useIntl();
  // anchor element reference
  const anchorEl = useRef(null);
  // show/hide dropdown options
  const[showOptions, setShowOptions] = useState(false);

  /**
   * month names in hebrew
   */
  const monthNames = [
    intl.formatMessage({id: 'jan'}),
    intl.formatMessage({id: 'feb'}),
    intl.formatMessage({id: 'mar'}),
    intl.formatMessage({id: 'apr'}),
    intl.formatMessage({id: 'may'}),
    intl.formatMessage({id: 'jun'}),
    intl.formatMessage({id: 'jul'}),
    intl.formatMessage({id: 'aug'}),
    intl.formatMessage({id: 'sep'}),
    intl.formatMessage({id: 'oct'}),
    intl.formatMessage({id: 'nov'}),
    intl.formatMessage({id: 'dec'}),
  ];

  /**
   * Get months dropdown options. 12 months from today
   *
   * @return {object[]}
   */
  const getMonths = () => {
    let date = moment();
    let options = [];
    for (var i = 0; i < 12; i++) {
      // get month & year from the date
      let month = date.month();
      let year = date.year();
      const option = {
        month, year,
        text: `${monthNames[month]} ${year}`,
        index: i,
      }
      options.push(option);
      // increment date by one month
      date = date.add(1, 'M');
    }

    return options;
  }

  /**
   * Handles month dropdown option click event
   *
   * @param item selected option data
   */
  const monthSelected = (item) => {
    setSelectedMonth(item);
    setShowOptions(false);
  }

  /**
   * Months dropdown options
   */
  const months = getMonths();

  /**
   * Dropdown selected month. by default current month
   *
   * @var {object}
   */
  const [selectedMonth, setSelectedMonth] = useState(months[0]);

  /**
   * days names in hebrew
   */
  const dayNames = [
    intl.formatMessage({id: 'sun'}),
    intl.formatMessage({id: 'mon'}),
    intl.formatMessage({id: 'tue'}),
    intl.formatMessage({id: 'wed'}),
    intl.formatMessage({id: 'thu'}),
    intl.formatMessage({id: 'fri'}),
    intl.formatMessage({id: 'sat'}),
  ];

  /**
   * Days numbers table body
   *
   * @var {int[][]}
   */
  const [daysGrid, setDaysGrid] = useState([]);
  // re-render days on selected month or value or minValue change
  useEffect(() => {
    const {year, month} = selectedMonth;
    const date = moment({year, month}); // first date in the selected month
    const daysInMonth = date.daysInMonth(); // number of days in the selected month
    const firstDay = date.day(); // first day in the current month
    let day = 1;
    const rows = [];
    for (let i = 0; i < 6; i++) {
      let row = [];
      // creating individual cells, filing them up with data.
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          const cell = {
            value: '',
          }
          row.push(cell);
        }
        else if (day > daysInMonth) {
          break;
        }
        else {
          let date = moment({year, month, date: day});
          const today = moment().startOf('day'); // without startOf(day) today will be disabled
          const selected = value ? value.isSame(date) : false;
          // disable date if its less than today or less than or equal minimum date
          const disabled = ((minValue ? date.isSameOrBefore(minValue) : false) ||
          date.isBefore(today)) || (enabled == false ? true : false);
          const cell = {
            value: day,
            disabled, selected,
          }
          row.push(cell);
          day++;
        }
      }

      rows.push(row); // appending each row into calendar body.
    }

    setDaysGrid(rows)
  }, [selectedMonth, value, minValue]);

  /**
   * Handles day click event
   *
   * @param data selected day data
   */
  const daySelected = (e, data) => {
    const date = data.value;
    const { year, month } = selectedMonth;
    const dateStr = moment({year, month, date}).format(); // convert date to string because action payload does't accept dates
    onDateSelected(dateStr); // emit selected date to parent
  };

  /**
   * Handles previous/next arrows click event.
   * increment/decrement selected month
   *
   * @param step {1 | -1} 1: next month, -1: previous month
   */
  const navigateArrowOnClick = step => {
    const index = selectedMonth.index + step;
    // check that index is within months range
    if (index >= 0 && index < 12) {
      setSelectedMonth(months[index]);
    }
  }

  return (
    <div className="Calendar" style={style}>
      <div className="title">{title}</div>

      <div className="navigator">
        <button
        disabled={selectedMonth.text == months[0].text}
        onClick={e => navigateArrowOnClick(-1)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
          </svg>
        </button>

        <div className="dropdown" opened={showOptions.toString()}>
          <div className="anchor" ref={anchorEl} onClick={e => setShowOptions(!showOptions)}>
            <div>{selectedMonth.text}</div>

            {
              !showOptions &&
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
              </svg>
            }

            {
              showOptions &&
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
              </svg>
            }
          </div>

          {
            showOptions &&
            <span>
              <div className="options" style={{width: anchorEl?.current?.offsetWidth || 0}}>
                {
                  months.map((elem, i) => <div key={i} className="option" onClick={e => monthSelected(elem)}>{elem.text}</div>)
                }
              </div>

              <div className="overlay" onClick={e => setShowOptions(false)}></div>
            </span>
          }
        </div>

        <button
        disabled={selectedMonth.text == months[11].text}
        onClick={e => navigateArrowOnClick(1)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
          </svg>
        </button>
      </div>

      <table className="days">
        <thead>
          <tr>
            {
              dayNames.map((elem, i) => <th key={i}>{elem}׳</th>)
            }
          </tr>
        </thead>

        <tbody>
          {
            daysGrid.map((row, i) => <tr key={i}>
              {
                row.map((col, j) => <td key={j}>{
                  col.value &&
                  <button
                  className={col.selected ? 'selected' : ''}
                  onClick={e => daySelected(e, col)}
                  disabled={col.disabled}>
                    {col.value}
                  </button>
                }</td>)
              }
            </tr>)
          }
        </tbody>
      </table>
    </div>
  )
}

export default Calendar;
