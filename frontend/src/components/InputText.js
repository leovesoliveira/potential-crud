import React from 'react';

export default function InputText(props) {

    return (
        <label className={'w-full flex items-center ' + props.labelClassName}>
            { props.label ? (
                <span className="w-48 text-lg text-gray-700 text-right mr-2 flex-shrink-0">
                    {props.label}
                </span>
            ) : ('') }

            <input
                type="text"
                onChange={props.onChange}
                value={props.value}
                placeholder={props.placeholder}
                className={'w-full py-2 px-4 rounded shadow text-gray-700 ' + props.className}
                required={props.required}
            />
        </label>
    );
}
