import React from 'react';

export default function Select(props) {
    return (
        <label className="flex items-center">
            <span className="text-lg text-gray-700 mr-2">
                {props.label}
            </span>

            <select
                onChange={props.onChange}
                value={props.value}
                className={'py-2 px-4 rounded shadow text-gray-700 ' + props.className}
            >
                {props.children}
            </select>
        </label>
    );
}
