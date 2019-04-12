import React from 'react';

import Buton from '../utils/Button';
import FontAwesome from '@fortawesome/react-fontawesome';
import faTruck from '@fortawesome/fontawesome-free-solid/faTruck';
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck';



const ProdInfo = (props) => {
    const detail = props.detail;
    return (
        <div>
            <h1>{detail.brand.name} {detail.name}</h1>
        </div>
    )
}

export default ProdInfo;