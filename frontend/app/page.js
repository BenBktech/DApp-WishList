import { Button } from "@/components/ui/button";

import { HomeIcon, EyeOpenIcon } from "@radix-ui/react-icons";

import Link from "next/link";

export default function Home() {
  return (
    <div className="home">
      <div className="home_inner">
        <h1 className="home_inner_title">Votre plateforme décentralisée pour créer des <span className="home_inner_title_colored">listes de souhaits</span> et <span className="home_inner_title_colored">réaliser les souhaits</span> de vos amis et de votre famille.</h1>
        <p className="home_inner_description">WishBlock te permet d'enregistrer, partager et suivre les souhaits de tes proches sur la blockchain pour une expérience transparente et sécurisée.</p>
        <div className="home_inner_links">
          <Link href="add" className="mr-5">
            <Button className="home_inner_links_button1 hover:bg-[#75fd38]">
              <HomeIcon className="mr-2" /> Votre liste de souhaits
            </Button>
          </Link>
          <Link href="get" className="ml-5">
            <Button className="home_inner_links_button2">
              <EyeOpenIcon className="mr-2" /> Voir une liste de souhaits
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
