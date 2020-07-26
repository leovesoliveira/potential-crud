import React, { useState, useEffect } from 'react';

import api from '../services/api';
import Title from '../components/Title';
import InputText from '../components/InputText';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default function Edit({ history, match }) {
    const [developer, setDeveloper] = useState({});
    const [data, setData] = useState({
        name: '',
        gender: '',
        hooby: '',
        birthdate: null,
    });

    useEffect(() => {
        async function fetchDeveloper() {
            const response = await api.get(`/developers/${match.params.id}`);

            const data = { ...response.data.data };
            data.birthdate = new Date(data.birthdate);

            setDeveloper(data);
            setData(data);
        }

        fetchDeveloper();
    }, []);

    function handleSubmit(e) {
        e.preventDefault();

        async function editDevelopers() {
            await api.put(`/developers/${match.params.id}`, data);
        }
        editDevelopers()

        history.push('/')
    }

    return (
        <div>
            <div className="flex flex-wrap justify-between items-center px-2">
                <Title subtitle={'Editando ' + developer.name} />
            </div>

            <form onSubmit={handleSubmit} className="mx-2 mt-4 flex flex-col items-start">
                <InputText
                    onChange={e => setData({ ...data, name: e.target.value })}
                    value={data.name}
                    label="Nome:"
                    labelClassName="max-w-3xl my-4"
                    placeholder="Digite seu nome..."
                    required="true"
                />

                <div className="flex my-4 items-center">
                    <span className="w-48 text-lg text-gray-700 text-right mr-2 flex-shrink-0">
                        Gênero:
                    </span>

                    <label className="mx-4">
                        <input required checked={developer.gender === 'f'} onChange={e => setData({ ...data, gender: e.target.value })} value="f" className="w-4 h-4 bg-teal-500" type="radio" name="gender" />
                        <span className="ml-2 text-lg text-gray-700">Feminino</span>
                    </label>

                    <label className="mx-4">
                        <input required checked={developer.gender === 'm'} onChange={e => setData({ ...data, gender: e.target.value })} value="m" className="w-4 h-4 bg-teal-500" type="radio" name="gender" />
                        <span className="ml-2 text-lg text-gray-700">Masculino</span>
                    </label>
                </div>

                <InputText
                    onChange={e => setData({ ...data, hobby: e.target.value })}
                    value={data.hobby}
                    label="Hobby:"
                    labelClassName="max-w-lg my-4"
                    placeholder="Digite o seu hooby..."
                    required="true"
                />

                <label className="flex my-4 items-center">
                    <span className="w-48 text-lg text-gray-700 text-right mr-2 flex-shrink-0">
                        Data de nascimento:
                    </span>

                    <DatePicker
                        selected={data.birthdate}
                        onChange={birthdate => setData({ ...data, birthdate })}
                        className="w-full py-2 px-4 rounded shadow text-gray-700"
                        placeholderText="Selecione uma data..."
                        required
                    />
                </label>

                <div className="ml-48 px-2">
                    <button
                        type="submit"
                        className=" my-4 bg-teal-500 rounded shadow px-6 py-2 text-white font-bold hover:bg-teal-400"
                    >
                        Salvar
                    </button>
                </div>
            </form>
        </div>
    );
}
