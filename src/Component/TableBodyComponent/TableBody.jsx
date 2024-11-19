import PropTypes from 'prop-types';
import React from 'react';

const TableBody = ({rows}) => {
    const handleActionClick = (action, item) => {
        if (action.onClick) {
            action.onClick(item);
        }
    };
    return (
        <>
            {rows.map((row, index) => (
                <tr key={index}>
                    {row.data.map((cell, cellIndex) => (
                        <td key={cellIndex}>{cell}</td>
                    ))}
                    <td>
                        {row.actions.map((action, actionIndex) => (
                            <button
                                type="button"
                                className={`btn mx-1 ${action.className}`}
                                key={actionIndex}
                                onClick={() => handleActionClick(action, row)}
                            >
                                <i className={`${action.icon}`}></i>
                            </button>
                        ))}
                    </td>
                </tr>
            ))}
        </>
    )
}
TableBody.propTypes = {
    rows: PropTypes.arrayOf(
        PropTypes.shape({
            data: PropTypes.arrayOf(
                PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.object // Cập nhật điều này để phản ánh các loại thực tế
                ])
            ).isRequired,
            actions: PropTypes.arrayOf(
                PropTypes.shape({
                    className: PropTypes.string.isRequired,
                    icon: PropTypes.string.isRequired,
                    onClick: PropTypes.func // Xử lý sự kiện nhấp chuột
                })
            ).isRequired
        })
    ).isRequired
}
export default TableBody;