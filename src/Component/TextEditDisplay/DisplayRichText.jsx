import React from "react";

const DisplayRichText = ({ content }) => {
    return (
        <div
            dangerouslySetInnerHTML={{ __html: content }}
            style={{ wordWrap: "break-word" }}
        />
    );
};

export default DisplayRichText;