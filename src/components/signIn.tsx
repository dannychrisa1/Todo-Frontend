import { useEffect, useState } from "react"
import Button from "./Button"
import OpenEye from "../assets/svg/OpenEye"
import CloseEye from "../assets/svg/CloseEye"
import { useAppDispatch, useAppSelector } from "../hooks";
import { toast } from "react-toastify";
import { login, reset } from "../slices/auth/authSlice";
import { useNavigate } from "react-router-dom";

interface LoginFormProps {
    onToggle: () => void;
}

const SignIn = ({ onToggle }: LoginFormProps) => {
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { isLoading, isSuccess, message } = useAppSelector((state) => state.auth)

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const { email, password } = formData

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isLoading) return;

        if (!email || !password) {
            return toast.error("provide all details")
        } else {
            const userData = {
                email,
                password
            }
            dispatch(login(userData))
        }
    }

    useEffect(() => {
        if (isSuccess) {
            navigate('/dashboard')
        }
        return () => {
            dispatch(reset())
        }
    }, [isSuccess, dispatch, navigate, message])


    return (
        <div className="flex justify-center items-center h-[60vh]">
            <div className="w-[400px] h-[60vh] mt-24 p-4">
                <div className="flex flex-col gap-2 mb-8">
                    <h2 className="text-black-500 text-xl">What’s your email?</h2>
                    <p className="text-gray-500 text-sm">Enter your email address</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2 mb-8">
                        <input
                            type="text"
                            name="email"
                            placeholder="johndoe@google.com"
                            value={email}
                            onChange={onChange}
                            className="px-4 py-2 border text-black bg-gray-primary-600/55 dark:bg-white border-gray-primary-600/55 dark:border-white rounded-lg outline-none"
                        />
                    </div>
                    <div className="flex flex-col gap-2 mb-8">
                        <div className="relative w-full">
                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                name="password"
                                placeholder="password"
                                value={password}
                                onChange={onChange}
                                className="w-full px-4 py-2 text-black border bg-gray-primary-600/55 dark:bg-white border-gray-primary-600/55 dark:border-white rounded-lg outline-none"
                            />
                            <Button type="button" className="flex justify-center items-center absolute top-2 right-[10px] lg:right-[10px]  text-gray-800" onClick={togglePasswordVisibility}>
                                {passwordVisible ?
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
                        Login
                    </Button>
                </form>
                <div className='flex justify-center items-center mt-2'>
                    <div className='flex items-center text-center gap-1'>
                        <p className="text-sm text-gray-400">
                            Don't have an account?{" "}
                        </p>
                        <button
                            className='text-black-500 font-semibold text-sm'
                            onClick={onToggle}>
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn