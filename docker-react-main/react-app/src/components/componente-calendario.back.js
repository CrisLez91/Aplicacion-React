import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


class CustomCalendar extends DatePicker {
  handleKeyDown = (event) => {
    // Override the handleKeyDown method to prevent clearing the date with the keyboard
    if (event.key === 'Backspace' || event.key === 'Delete') {
      event.stopPropagation();
      return;
    }
    super.handleKeyDown(event);
  };

  render() {
    return (
      <div className="custom-calendar">
        <DatePicker
          {...this.props}
          onKeyDown={this.handleKeyDown}
        />
      </div>
    );
  }
}

export default CustomCalendar;