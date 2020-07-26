import React from 'react';

export default function Title({ title, subtitle }) {
    return (
        <div className="flex items-center mb-1">
            <h1 className="text-teal-500 text-3xl font-bold leading-none mr-2">{title ? title : 'PotencialCRUD'}</h1>
            <h2 className="text-gray-500 text-2xl leading-none mr-2">{subtitle ? subtitle : ''}</h2>
        </div>
    );
}
