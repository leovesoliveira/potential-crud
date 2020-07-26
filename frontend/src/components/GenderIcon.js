import React from 'react';

import manIcon from '../assets/images/man.svg';
import womanIcon from '../assets/images/woman.svg';

export default function GenderIcon({ gender }) {
    if (gender === 'f') {
        return <img className="w-16 h-auto mr-4" width="64" src={womanIcon} alt="Ícone Feminino"/>;
    } else {
        return <img className="w-16 h-auto mr-4" width="64" src={manIcon} alt="Ícone Masculino"/>
    }
}
