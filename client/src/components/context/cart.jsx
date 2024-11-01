import {useState , useEffect , useContext, createContext} from "react";

const CartContext = createContext();

const CartProvider = ({children})=> {
    const [cart , setcart] = useState([]);

    useEffect(()=> {
        const getitem = localStorage.getItem("cart");
        const data = JSON.parse(getitem);
        if (data){
            setcart(data);
        }
    } , []);
    return (<CartContext.Provider value={[cart , setcart]}>
        {children}
    </CartContext.Provider>)
};

// custom hook
const useCart = ()=> useContext(CartContext);

export {useCart , CartProvider};