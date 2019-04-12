import React from 'react';

import Buton from '../utils/Button';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTruck from '@fortawesome/fontawesome-free-solid/faTruck';
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck';



const ProdInfo = (props) => {

    const showProdTags = (detail) => (
        <div className="product_tags">
            {detail.shipping ? 
            <div className="tag">
                <div><FontAwesomeIcon icon={faTruck} /></div>
                <div className="tag_text">
                    <div>Free shiping</div>
                    <div>And return</div>
                </div>
            </div>
            :null
        }

        { detail.available ? 
            <div className="tag">
                <div><FontAwesomeIcon icon={faCheck} /></div>
                <div className="tag_text">
                    <div>Available</div>
                    <div>In Store</div>
                </div>
            </div>
        :
            <div className="tag">
                    <div><FontAwesomeIcon icon={faCheck} /></div>
                    <div className="tag_text">
                        <div>Not Available</div>
                        <div>Preordr Only</div>
                    </div>
            </div>
        } 
        
        </div>
    )
    const detail = props.detail;
    
    return (
        <div>
            <h1>{detail.brand.name} {detail.name}</h1>
            <p>
                {detail.description}
            </p>
            {showProdTags(detail)}
        </div>
    )
}

export default ProdInfo;