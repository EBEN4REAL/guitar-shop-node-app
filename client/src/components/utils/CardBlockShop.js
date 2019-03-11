import React from 'react';
import Card from '../utils/Card';

const  CardBlockShop = (props) => {
    console.log(props.products);

    const renderCard  = () => (
        props.products ?
            props.products.map(card => (
                <Card
                    key={card._id}
                    {...card} />
            ))
        :null
    )
    return (
        <div className="card_block_shop">
            <div>
                <div>
                    {props.products ? 
                        props.products.length === 0 ? 
                            <div className="no_result">
                                Sorry, No results
                            </div>
                        :null
                    :null }
                    {renderCard(props.products)}
                </div>
            </div>
        </div>
    )
}

export default CardBlockShop
