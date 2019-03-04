 import  React from  'react';
import Button from '../utils/Button';

const HomePromotion = (props) => {

    const promotion = {
            img:'/images/featured/featured_home_3.jpg',
            lineOne:'Up to 40% off',
            lineTwo:'In second',
            linkTitle:'Shop now',
            linkTo:'/shop'
    }
    const renderPromotion = () => (
       promotion ?
        <div className="home_promotion_img" style={{ 
            background: `url(${promotion.img})`
         }}>
          <div className="tag title">
                {promotion.lineOne}
            </div>
            <div className="tag title">
                {promotion.lineTwo}
            </div>
            <div>
                <Button 
                type="default"
                title={promotion.linkTitle}
                linkTo={promotion.linkTo}
                addStyles={{ 
                    margin: '10px 0 0 0'
                    }}>

                </Button>
            </div>
        
        </div>
        : null
    )
    return (
        <div className="home_promotion">
            {renderPromotion()}
        </div>
    )
}

export default HomePromotion;