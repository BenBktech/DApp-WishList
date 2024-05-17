'use client';

import NotConnected from "@/components/shared/NotConnected";
import AddToWishList from "@/components/shared/AddToWishList";

import { useAccount } from "wagmi";

const page = () => {

    const { isConnected } = useAccount();

    return (
        <div>
            {isConnected ? (
                <AddToWishList />
            ) : (
                <NotConnected />
            )}
        </div>
    )
}

export default page