'use client';
import { useState, useEffect } from "react";
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";

import { contractAddress, contractAbi } from "@/constants";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { parseEther, formatEther } from "viem";

import { Card, CardContent } from "../ui/card";

import { Badge } from "@/components/ui/badge"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

import Informations from "./Informations";

const GetWishList = () => {

    const [friendAddress, setFriendAddress] = useState('');
    const [enable, setEnable] = useState(false);

    const { address } = useAccount();

    const { data: userWishList, refetch } = useReadContract({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'getWishList',
        args: [friendAddress],
        query: {
            enabled: enable
        }
    })

    const handleGetWishList = async() => {
        setEnable(true);
    }

    // Buy Item
    const { data: hash, isPending, error, writeContract } = useWriteContract()

    const handleBuyItem = async(id, price) => {
        writeContract({
            address: contractAddress,
            abi: contractAbi,
            functionName: 'buyItem',
            args: [friendAddress, parseInt(id)],
            account: address,
            value: price
        })
    }

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

    useEffect(() => {
        refetch();
    }, [isConfirmed])

    return (
        <div className="get">
            <div className="get_inner">
                <h1 className="get_inner_title"><span className="get_inner_title_colored">Voir la WishList</span> de vos proches.</h1>
                <Card>
                    <CardContent className="pt-5">
                        <div className="get_inner_form_item">
                            <Label htmlFor="friendAddress">Addresse de votre proche :</Label>
                            <Input type="text" id="friendAddress" placeholder="Ex: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266" onChange={(e) => setFriendAddress(e.target.value)} />
                        </div>
                        <Button variant="outline" className="get_inner_submit_button hover:bg-[#75fd38]" onClick={handleGetWishList}>Voir la WishList</Button>
                    </CardContent>
                </Card>
                <Informations hash={hash} isConfirming={isConfirming} isConfirmed={isConfirmed} error={error} />
                {userWishList && (
                    <Card className="mt-5">
                        <CardContent className="pt-5">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">Id</TableHead>
                                        <TableHead>Nom</TableHead>
                                        <TableHead>Prix</TableHead>
                                        <TableHead>Statut</TableHead>
                                        <TableHead className="text-right">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {userWishList.map((item) => {
                                        return (
                                            <TableRow key={item.id.toString()}>
                                                <TableCell className="font-medium">{item.id.toString()}</TableCell>
                                                <TableCell>{item.name}</TableCell>
                                                <TableCell>{formatEther(item.price)} ETH</TableCell>
                                                <TableCell>
                                                    {item.bought ? (
                                                        <Badge className="get_inner_badge_bought">Acheté</Badge>
                                                    ) : (
                                                        <Badge className="get_inner_badge_not_bought">Pas acheté</Badge>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {!item.bought && (
                                                        <Button variant="outline" className="get_inner_buy_button hover:bg-[#75fd38]" onClick={() => handleBuyItem(item.id.toString(), item.price)}>Acheter</Button>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}

export default GetWishList