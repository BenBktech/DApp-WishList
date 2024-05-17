'use client';

import NotConnected from "@/components/shared/NotConnected";
import GetWishList from "@/components/shared/GetWishList";

import { useAccount } from "wagmi";

const page = () => {

    const { isConnected } = useAccount();

    return (
        <div>
            {isConnected ? (
                <GetWishList />
            ) : (
                <NotConnected />
            )}
        </div>
    )
}

export default page