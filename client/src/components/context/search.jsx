import {useState , useEffect , useContext, createContext} from "react";

const SearchContext = createContext();

const SearchProvider = ({children})=> {
    const [auth , setauth] = useState({
        keyword: "" ,
        result: []
    });
    return (<SearchContext.Provider value={[auth , setauth]}>
        {children}
    </SearchContext.Provider>)
};

// custom hook
const useSearch = ()=> useContext(SearchContext);

export {useSearch , SearchProvider};