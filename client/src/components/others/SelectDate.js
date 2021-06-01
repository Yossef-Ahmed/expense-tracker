import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types'

import {chunkArrayInGroups, findMonthBegging, formatDate} from '../../utils/index';
import InputField from '../Reuseable/InputField';
import Modal from '../Reuseable/Modal'

const SelectDate = props => {
    const {saveValue} = props;

    const [modal, setModal] = useState(false);
    const [date, setDate] = useState(new Date());
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
    const [view, setView] = useState('Days');

    const toggleModal = () => {
        setModal(prevModal => !prevModal)
    }

    const changeView = e => {
        let currView = view;
        let mode = e.target.dataset.mode;
        
        if (mode === "direct") {
            currView = e.target.dataset.view;
        } else if (mode === "backwards") {
            if (currView === "Days") {
                currView = "Months";
            } else if (currView === "Months") {
                currView = "Years";
            }
        }
        
        setView(currView);
    }

    const nextView = () => {
        let currView = view;
        
        if (currView === "Years") {
            currView = "Months";
        } else if (currView === "Months") {
            currView = "Days";
        }
        
        setView(currView);
    }

    const chooseYear = e => {
        setYear(e.target.textContent)
        setMonth('');
        setDay('');
        nextView();
    }

    const chooseMonth = e => {
        setMonth(new Date(parseInt(e.target.dataset.date)).getMonth());
        setDay('');
        nextView();
    }

    const chooseDate = e => {
        const date = new Date(parseInt(e.target.dataset.date));
        
        setDay(date.getDate());
        setDate(date)
        saveValue("date", date.getTime());
        toggleModal();
    }

    const nextSlide = () => {
        if (view === "Months") {
            setYear(year + 1)
        } else if (view === "Days") {
            if (month === 11) {
                setYear(year + 1)
                setMonth(0)
            } else {
                setMonth(month + 1)
            }
        }
    }

    const prevSlide = () => {
        if (view === "Months") {
            setYear(year - 1)
        } else if (view === "Days") {
            if (month === 0) {
                setYear(year - 1)
                setMonth(11)
            } else {
                setMonth(month - 1)
            }
        }
    }

    useEffect(() => {
        if (props.date) {
            setDate(new Date(parseInt(props.date)))
        }
    }, [props.date, setDate]);

    useEffect(() => {
        if (year === '' && month === '' && day === '') {
            setYear(date.getFullYear());
            setMonth(date.getMonth());
            setDay(date.getDate());
        }
    }, [date, year, month, day, setYear, setMonth, setDay]);

    useEffect(() => {
        if (view === "Years") {
            document.querySelector(".years-list li.active-btn").previousElementSibling.previousElementSibling.previousElementSibling.scrollIntoView();
        }
    }, [view]);

    const selectedDay = day !== "" ? day : 1;
    const currDate = new Date(new Date().setFullYear(year, month, selectedDay));

    return (
        <Fragment>
            <InputField label="Date" noInput={true} onClick={toggleModal} >
                <div className="input-field__input">
                    {formatDate(date)}
                </div>
            </InputField>

            <Modal isOpen={modal} toggleModal={toggleModal} modalCustomClass="modal-date">
                <div className="modal-header">
                    <div className="date-title">
                        <div className="date-year" onClick={changeView} data-mode="direct" data-view="Years">
                            {year}
                        </div>
                        <div className="date-full" onClick={changeView} data-mode="direct" data-view="Days">
                            {date.toLocaleDateString("en-US", {weekday: 'short', month: 'short', day: 'numeric'})}
                        </div>
                    </div>
                </div>

                <div className="modal-body">
                    {(() => {
                        if (view === "Days" || view === "Months") {
                            return (
                                <div className="date-slider">
                                    <div className="date-slider-btn slider-prev" onClick={prevSlide}>
                                        <i className="fas fa-angle-left"></i>
                                    </div>
                                    <div className="date-slider-current" onClick={changeView} data-mode="backwards">
                                        {view === "Days" ? currDate.toLocaleDateString("en-US", {month: 'long', year: 'numeric'}) : year}
                                    </div>
                                    <div className="date-slider-btn slider-next" onClick={nextSlide}>
                                        <i className="fas fa-angle-right"></i>
                                    </div>
                                </div>
                            );
                        }
                    })()}
                    {(() => {
                        if (view === "Days") {
                            const lastDayOfCurrMonth = new Date(new Date().setFullYear(currDate.getFullYear(), currDate.getMonth() + 1, 0)).getDate();
                            
                            let days = [];
                            let start = 1;
                            for (; start <= lastDayOfCurrMonth; start++) {
                                days.push({num: start, date: new Date(new Date().setFullYear(year, month, start))});
                            }
                            
                            days = findMonthBegging(days);
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
                                                                    <button onClick={chooseDate} className={`date-picker-btn ${isActive ? "active-btn" : null}`} data-date={day.date.getTime()}>
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
                            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                            
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
                                                                <button onClick={chooseMonth} className={`date-picker-btn ${isActive ? "active-btn" : null}`} data-date={monDate.getTime()}>
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
                                            <li onClick={chooseYear} className={ele === thisYear ? "active-btn" : null}>{ele}</li>
                                        ))}
                                    </ul>
                                </div>
                            );
                        }
                    })()}
                </div>
                <div className="modal__btns">
                    <button className="btn btn--color-green btn--no-bg btn--sm" onClick={toggleModal}>Cancel</button>
                </div>
            </Modal>
        </Fragment>
    )
}

SelectDate.propTypes = {
    saveValue: PropTypes.func.isRequired
}

export default SelectDate

