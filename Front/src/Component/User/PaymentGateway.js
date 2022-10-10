import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PaymentForm from "./PaymentForm";
import PaymentLoading from "./PaymentLoading";

function PaymentGateway() {
    const [isFetching, setIsFetching] = useState(true); 
    const location = useLocation();
    const amount = location.state;

    useEffect(() => {
      console.log(amount.totalAmount);
        setTimeout(function () {
          console.log("Delayed for 5 second."); 
          setIsFetching(false); 
        }, 5000);
      }, []);

    return ( 
        <div>
            {isFetching ? <PaymentLoading /> : <PaymentForm amount={amount.totalAmount}/>}
        </div>
     );
}

export default PaymentGateway;