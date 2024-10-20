import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openDialog, closeDialog, setDepartureDate, setReturnDate } from '../redux/reducers/datepickerSlice';
import { useIntl } from 'react-intl';
import closeIcon from '../img/close3.svg';
import Calendar from './calendar';
import moment from 'moment';

const DatePicker = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  // show/hide datepicker dialog
  const showDialog = useSelector(state => state.datepicker.show);
  let departureDate = useSelector(state => state.datepicker.departureDate);
  let returnDate = useSelector(state => state.datepicker.returnDate);
  // convert string dates to moment objects
  departureDate = departureDate ? moment(departureDate) : departureDate;
  returnDate = returnDate ? moment(returnDate) : returnDate;

  return (
    <div className="Date-picker">
      <div className="icon-item" onClick={e => dispatch(openDialog())}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
          <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zm9.954 3H2.545c-.3 0-.545.224-.545.5v1c0 .276.244.5.545.5h10.91c.3 0 .545-.224.545-.5v-1c0-.276-.244-.5-.546-.5zM8.5 7a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zM3 10.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z"/>
        </svg>

        <span>{intl.formatMessage({id: 'pickDate'})}</span>
      </div>

      {
        departureDate &&
        <div className="icon-item dr-date">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
            <path d="M6.428 1.151C6.708.591 7.213 0 8 0s1.292.592 1.572 1.151C9.861 1.73 10 2.431 10 3v3.691l5.17 2.585a1.5 1.5 0 0 1 .83 1.342V12a.5.5 0 0 1-.582.493l-5.507-.918-.375 2.253 1.318 1.318A.5.5 0 0 1 10.5 16h-5a.5.5 0 0 1-.354-.854l1.319-1.318-.376-2.253-5.507.918A.5.5 0 0 1 0 12v-1.382a1.5 1.5 0 0 1 .83-1.342L6 6.691V3c0-.568.14-1.271.428-1.849Zm.894.448C7.111 2.02 7 2.569 7 3v4a.5.5 0 0 1-.276.447l-5.448 2.724a.5.5 0 0 0-.276.447v.792l5.418-.903a.5.5 0 0 1 .575.41l.5 3a.5.5 0 0 1-.14.437L6.708 15h2.586l-.647-.646a.5.5 0 0 1-.14-.436l.5-3a.5.5 0 0 1 .576-.411L15 11.41v-.792a.5.5 0 0 0-.276-.447L9.276 7.447A.5.5 0 0 1 9 7V3c0-.432-.11-.979-.322-1.401C8.458 1.159 8.213 1 8 1c-.213 0-.458.158-.678.599Z"/>
          </svg>

          <span>{intl.formatMessage({id: 'departureDate'})} <b>{departureDate.format('YYYY-MM-DD')}</b></span>
        </div>
      }

      {
        returnDate &&
        <div className="icon-item dr-date">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" style={{rotate: '180deg'}}>
            <path d="M6.428 1.151C6.708.591 7.213 0 8 0s1.292.592 1.572 1.151C9.861 1.73 10 2.431 10 3v3.691l5.17 2.585a1.5 1.5 0 0 1 .83 1.342V12a.5.5 0 0 1-.582.493l-5.507-.918-.375 2.253 1.318 1.318A.5.5 0 0 1 10.5 16h-5a.5.5 0 0 1-.354-.854l1.319-1.318-.376-2.253-5.507.918A.5.5 0 0 1 0 12v-1.382a1.5 1.5 0 0 1 .83-1.342L6 6.691V3c0-.568.14-1.271.428-1.849Zm.894.448C7.111 2.02 7 2.569 7 3v4a.5.5 0 0 1-.276.447l-5.448 2.724a.5.5 0 0 0-.276.447v.792l5.418-.903a.5.5 0 0 1 .575.41l.5 3a.5.5 0 0 1-.14.437L6.708 15h2.586l-.647-.646a.5.5 0 0 1-.14-.436l.5-3a.5.5 0 0 1 .576-.411L15 11.41v-.792a.5.5 0 0 0-.276-.447L9.276 7.447A.5.5 0 0 1 9 7V3c0-.432-.11-.979-.322-1.401C8.458 1.159 8.213 1 8 1c-.213 0-.458.158-.678.599Z"/>
          </svg>

          <span>{intl.formatMessage({id: 'returnDate'})} <b>{returnDate.format('YYYY-MM-DD')}</b></span>
        </div>
      }

      {
        showDialog &&
        <div className="dialog">
          <div className="window">
            <div className="close">
              <img src={closeIcon} alt="close" onClick={e => dispatch(closeDialog())}/>
            </div>

            <div className="calendar-container">
              <Calendar
                style={{borderInlineEnd: '1px solid'}}
                value={departureDate}
                title={intl.formatMessage({id: 'departureDate'})}
                onDateSelected={value => {
                  dispatch(setDepartureDate(value));
                  // if departureDate is gte returnDate then clear returnDate
                  const departureDate = moment(value);
                  if (returnDate && returnDate?.isSameOrBefore(departureDate)) {
                    dispatch(setReturnDate(null));
                  }
                }}
              />

              <Calendar
                value={returnDate}
                minValue={departureDate}
                enabled={departureDate ? true : false}
                title={intl.formatMessage({id: 'returnDate'})}
                onDateSelected={value => {
                  dispatch(setReturnDate(value));
                  dispatch(closeDialog());
                }}
              />
            </div>

            <div className="hints">
              <div className="item">
                <div className="badge" style={{background: '#d8eaea'}}></div>

                <span>{intl.formatMessage({id: 'availableDates'})}</span>
              </div>

              {
                departureDate &&
                <div className="item">
                  <div className="badge" style={{background: '#ffe9f1'}}></div>

                  <span>{intl.formatMessage({id: 'unavailableDates'})}</span>
                </div>
              }
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default DatePicker
