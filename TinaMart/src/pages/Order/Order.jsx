import React, { useContext, useState, useEffect } from 'react';
import LayOut from '../../components/LayOut/LayOut';
import { db } from '../../Utility/firebase';
import { DataContext } from '../../components/DataProvider/DataProvider';
import classes from "./order.module.css";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import ProductCard from '../../components/Product/ProductCard';

function Order() {
  const [{ user }] = useContext(DataContext);
  const [order, setOrder] = useState([]);

  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, "users", user.uid, "orders"),
        orderBy("created", "desc")
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const ordersData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setOrder(ordersData);
      });

      return () => unsubscribe();
    } else {
      setOrder([]);
    }
  }, [user]);

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.order_container}>
          <h2>Your Orders</h2>
          {
            order?.length === 0 && 
            <div style={{padding:"20px"}}> 
              🛒✨ Oops! No orders here yet. Start shopping and make it exciting!
            </div>
          }
          {order?.map((eachOrder, i) => (
            <div key={eachOrder.id || i} className={classes.singleOrder}>
              <hr />
              <div className={classes.orderHeader}>
                <p>Order ID: {eachOrder?.id}</p>
                <p>Total: ${(eachOrder?.amount / 100).toFixed(2)}</p>
              </div>

              <div className={classes.orderProducts}>
                {eachOrder?.basket?.map((item, index) => (
                  <ProductCard
                    flex={true}
                    product={item}
                    key={item.id || index}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </LayOut>
  );
}

export default Order;
