import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

interface BlogSkeletonProps {
    amount: number
}

export default function BlogSkeleton({ amount }: BlogSkeletonProps) {
    const loadCards = Array(amount).fill(1);
    return (
        <>
            {loadCards.map((_, index) => (
                <div key={index} className="pt-4 p-2 border border-gray-300 rounded-lg flex gap-2.5">
                    <div className="flex-shrink-0">
                        <Skeleton circle width={60} height={60} />
                    </div>
                    <div className="flex-grow">
                        <Skeleton height={40} />
                        <Skeleton count={4} />
                    </div>
                </div>
            ))}
        </>
    )
}
