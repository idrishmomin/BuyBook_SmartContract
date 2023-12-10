import {useState} from "react";

export const BuyBook = ({web3, buyBookContract, bookPrice}) => {
    const [email, setEmail] = useState('');

    const payForCourse = async () => {
        if (!web3 || !buyBookContract) return;

        const accounts = await web3.eth.getAccounts();
        buyBookContract.methods.payForBook(email).send({ from: accounts[0], value: web3.utils.toWei(bookPrice, 'ether') })
            .on('transactionHash', hash => {
                console.log('Transaction hash:', hash);
            })
            .on('receipt', receipt => {
                console.log('Transaction successful:', receipt);
            })
            .on('error', error => {
                console.error('Error:', error);
            });
    };

    return (
        <div>
            <br/>
            <h1>Buy Book</h1>
            <p>Book Price: {bookPrice} ETH</p>
            <input type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <button onClick={payForCourse}>Pay for Book</button>
        </div>
    );
};
