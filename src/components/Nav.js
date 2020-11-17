import React, {useState}  from 'react';

const Nav = ({shopData}) => {

    const [submits, setSubmits] = useState([]);
    const [form, setForm] = useState({etunimi:'', sukunimi: '', puh: '', email: ''})

    const [num, setNum] = useState(100);
    const storeView = () => {
        if (num === 100) {
            setNum(0);
            document.getElementsByTagName("body")[0].style.overflowY = "hidden";
            window.scrollTo(0,0);
        } else if (num === 0 ) {
            setNum(100);
            document.getElementsByTagName("body")[0].style.overflowY = "";
        }
    }


    const deleteOrder = (product) => {
        shopData.setOrders(shopData.orders.filter(order => product !== order.id));
    }

    
    const changeHandler = (e, attribute) => {
        const tempField = {...form};
        tempField[attribute] = e.target.value;
        
        setForm(tempField);
   
    }

    const submitHandler = (e) => {
        e.preventDefault();
        
        if(form.etunimi !== '' && form.sukunimi !== '' && form.puh !== '' && form.email !== ''){
            const uniqueId = Math.round(Math.random(1000000000000000) * 1000000000000000);  
            setSubmits(submits.concat({...form, id: uniqueId, ordered: shopData.orders}));
            setForm({etunimi:'', sukunimi: '', puh: '', email: ''})
            shopData.setOrders([]);
        } else {
            console.log("anna tiedot");
        }
    }

    return (
        <nav className="App-header">
            <h2>logo</h2>
            <div className="header-navs">
                <button className="cart" onClick={() => storeView()}>
                    <svg className="cart-svg" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
                        <path d="M14 36c-2.21 0-3.98 1.79-3.98 4s1.77 4 3.98 4 4-1.79 4-4-1.79-4-4-4zm-12-32v4h4l7.19 15.17-2.7 4.9c-.31.58-.49 1.23-.49 1.93 0 2.21 1.79 4 4 4h24v-4h-23.15c-.28 0-.5-.22-.5-.5 0-.09.02-.17.06-.24l1.79-3.26h14.9c1.5 0 2.81-.83 3.5-2.06l7.15-12.98c.16-.28.25-.61.25-.96 0-1.11-.9-2-2-2h-29.57l-1.9-4h-6.53zm32 32c-2.21 0-3.98 1.79-3.98 4s1.77 4 3.98 4 4-1.79 4-4-1.79-4-4-4z"/>
                        <path d="M0 0h48v48h-48z" fill="none"/>
                    </svg>
                </button>
            </div>
            <div className="overflowed-store" style= {{transform: `translateX(${num}%)`}}>
                <button className="store-back" onClick={() => storeView()}>
                    <svg id="shadow" height="15" width="15" viewBox="0 0 100 100">
                        <path d="M45 52 L100 90 L93 100 L20 50 L93 0 L100 10 Z" />
                        
                        
                    </svg>
                </button>
                <div className="store-wrapper">
                    
                    <div className="store-content-container">
                        <div className="ordered-products">
                            {shopData.orders.map(item => {
                                return (
                                    <div key={item.id} className="product-container">
                                        <div className="product-photo">
                                            <img alt='' src={item.link}></img>
                                        </div>
                                        <div className="product-exp">
                                            <h4>Hinta {item.price}</h4>
                                            <h4>Määrä {item.amount}</h4>
                                        </div>
                                        <div className="product-buttons">
                                            <button onClick={() => deleteOrder(item.id)}>Delete</button>
                                        </div>
                                    </div>
                                )
                            })}
                            
                        </div>
                        <div className="ordering">
                            <div className="order-form-container">
                                <div className="order-form">
                                    <form onSubmit={submitHandler}>
                                        <p>
                                            <label >Etunimi </label>
                                            <input 
                                            onChange={e => changeHandler(e, 'etunimi')} 
                                            value={form.etunimi} 
                                            type ="text"
                                            />
                                        </p>
                                        <p>
                                            <label>Sukunimi </label>
                                            <input 
                                            onChange={e => changeHandler(e, 'sukunimi')} 
                                            value={form.sukunimi} 
                                            type ="text"
                                            />
                                        </p>
                                        <p>
                                            <label>Puhelinnumero </label>
                                            <input 
                                            onChange={e => changeHandler(e, 'puh')} 
                                            value={form.puh} 
                                            type ="text"
                                            />
                                        </p>
                                        <p>
                                            <label>Sähköposti </label>
                                            <input 
                                            onChange={e => changeHandler(e, 'email')} 
                                            value={form.email} 
                                            type ="text"
                                            />
                                        </p>
                                        <p>
                                            <label></label>
                                            <input type="submit" disabled={shopData.orders.length === 0} />
                                        </p>
                                    </form>
                                </div>
                            </div>
                            <div className="submitted-orders">
                                {submits.map(submit =>{
                                    return (
                                        <div key={submit.id} className="ordered-order-container">
                                                    <div className="purchase-container">
                                                        <p>{submit.id}</p>
                                                    </div>
                                                    <div className="puchases-container">
                                                        {submit.ordered.map(order => {
                                                            return(
                                                                <div key={order.id} className="purchased-product">
                                                                    <img 
                                                                        className="carousel-image-small" 
                                                                        src={order.link}                                     
                                                                        alt=""
                                                                        >                           
                                                                    </img>
                                                                    <p>{order.price}</p>
                                                                    <p>{order.text}</p>
                                                                    
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                                                                    
                                        </div>
                                    )
                                    })}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </nav>
    )
}

export default Nav;