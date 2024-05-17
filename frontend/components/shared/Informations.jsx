import { RocketIcon } from "@radix-ui/react-icons"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
 
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

const Informations = ({ hash, isConfirming, isConfirmed, error }) => {
  return (
    <>
        {hash && 
          <Alert className="bg-lime-200 mt-5 mb-5">
            <RocketIcon className="h-4 w-4" />
            <AlertTitle>Information</AlertTitle>
            <AlertDescription>
              Hash de la transaction : {hash}
            </AlertDescription>
          </Alert>
        } 
        {isConfirming && 
          <Alert className="bg-yellow-200 mt-5 mb-5">
            <RocketIcon className="h-4 w-4" />
            <AlertTitle>Information</AlertTitle>
            <AlertDescription>
              La transaction est en train d'être confirmée.
            </AlertDescription>
          </Alert>} 
        {isConfirmed && 
          <Alert className="bg-lime-200 mt-5 mb-5">
            <RocketIcon className="h-4 w-4" />
            <AlertTitle>Bravo !</AlertTitle>
            <AlertDescription>
              Transaction confirmée.
            </AlertDescription>
          </Alert>}
        {error && (
          <Alert className="bg-rose-200 mt-5 mb-5">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>Erreur !</AlertTitle>
            <AlertDescription>
              Erreur : {error.shortMessage || error.message}
            </AlertDescription>
          </Alert>
        )} 
    </>
  )
}

export default Informations