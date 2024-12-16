// utils/renderFunctions.js

import React from 'react';
import { Tag} from 'antd';
export const statusRender = (status) => {
    let color = "";
    let displayStatus = "";
    switch (status.toLowerCase()) {
        case "active":
            color = "green";
            displayStatus = "Hoạt động";
            break;
        case "inactive":
            color = "volcano";
            displayStatus = "Tạm ngưng";
            break;
        default:
            color = "geekblue";
            displayStatus = status.toUpperCase();
    }
    return (
        <Tag color={color} key={status}>
            {displayStatus}
        </Tag>
    );
};
