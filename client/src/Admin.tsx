import {useEffect, useState} from "react";


export function Admin({web3, buyBookContract}) {
    const [payments, setPayments] = useState([]);

    const init = () => {
        if (!web3 || !buyBookContract) return;
        console.log(buyBookContract.methods.payments);

        buyBookContract.methods.getAllPayments().call()
            .then(values => {
                setPayments(values)
            });
    }

    useEffect(() => {
        if (web3 && buyBookContract) {
            init();
        }
    }, [web3, buyBookContract]);

    return (
        <div>
            <h1>Admin</h1>
            Total {payments.length} people have bought the book!
            {payments.map(payment => (
                <div key={payment.email}>
                    <p>Email: {payment.email}</p>
                </div>
            ))}
        </div>
    )
}