import React, {Component}  from 'react';
import Button from './Button';


class Card extends Component {
    renderCardImage(images){
        if(images.length > 0){
            return images[0].url
        }else{
            return '/images/image_not_availble.png'
        }
    }
    render(){
        const props = this.props;
        return (
            <div className={`card_item_wrapper ${props.grid}`}>
                <div className="image"
                    style={{ 
                        background: `url(${this.renderCardImage(props.images)}) no-repeat`
                     }}>
                </div>
                <div className="action_container">
                     <div className="tags">
                        <div className="brand">
                            {this.props.brand.name}
                        </div>
                        <div className="name">
                            {this.props.name}
                        </div>
                        <div className="title">
                            ${this.props.price}
                        </div>
                     </div>
                </div>
                {
                    props.grid ? 
                        <div className="description">
                                Something is here
                        </div>
                    : null
                }
                <div className="actions">
                    <div className="button_wrapp">
                        <Button 
                            type="default"
                            title="view product"
                            altClass="card_link"
                            linkTo={`/product_detail/${props._id}`}
                            addStyles={{ 
                                margin: '10px 0 0 0'
                             }}
                            />
                    </div>
                    <div className="button_wrapp">
                        <Button 
                            type="bag_link"
                            run_action={() => {console.log('Added to cart')}}
                            altClass="card_link"
                            linkTo={`/product_detail/${props._id}`}
                            addStyles={{ 
                                margin: '10px 0 0 0'
                             }}
                            />
                    </div>
                </div>
            </div>
        )
    }
}
export default Card


