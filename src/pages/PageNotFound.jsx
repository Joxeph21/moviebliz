import { useNavigate } from "react-router-dom"
import Button from "../ui/Button"
function PageNotFound() {
    const navigate = useNavigate()
    return (
        <div className="inset-0 w-full h-screen flex flex-col text-gray-50 items-center gap-8 justify-center">
            <h2 className="font-extrabold text-9xl">404</h2>
            <p>Oops.....Page not found</p>
            <div>

            <Button type={'secondary'} onClick={() => navigate('/')}>Back to Safety</Button>
            </div>
        </div>
    )
}

export default PageNotFound