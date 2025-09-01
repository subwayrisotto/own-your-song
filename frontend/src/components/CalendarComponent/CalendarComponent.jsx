import React, { useState, useEffect } from 'react';
import styles from './CalendarComponent.module.scss';

const CalendarComponent = ({ currentUser }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventText, setEventText] = useState('');
  const [events, setEvents] = useState({});

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [specialMonth, setSpecialMonth] = useState('');
  const [specialYear, setSpecialYear] = useState('');

  // Get the user's Date of Birth (DOB)
  const userDob = currentUser.dob; 
  const dobMonth = new Date(userDob).getMonth(); 
  const dobDay = new Date(userDob).getDate(); 

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const formatDate = (day) => {
    return `${currentYear}-${currentMonth + 1}-${day < 10 ? `0${day}` : day}`;
  };

  // Mark user's birthday on the calendar each year
  useEffect(() => {
    const newEvents = { ...events };

    const birthdayDate = `${currentYear}-${dobMonth + 1}-${dobDay < 10 ? `0${dobDay}` : dobDay}`;
    if (!newEvents[birthdayDate]) {
      newEvents[birthdayDate] = [`${currentUser.fullName}\'s Birthday`];
    }
    setEvents(newEvents);
  }, [currentYear, currentMonth]);

  const goToNextMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth + 1) % 12);
    if (currentMonth === 11) setCurrentYear((prevYear) => prevYear + 1); // Increment year if going from December to January
  };

  const goToPrevMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth - 1 + 12) % 12);
    if (currentMonth === 0) setCurrentYear((prevYear) => prevYear - 1); // Decrement year if going from January to December
  };

  // Handle event addition
  const handleAddEvent = () => {
    if (selectedDate && eventText) {
      const formattedDate = formatDate(selectedDate);
      const newEvents = { ...events };
      if (!newEvents[formattedDate]) {
        newEvents[formattedDate] = [];
      }
      newEvents[formattedDate].push(eventText);
      setEvents(newEvents);
      setEventText(''); 
    }
  };

  const handleMonthChange = (e) => {
    setCurrentMonth(Number(e.target.value));
  };

  const handleYearChange = (e) => {
    setCurrentYear(Number(e.target.value));
  };

  const handleSpecialDateSubmit = () => {
    if (specialMonth && specialYear) {
      setCurrentMonth(Number(specialMonth) - 1); 
      setCurrentYear(Number(specialYear));
      setShowDatePicker(false);
    }
  };

  const monthOptions = Array.from({ length: 12 }).map((_, idx) => (
    <option key={idx} value={idx + 1}>
      {new Date(0, idx).toLocaleString('default', { month: 'long' })}
    </option>
  ));

  const yearOptions = Array.from({ length: 50 }, (_, index) => currentYear - 25 + index).map((year) => (
    <option key={year} value={year}>{year}</option>
  ));

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <button onClick={goToPrevMonth}>Prev</button>
        
        <div className={styles.monthYearHeader}>
          <h2>
            {`${new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} ${currentYear}`}
          </h2>
        </div>
        
        <button onClick={goToNextMonth}>Next</button>
      </div>

      <div className={styles.monthYearAction}>
        <button onClick={() => setShowDatePicker(!showDatePicker)}>
          {showDatePicker ? 'Cancel' : 'Set Special Month/Year'}
        </button>
        
        {showDatePicker && (
          <div className={styles.specialDatePicker}>
            {/* Month Dropdown */}
            <select
              value={specialMonth}
              onChange={(e) => setSpecialMonth(e.target.value)}
              placeholder="Month"
            >
              <option value="" disabled>Select Month</option>
              {monthOptions}
            </select>
            
            {/* Year Dropdown */}
            <select
              value={specialYear}
              onChange={(e) => setSpecialYear(e.target.value)}
              placeholder="Year"
            >
              <option value="" disabled>Select Year</option>
              {yearOptions}
            </select>
            
            <button onClick={handleSpecialDateSubmit}>Set Date</button>
          </div>
        )}
      </div>

      <div className={`${styles.calendarGrid} `}>
        {Array.from({ length: 7 }).map((_, idx) => (
          <div key={idx} className={styles.calendarHeader}>{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][idx]}</div>
        ))}

        {Array.from({ length: new Date(currentYear, currentMonth, 1).getDay() }).map((_, idx) => (
          <div key={`empty-${idx}`} className={`${styles.calendarCell} ${styles.empty}`}></div>
        ))}

        {Array.from({ length: daysInMonth }, (_, idx) => idx + 1).map((day) => {
        const isToday =
            day === new Date().getDate() &&
            currentMonth === new Date().getMonth() &&
            currentYear === new Date().getFullYear();

        return (
            <div
            key={day}
            className={`${styles.calendarCell} ${isToday ? styles.today : ''}`}
            onClick={() => setSelectedDate(day)}
            >
            <div className={styles.dayNumber}>{day}</div>
            {events[formatDate(day)] && events[formatDate(day)].map((event, i) => (
                <div
                key={i}
                className={styles.event}
                >
                {event.length > 15 ? `${event.slice(0, 15)}...` : event}
                </div>
            ))}
            </div>
        );
        })}
      </div>

      {selectedDate && (
        <div className={styles.eventForm}>
          <h3>Add Event for {selectedDate} {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })}</h3>
          <input 
            value={eventText}
            onChange={(e) => setEventText(e.target.value)}
            placeholder="Event name"
          />
          <button onClick={handleAddEvent}>Add Event</button>
        </div>
      )}
    </div>
  );
};

export default CalendarComponent;