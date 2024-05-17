'use client';
import { useState, useEffect } from "react";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";

import { contractAddress, contractAbi } from "@/constants";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { parseEther } from "viem";

import { Card, CardContent } from "../ui/card";

import Informations from "./Informations";

const AddToWishList = () => {

    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');

    const { address } = useAccount();

    const { data: hash, isPending, error, writeContract } = useWriteContract();

    const handleAddToWishList = async() => {
        writeContract({
            address: contractAddress,
            abi: contractAbi,
            functionName: 'addToWishList',
            args: [productName, parseEther(productPrice)],
            account: address,
        })
    }

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

    return (
        <div className="add">
            <div className="add_inner">
                <h1 className="add_inner_title"><span className="add_inner_title_colored">Ajouter un élément</span> à votre WishList</h1>
                <Informations hash={hash} isConfirming={isConfirming} isConfirmed={isConfirmed} error={error} />
                <Card>
                    <CardContent className="pt-5">
                        <div className="add_inner_form_item">
                            <Label htmlFor="productName">Nom du produit</Label>
                            <Input type="text" id="productName" placeholder="Ex: La trilogie du Seigneur des Anneaux..." onChange={(e) => setProductName(e.target.value)} />
                        </div>
                        <div className="add_inner_form_item mt-5">
                            <Label htmlFor="productPrice">Prix (en ETH)</Label>
                            <Input type="text" id="productPrice" placeholder="Ex: 0.001" onChange={(e) => setProductPrice(e.target.value)} />
                        </div>
                        <Button variant="outline" disabled={isPending} className="add_inner_submit_button hover:bg-[#75fd38]" onClick={handleAddToWishList}>{isPending ? 'Ajout...' : 'Ajouter à votre WishList'}</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default AddToWishList