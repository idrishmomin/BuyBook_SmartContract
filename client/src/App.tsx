import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {contractABI} from "./abi";
import {Admin} from "./Admin";
import {BuyBook} from "./CourseRegistration";

function App() {
    const [web3, setWeb3] = useState(null);
    const [buyBookContract, setBuyBookContract] = useState(null);
    const [buyBook, setBookPrice] = useState('');
    const contractAddress = '0x0b5e8d52bf45408d31288eee5bf983c77edd50c5';

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.request({ method: 'eth_requestAccounts' })
                .then(() => {   
                    const web3Instance = new Web3(window.ethereum);
                    setWeb3(web3Instance);

                    const courseInstance = new web3Instance.eth.Contract(contractABI, contractAddress);
                    setBuyBookContract(courseInstance);

                    courseInstance.methods.buyBook().call()
                        .then(fee => {
                            setBookPrice(web3Instance.utils.fromWei(fee, 'ether'));
                        });
                })
                .catch(err => {
                    // Handle error if the user rejects the connection request
                    console.error(err);
                });
        } else {
            alert('Please install an another Ethereum wallet.');
        }
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<BuyBook web3={web3} buyBookContract={buyBookContract} bookPrice={buyBook} />} />
                <Route path="admin" element={<Admin web3={web3} buyBookContract={buyBookContract} />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App         
