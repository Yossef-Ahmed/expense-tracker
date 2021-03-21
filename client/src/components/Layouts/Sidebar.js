import React, { Component } from 'react';

export class Sidebar extends Component {
    render() {
        return (
            <aside className="sidebar">
                <ul className="sidebar-items">
                    <li className="sidebar-item active">
                        <i className="fas fa-wallet"></i>
                        <span>Transactions</span>
                    </li>
                    <li className="sidebar-item">
                        <i className="fas fa-cubes"></i>
                        <span>Categories</span>
                    </li>
                    <hr className="sidebar-border"/>
                    <li className="sidebar-item">
                        <i className="fas fa-sign-out-alt"></i>
                        <span>Logout</span>
                    </li>
                </ul>
            </aside>
        )
    }
}

export default Sidebar;

// Sidebar Style
// .sidebar {
//     grid-area: m;
//     display: flex;
//     background-color: #fff;
//     position: sticky;
//     top: 0;
//     height: 100vh;
//     box-shadow: 0 3px 7px 0 rgba(0,0,0,.27);
//     z-index: 200;
//     &-items {
//         width: 100%;
//     }
//     &-item {
//         padding: 13px 0;
//         cursor: pointer;
//         display: flex;
//         flex-direction: column;
//         align-items: center;
//         color: rgba(0,0,0,.54);
//         &:hover {
//             background: rgba(0,0,0,.04);
//         }
//         i {
//             font-size: 22px;
//             margin-bottom: 10px;
//         }
//         span {
//             font-size: 12px;
//             line-height: 16px;
//         }
//         &.active {
//             color: #2db84c;
//             &:hover {
//                 background: inherit;
//             }
//         }
//     }
// }