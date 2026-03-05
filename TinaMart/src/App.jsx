import "./index.css"
import './App.css';
import Routing from "./Router";
import { auth } from "./Utility/firebase";
import { Type } from "./Utility/action.type";
import { useContext, useEffect } from "react";
import { DataContext } from "./components/DataProvider/DataProvider";
import Chatbot from "./components/Chatbot/Chatbot";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import { SettingsProvider } from "./Utility/SettingsContext";
import ThemeIndicator from "./components/ThemeIndicator/ThemeIndicator";
import { ProductProvider } from "./Utility/ProductContext";

function App() {

// sign OUt Function

  const [{user},dispatch] = useContext(DataContext);
  
  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        dispatch({
          type:Type.SET_USER,
          user:authUser,
        });
      }else{
        dispatch({
          type:Type.SET_USER,
          user:null,
        });
      }
    })
  }, [dispatch]);
    

  return (
    <SettingsProvider>
      <ProductProvider>
        <Routing/>
        <Chatbot />
        <ScrollToTop />
        <ThemeIndicator />
      </ProductProvider>
    </SettingsProvider>
  );
}

export default App;
