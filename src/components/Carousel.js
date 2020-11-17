import React, {useState} from 'react';




const Carousel = ({carouselData}) => {
    const [productsInfo, setProductsInfo] = useState(carouselData.products);
    // console.log(productsInfo);
    const [productInfo,  setProductInfo] = useState({text: '', link:'', id:'', amount: 0, price:''});
    const [next, setNext] = useState(0);

    const setSlideIndex = (index) => {
        let num = -index*100;
        setNext(num);
        // console.log(next);
    }
    
    const setSlideLeft = () => {
        if (next <= -100) {
            setNext(next + 100);
        } else setNext(-200);
       
    }

    const setSlideRight = () => {
        if (next >= -100) {
            setNext(next - 100);
        } else setNext(0);
        console.log(carouselData.orders);
    }
    
    const submitHandler = (e, currentAm, id, attribute) => {
        e.preventDefault();
        if(currentAm !== 0) {
            const uniqueId = Math.round(Math.random(1000000000000000) * 1000000000000000)
            carouselData.setOrders(carouselData.orders.concat({...productInfo, id: uniqueId}));

            const tempAmounts = productsInfo.map(product => {
                if(product.id === id) {
                    const tempProduct = {...productInfo, 
                                        amount: product.amount,
                                        text: product.text,
                                        link: product.link,
                                        id: product.id,
                                        price: product.price
                                    }
                    tempProduct[attribute] = 0;
                    setProductInfo(tempProduct);
                    return tempProduct;
                } else return product;
                
            })
            
            setProductsInfo(tempAmounts);

            console.log(carouselData.orders);
                    
        } 
        
    }

    const changeHandler = (e, id, attribute) => { 
        const tempAmounts = productsInfo.map(product => {
            if(product.id === id) {
                const tempProduct = {...productInfo, 
                                    amount: product.amount,
                                    text: product.text,
                                    link: product.link,
                                    id: product.id,
                                    price: product.price
                                }
                tempProduct[attribute] = e.target.value;
                setProductInfo(tempProduct);
                return tempProduct;
            } else return product;
            
        })
        
        setProductsInfo(tempAmounts);
            
        
    }

    return (
        <div className="carousel-wrapper">
            <div className="carousel">
                <button className="carousel-button carousel-button--left" onClick={() => setSlideLeft()}>
                    <svg height="10" width="10" viewBox="0 0 100 100">
                        <path d="M25 50 L100 90 L93 100 L0 50 L93 0 L100 10 Z" />
                    </svg>
                </button>
                <div className="carousel-container">      
                    {productsInfo.map(product => {
                        return (
                            <div key={product.text} className="carousel-slide"  style= {{transform: `translateX(${next}%)`}}>
                                <div className="carousel-image-wrapper">
                                    <img 
                                        className="carousel-image" 
                                        src={product.link}                                     
                                        alt=""
                                        >                           
                                    </img>
                                </div>
                                <div className="carousel-form-box">
                                    <div className="carousel-text-box">
                                        <p>{product.text}</p>
                                    </div>
                                    <div className="carousel-form">
                                        <form onSubmit={e => submitHandler(e, product.amount, product.id, 'amount')}>
                                           
                                            KPL:<input
                                                onChange={e => changeHandler(e, product.id, 'amount')} 
                                                value={product.amount} 
                                                type ="number"
                                                />
                                                
                                                <input type="submit"/>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        );
                    })}   
                    
                    
                </div>
                <button className="carousel-button carousel-button--right" onClick={() => setSlideRight()}>
                    <svg height="10" width="10" viewBox="0 0 100 100">
                        <path d="M25 50 L100 90 L93 100 L0 50 L93 0 L100 10 Z" />
                    </svg>
                </button>
                <div className="carousel-nav">
                    {productsInfo.map((product, index) => {
                        return (
                            <button key={product.id} className="carousel-indicator" onClick={() => setSlideIndex(index)}></button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
    
}

export default Carousel
