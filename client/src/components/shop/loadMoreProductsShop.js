import React from 'react';

import CardBlockShop from '../utils/CardBlockShop';

const loadMore = (props) => {
    return (
       <div>
           <div>
                <CardBlockShop
                    grid={props.grid}
                    products={props.products}
                />
           </div>
           <div className="load_more_container">
                <span onClick={() => props.loadMore()}>
                    Load More
                </span>
           </div>
       </div> 
    )
}

export default loadMore;