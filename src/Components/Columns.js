import React from "react";

export const Columns = (props) => {
    return (
        <tr>
            <td className="TableName">{props.Name}</td>
            <td className="TableEmail">{props.Email}</td>
            <td className="TableBatch">{props.Batch}</td>
        </tr>
    );
};
