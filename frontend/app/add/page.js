'use client';

import NotConnected from "@/components/shared/NotConnected";
import AddToWishList from "@/components/shared/AddToWishList";
import GetMyWishList from "@/components/shared/GetMyWishList";

import { useAccount } from "wagmi";

const page = () => {

    const { isConnected } = useAccount();

    return (
        <div>
            {isConnected ? (
            <>
                <AddToWishList />
                <GetMyWishList />
            </>
            ) : (
                <NotConnected />
            )}
        </div>
    )
}

export default page