import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
    return (
        <nav className="navbar">
            <div className="grow">
                <Link href="/"><Image src="logo.svg" width="150" height="30" /></Link>
            </div>
            <div>
                <ConnectButton showBalance={false} />
            </div>
        </nav>
    )
}

export default Header;