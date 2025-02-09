import { useEffect, useReducer, useState } from "react"
import Button from "./Button"
import OpenEye from "../assets/svg/OpenEye"
import CloseEye from "../assets/svg/CloseEye"
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { toast } from "react-toastify";
import { register, reset } from "../slices/auth/authSlice";

interface SignupFormProps {
    onToggle: () => void;
}
const initialState = {
    passwordVisible: false,
    confirmPasswordVisible: false,
};

type ActionType = { type: "TOGGLE_PASSWORD" } | { type: "TOGGLE_CONFIRM_PASSWORD" };

const passwordToggleReducer = (state: typeof initialState, action: ActionType) => {
    switch (action.type) {
        case "TOGGLE_PASSWORD":
            return { ...state, passwordVisible: !state.passwordVisible };
        case "TOGGLE_CONFIRM_PASSWORD":
            return { ...state, confirmPasswordVisible: !state.confirmPasswordVisible };
        default:
            return state;
    }
};

const SignUp = ({ onToggle }: SignupFormProps) => {
    const navigate = useNavigate()
    const dispatchUser = useAppDispatch()

    const { isLoading, isSuccess, message } = useAppSelector((state) => state.auth)

    const [state, dispatch] = useReducer(passwordToggleReducer, initialState);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const { username, email, password, confirmPassword } = formData

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isLoading) return;

        if (!username || !email || !password) {
            return toast.error("provide all details")
        }
        if (password !== confirmPassword) {
            return toast.error("passwords do not match")
        } else {
            const userData = {
                username,
                email,
                password
            }
            dispatchUser(register(userData))
        }
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success("registration success, you can now login")
            navigate('/')
            setFormData({
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
        }
        return () => {
            dispatchUser(reset())
        }
    }, [isSuccess, dispatchUser, navigate, message])

    return (
        <div className="flex justify-center items-center h-[80vh]">
            <div className="w-[400px] h-auto lg:mt-20 lg:h-[90vh] overflow-y-scroll scrollbar-none  p-4">
                <div className="flex flex-col gap-2 mb-8">
                    <h2 className="text-black-500 text-xl font-semibold">Sign up</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2 mb-6">
                        <input
                            type="text"
                            name="username"
                            placeholder="username"
                            value={username}
                            onChange={onChange}
                            className="px-4 py-2 bg-gray-primary-600/55 text-black dark:bg-white border border-gray-primary-600/55 dark:border-white rounded-lg outline-none"
                        />
                    </div>
                    <div className="flex flex-col gap-2 mb-6">
                        <input
                            type="text"
                            name="email"
                            placeholder="johndoe@google.com"
                            value={email}
                            onChange={onChange}
                            className="px-4 py-2 bg-gray-primary-600/55 text-black dark:bg-white border border-gray-primary-600/55 dark:border-white rounded-lg outline-none"
                        />
                    </div>
                    <div className="flex flex-col gap-2 mb-6">
                        <div className="relative w-full">
                            <input
                                type={state.passwordVisible ? 'text' : 'password'}
                                name="password"
                                placeholder="password"
                                value={password}
                                onChange={onChange}
                                className="w-full bg-gray-primary-600/55 text-black dark:bg-white px-4 py-2 border border-gray-primary-600/55 dark:border-white rounded-lg outline-none"
                            />
                            <Button
                                type="button"
                                className="flex justify-center items-center absolute top-2 right-[10px] lg:right-[10px]  text-gray-800"
                                onClick={() => dispatch({ type: "TOGGLE_PASSWORD" })}
                            >
                                {state.passwordVisible ?
                                    (
                                        <OpenEye />
                                    ) : (

                                        <CloseEye />
                                    )

                                }
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 mb-6">
                        <div className="relative w-full">
                            <input
                                type={state.confirmPasswordVisible ? 'text' : 'password'}
                                name="confirmPassword"
                                placeholder="re-enter password"
                                value={confirmPassword}
                                onChange={onChange}
                                className="w-full bg-gray-primary-600/55 text-black dark:bg-white px-4 py-2 border border-gray-primary-600/55 dark:border-white rounded-lg outline-none"
                            />
                            <Button
                                type="button"
                                className="flex justify-center items-center absolute top-2 right-[10px] lg:right-[10px]  text-gray-800"
                                onClick={() => dispatch({ type: "TOGGLE_CONFIRM_PASSWORD" })}
                            >
                                {state.confirmPasswordVisible ?
                                    (
                                        <OpenEye />
                                    ) : (

                                        <CloseEye />
                                    )

                                }
                            </Button>
                        </div>
                    </div>
                    <Button
                        type="submit"
                        isLoading={isLoading}
                        className={`px-4 py-2 w-full text-white rounded-lg text-md ${isLoading ? 'bg-blue-100/55' : 'custom-bg'}`}
                    >
                        Register
                    </Button>
                </form>
                <div className='flex justify-center items-center mt-2'>
                    <div className='flex items-center text-center gap-1'>
                        <p className="text-sm text-gray-400">
                            Already have an account?{" "}
                        </p>
                        <button
                            className='text-black-500 font-semibold text-sm'
                            onClick={onToggle}>
                            Sign In
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp