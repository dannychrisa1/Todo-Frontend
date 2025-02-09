import loaderIcon from "../assets/loader.svg"

type ButtonProps = {
    isLoading?: boolean
    className?: string
    children: React.ReactNode
    onClick?: () => void
    type?: "submit" | "reset" | "button" | undefined
}

const Button = ({ isLoading, className, children, type, onClick }: ButtonProps) => {
    return (
        <button type={type} disabled={isLoading} onClick={onClick} className={className ?? 'bg-rose-600 w-full'}>
            {isLoading ?
                (
                    <div className="flex items-center justify-center gap-4">
                        <img
                            src={loaderIcon}
                            alt="loader"
                            width={24}
                            height={24}
                            className="animate-spin"
                        />
                        Loading ...
                    </div>
                )
                :
                (children)
            }
        </button>
    )
}

export default Button