import React, { Component, Fragment } from 'react';
import {chunkArrayInGroups, findMonthBegging, formatDate} from '../../utils/index';
import {CSSTransition} from 'react-transition-group';
import PropTypes from 'prop-types';

export class SelectDate extends Component {
    state = {
        modal: false,
        date: new Date(),
        year: '',
        month: '',
        day: '',
        view: 'Days'
    }
    static propTypes = {
        saveValue: PropTypes.func.isRequired
    }
    static getDerivedStateFromProps(props, state) {
        if (props.date) {
            state.date = new Date(parseInt(props.date));
        }
        if (state.year === '' && state.month === '' && state.day === '') {
            state.year = state.date.getFullYear();
            state.month = state.date.getMonth();
            state.day = state.date.getDate();
        }
        return state;
    }
    componentDidUpdate() {
        // If the viwe is Years, then scroll to the selected year
        if (this.state.view === "Years") {
            document.querySelector(".years-list li.active-btn").previousElementSibling.previousElementSibling.previousElementSibling.scrollIntoView();
        }
    }
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }
    changeView = e => {
        // Initiate variables
        let currView = this.state.view;
        let mode = e.target.dataset.mode;
        // Check the mode & set the currView
        if (mode === "direct") {
            currView = e.target.dataset.view;
        } else if (mode === "backwards") {
            if (currView === "Days") {
                currView = "Months";
            } else if (currView === "Months") {
                currView = "Years";
            }
        }
        // Set the state.view
        this.setState({view: currView});
    }
    nextView = () => {
        // Initiate variables
        let currView = this.state.view;
        // Check & Set the current view
        if (currView === "Years") {
            currView = "Months";
        } else if (currView === "Months") {
            currView = "Days";
        }
        // Set the state
        this.setState({view: currView});
    }
    chooseYear = e => {
        this.setState({year: e.target.textContent, month: '', day: ''});
        this.nextView();
    }
    chooseMonth = e => {
        this.setState({month: new Date(parseInt(e.target.dataset.date)).getMonth(), day: ''});
        this.nextView();
    }
    chooseDate = e => {
        const date = new Date(parseInt(e.target.dataset.date));
        this.setState({day: date.getDate(), date: date});
        this.props.saveValue("date", date.getTime());
        this.toggle();
    }
    nextSlide = () => {
        // Initiate variables
        const {view, year, month} = this.state;
        if (view === "Months") {
            this.setState({year: year + 1});
        } else if (view === "Days") {
            if (month === 11) {
                this.setState({year: year + 1, month: 0});
            } else {
                this.setState({month: month + 1});
            }
        }
    }
    prevSlide = () => {
        // Initiate variables
        const {view, year, month} = this.state;
        if (view === "Months") {
            this.setState({year: year - 1});
        } else if (view === "Days") {
            if (month === 0) {
                this.setState({year: year - 1, month: 11});
            } else {
                this.setState({month: month - 1});
            }
        }
    }
    handleClickOutside = e => {
        if (e.target.classList.contains('modal-container') && e.target.firstElementChild.classList.contains('modal-date-container')) {
            this.toggle();
        }
    }
    render() {
        // Get the stat
        const {date, year, month, view, modal} = this.state;
        const selectedDay = this.state.day !== "" ? this.state.day : 1;
        const currDate = new Date(new Date().setFullYear(year, month, selectedDay));
        return (
            <Fragment>
                <div className="form-group select-date" onClick={this.toggle}>
                    <p className="form-label">Date</p>
                    <div className="form-control">
                        {formatDate(date)}
                    </div>
                </div>
                <CSSTransition in={modal} timeout={400} unmountOnExit classNames="modal-fade">
                    <div className="modal-container" onClick={this.handleClickOutside}>
                        <div className="modal-date-container">
                            <div className="modal modal-date">
                                <div className="modal-header">
                                    <div className="date-title">
                                        <div className="date-year" onClick={this.changeView} data-mode="direct" data-view="Years">
                                            {year}
                                        </div>
                                        <div className="date-full" onClick={this.changeView} data-mode="direct" data-view="Days">
                                            {date.toLocaleDateString("en-US", {weekday: 'short', month: 'short', day: 'numeric'})}
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-body">
                                    {(() => {
                                        // Print the slider
                                        if (view === "Days" || view === "Months") {
                                            return (
                                                <div className="date-slider">
                                                    <div className="date-slider-btn slider-prev" onClick={this.prevSlide}>
                                                        <i className="fas fa-angle-left"></i>
                                                    </div>
                                                    <div className="date-slider-current" onClick={this.changeView} data-mode="backwards">
                                                        {view === "Days" ? currDate.toLocaleDateString("en-US", {month: 'long', year: 'numeric'}) : year}
                                                    </div>
                                                    <div className="date-slider-btn slider-next" onClick={this.nextSlide}>
                                                        <i className="fas fa-angle-right"></i>
                                                    </div>
                                                </div>
                                            );
                                        }
                                    })()}
                                    {(() => {
                                        // Print the views
                                        if (view === "Days") {
                                            // Get last day
                                            const lastDay = new Date(new Date().setFullYear(currDate.getFullYear(), currDate.getMonth() + 1, 0)).getDate();
                                            // Make the days array
                                            let days = [];
                                            let start = 1;
                                            for (; start <= lastDay; start++) {
                                                days.push({num: start, date: new Date(new Date().setFullYear(year, month, start))});
                                            }
                                            // Get the month begging
                                            days = findMonthBegging(days);
                                            // Chunk the array into groups of 7
                                            days = chunkArrayInGroups(days, 7);
                                            return (
                                                <div className="date-picker">
                                                    <table className="days-table">
                                                        <thead>
                                                            <tr>
                                                                <th>S</th>
                                                                <th>M</th>
                                                                <th>T</th>
                                                                <th>W</th>
                                                                <th>T</th>
                                                                <th>F</th>
                                                                <th>S</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {days.map(week => (
                                                                <tr>
                                                                    {week.map(day => {
                                                                        if (day !== "") {
                                                                            const isActive = day.date.getDate() === date.getDate() && day.date.getMonth() === date.getMonth() && day.date.getFullYear() === date.getFullYear() ? true : false;
                                                                            return (
                                                                                <td>
                                                                                    <button onClick={this.chooseDate} className={`date-picker-btn ${isActive ? "active-btn" : null}`} data-date={day.date.getTime()}>
                                                                                        {day.num}
                                                                                    </button>
                                                                                </td>
                                                                            );
                                                                        } else {
                                                                            return <td></td>;
                                                                        }
                                                                    })}
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            );
                                        } else if (view === "Months") {
                                            // Initiate the months array
                                            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                                            // Chunk the array into groups of 3
                                            let monthsChunked = chunkArrayInGroups(months, 3);
                                            return (
                                                <div className="date-picker">
                                                    <table className="months-table">
                                                        <tbody>
                                                            {monthsChunked.map(row => (
                                                                <tr>
                                                                    {row.map(mon => {
                                                                        let monDate = new Date(new Date().setFullYear(year, months.indexOf(mon), 1));
                                                                        const isActive = monDate.getMonth() === date.getMonth() && monDate.getFullYear() === date.getFullYear() ? true : false;
                                                                        return (
                                                                            <td>
                                                                                <button onClick={this.chooseMonth} className={`date-picker-btn ${isActive ? "active-btn" : null}`} data-date={monDate.getTime()}>
                                                                                    {mon}
                                                                                </button>
                                                                            </td>
                                                                        );
                                                                        
                                                                    })}
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            );
                                        } else if (view === "Years") {
                                            // Make the years list
                                            const thisYear = parseInt(year);
                                            let start = thisYear - 100;
                                            let years = [];
                                            for (; start <= thisYear + 100; start++) {
                                                years.push(start);
                                            }
                                            return (
                                                <div className="date-picker date-picker-years">
                                                    <ul className="years-list">
                                                        {years.map(ele => (
                                                            <li onClick={this.chooseYear} className={ele === thisYear ? "active-btn" : null}>{ele}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            );
                                        }
                                    })()}
                                </div>
                                <div className="modal-buttons">
                                    <button className="btn btn-secondary btn-no-bg" onClick={this.toggle}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </CSSTransition>
            </Fragment>
        )
    }
}

export default SelectDate;
