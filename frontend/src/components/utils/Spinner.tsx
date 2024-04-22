import { RotatingLines } from "react-loader-spinner"

export default function Spinner() {
    return (
        <div className="flex items-center justify-center h-screen">
            <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="54"
                visible={true}
            />
        </div>
    )
}