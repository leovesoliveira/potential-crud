import React, { useEffect, useState } from 'react';

import api from '../services/api';
import Title from '../components/Title';
import InputText from '../components/InputText';
import Select from '../components/Select';
import GenderIcon from '../components/GenderIcon';
import Pagination from 'react-js-pagination';

export default function Home({ history }) {
    const [developers, setDevelopers] = useState([]);
    const [pagination, setPagination] = useState({ total: 1 });
    const [params, setParams] = useState({ page: 1 });

    async function fetchDevelopers() {
        const response = await api.get('/developers', { params });
        setDevelopers(response.data.data);
        setPagination(response.data.meta);
    }

    useEffect(() => {
        fetchDevelopers();
    }, [params]);

    function handleCreate(e) {
        e.preventDefault();
        history.push('/create')
    }

    function handleEdit(id) {
        history.push(`/edit/${id}`)
    }

    function handleDelete(id) {
        async function deleteDevelopers() {
            await api.delete(`/developers/${id}`);
            await fetchDevelopers()
        }
        deleteDevelopers()
    }

    return (
        <div>
            <div className="flex flex-wrap justify-between items-center px-2">
                <Title />

                <button
                    onClick={handleCreate}
                    className="bg-teal-500 rounded shadow px-4 py-1 text-white font-bold hover:bg-teal-400"
                >
                    Adicionar desenvolvedor
                </button>

                <div className="w-full flex justify-between py-4">
                    <InputText
                        onChange={event => setParams({ ...params, search: event.target.value })}
                        value={params.search}
                        placeholder="Pesquise por Nome ou Hobby"
                        labelClassName="max-w-sm"
                    />

                    <Select
                        label="Gênero:"
                        onChange={event => setParams({ ...params, gender: event.target.value })}
                        value={params.gender}
                    >
                        <option value="">Todos</option>
                        <option value="f">Feminino</option>
                        <option value="m">Masculino</option>
                    </Select>
                </div>
            </div>

            { developers.length > 0 ? (
                <div className="flex flex-wrap">
                    {developers.map(developer => (
                        <div key={developer.id} className="w-1/3">
                            <div className="bg-white m-2 p-4 rounded shadow flex items-center">
                                <GenderIcon gender={developer.gender} />

                                <div>
                                    <p className="text-teal-800 text-xl leading-none mb-1">
                                        {developer.name}
                                    </p>

                                    <p className="text-gray-600 text-sm leading-none">
                                        {developer.age} anos • Hobby: {developer.hobby}
                                    </p>

                                    <div className="flex">
                                        <button
                                            onClick={() => handleEdit(developer.id)}
                                            className="text-sm text-gray-600 underline mr-2 hover:text-teal-500"
                                        >
                                            editar
                                        </button>

                                        <button
                                            onClick={() => handleDelete(developer.id)}
                                            className="text-sm text-gray-600 underline hover:text-red-500"
                                        >
                                            excluir
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    <p className="text-gray-500 text-3xl text-center font-bold leading-none py-24">
                        Nenhum desenvolvedor encontrado =/
                    </p>
                </div>
            ) }

            <Pagination
                activePage={pagination.current_page}
                itemsCountPerPage={pagination.per_page}
                totalItemsCount={pagination.total}
                pageRangeDisplayed={5}
                onChange={pageNumber => setParams({ ...params, page: pageNumber })}
                innerClass="flex justify-end px-2"
                linkClass="text-gray-500 text-sm font-bold block py-1 px-3 m-2 rounded"
                activeLinkClass="bg-white shadow text-gray-600"
            />
        </div>
    );
}
