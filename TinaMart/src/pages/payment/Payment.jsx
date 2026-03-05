import React, { useContext, useState } from 'react';
import LayOut from '../../components/LayOut/LayOut';
import classes from "./payment.module.css";
import { DataContext } from '../../components/DataProvider/DataProvider';
import ProductCard from "../../components/Product/ProductCard";
import { 
  useStripe,
  useElements,
  CardElement
} from "@stripe/react-stripe-js";
import CurrencyFormat from '../../components/CurrencyFormat/CurrencyFormat';
import { axiosInstance } from '../../Api/axios';
import { ClipLoader } from 'react-spinners';
import { db } from '../../Utility/firebase';
import { useNavigate } from 'react-router-dom';
import { collection, doc, setDoc } from "firebase/firestore";
import { Type } from '../../Utility/action.type';

function Payment() {

  const [{user,basket},dispatch] = useContext(DataContext);

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const totalItem = basket?.reduce((amount,item)=>{
    return item.amount + amount
  },0)

  const [cardError, setCardError] = useState(null)
  const [processing, setProcessing] = useState(false)

    const stripe = useStripe();  
    const elements = useElements();
    const navigate = useNavigate()

  const handleChange = (e) =>{
    e.error?.message? setCardError(e?.error?.message):setCardError("")
  }
  
  const handlePayment = async (e)=>{
    e.preventDefault();

    try{
   // 1, contact the backend || function to ---------> get client secret  
      setProcessing(true)

      const response = await axiosInstance({
        method:"POST",
        url:`/payment/create?total=${total*100}`,
      });
      const clientSecret = response.data?.clientSecret;

 //2, client(react) side to comfirm it by taking Stripe.
  const { paymentIntent } = await stripe.confirmCardPayment(
    clientSecret,
  {
    payment_method: {
      card: elements.getElement(CardElement),
    },
  });

  setProcessing(false);
  //3, after confirmation ------> order firebase dtatbase save, clear basket {to store in firebaseStore } 

    await setDoc(
      doc(db, "users", user.uid, "orders", paymentIntent.id),
      {
        basket: basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      }
    );
    // after payment to make Empty the Cart
    dispatch({type:Type.EMPTY_BASKET})
    
    setProcessing(false)
     navigate("/order", { state: { msg: "You have placed a new order" } });
    }catch (error) {
      console.log(error)
      setProcessing(false)
    }
  }

  return (
    <LayOut>
      {/* Header */} 
      <div className={classes.payment_header}> 
        Checkout ({totalItem}) items.
      </div>
      
      {/* payment method */}
      <section className={classes.payment}>

        {/* address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div className={classes.user_address}>
            <div>{user?.email}</div>
            <div>123 React lane</div>
            <div>Ethiopian, Adis</div>
          </div>
        </div>
        <hr />
        {/* product */}

        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {
              basket?.map((item) => <ProductCard product={item} flex={true}/>)
            }
          </div>
        </div>

        <hr />
        {/* about Card information */}
        
        <div className={classes.flex}>
          <h3>Payment  methods</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment_details}>
              <form onSubmit={handlePayment}>
                {/* error */}
                {cardError && <small style={{color:"red"}}>{cardError}</small>}
                {/* Card */}
                <CardElement onChange={handleChange}/>
                {/* price */}
                <div className={classes.payment_price}>
                  <div>
                    <span style={{display:"flex",gap:"10px"}}>
                      Total order |<CurrencyFormat amount={total}/>
                    </span>
                  </div>
                  <button type='submit'>
                    {
                      processing?(
                        <div className={classes.loading}>
                          <ClipLoader color='gry' size={13}/>
                          <p>Please wait...</p>
                        </div>
                      ):"Pay Now"
                    }  
                    </button>
                </div>
              </form>
            </div>
          </div>
        </div>

      </section>
    </LayOut>
    
  )
}

export default Payment;
