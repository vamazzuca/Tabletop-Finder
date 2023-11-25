import useLoginModal from "../../hooks/useLoginModel";
import { useCallback, useState } from "react";
import Input from "../input"
import Modal from "../modal";
import useRegisterModal from "../../hooks/useRegisterModel";
import { useDispatch } from "react-redux";

function LoginModal() {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const onToggle = useCallback(() => {
        if (isLoading) {
            return;
        }

        loginModal.onClose();
        registerModal.onOpen();
    }, [isLoading, registerModal, loginModal])

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);

            //ADD Log IN

            loginModal.onClose()
        } catch (error){
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [loginModal]);

    const bodyContent = (
        <form className="flex flex-col gap-4">
            <Input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                type='email'
                value={email}
                disabled={isLoading}
            />
            <Input
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                type='password'
                value={password}
                disabled={isLoading}
            />
            <div className='flex flex-col gap-2 pt-10'>
                            <button type="sumbit" className='
                                w-full
                                font-semibold
                                rounded-full
                                text-xl
                                px-4
                                py-2
                                transition
                                hover:opacity-80
                                bg-[#66FCF1]'>
                                    Sign In
                </button>
            </div>
        </form>
    )

    const footerContent = (
        <div className="text-neutral-400 text-center mt-4">
            <p>Dont have an account?  
                <span
                    onClick={onToggle}
                    className="
                        text-white
                        cursor-pointer"> Create an account</span>
            </p>

        </div>
    )

    return (
        <div>
            <Modal
                disabled={isLoading}
                isOpen={loginModal.isOpen}
                title="Login"
                onClose={loginModal.onClose}
                onSubmit={onSubmit}
                body={bodyContent}
                footer={footerContent}/>
        </div>
    )
}

export default LoginModal;