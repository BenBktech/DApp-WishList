'use client';
import { useState, useEffect } from "react";
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";

import { contractAddress, contractAbi } from "@/constants";
import { parseEther, formatEther } from "viem";

import { Card, CardContent } from "../ui/card";
import { Badge } from "@/components/ui/badge"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

const GetMyWishList = () => {

    const [enable, setEnable] = useState(true);
    const { address } = useAccount();

    const { data: userWishList, refetch } = useReadContract({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'getWishList',
        args: [address],
        query: {
            enabled: enable
        }
    })

    useEffect(() => {
        refetch();
    }, [])

    return (
        <div className="get">
            <div className="get_inner">
                <h1 className="get_inner_title"><span className="add_inner_title_colored">Votre</span> WishList</h1>
               
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
                                        <TableHead>Acheteur</TableHead>
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
                                                    { Number(item.boughtBy) !== 0 && item.boughtBy}
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

export default GetMyWishList