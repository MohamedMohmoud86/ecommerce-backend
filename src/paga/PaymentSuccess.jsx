import { useEffect } from "react";

import axios from "axios";

import toast from "react-hot-toast";

import { useSearchParams } from "react-router-dom";

export default function PaymentSuccess() {

  const [params] = useSearchParams();

  useEffect(() => {

    const orderId =
      params.get("orderId");

    const paymentId =
      params.get("id");

    axios.post(

      "http://192.168.1.13:5000/api/payment-success",

      {

        orderId,

        paymentId,

      }

    )

    .then(() => {

      toast.success("Payment Successful");

    });

  }, []);

  return (

    <div>

      <h1>Payment Success </h1>

    </div>

  );

}