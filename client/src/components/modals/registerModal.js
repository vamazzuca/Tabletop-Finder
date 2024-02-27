import useLoginModal from "../../hooks/useLoginModel";
import { useCallback, useState } from "react";
import Input from "../input"
import Modal from "../modal";
import useRegisterModal from "../../hooks/useRegisterModel";
import { useDispatch } from "react-redux";
import { signUp } from '../../actions/auth';
import { useNavigate } from "react-router-dom"

function RegisterModal() {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onToggle = useCallback(() => {
        if (isLoading) {
            return;
        }

        registerModal.onClose();
        loginModal.onOpen();
    }, [isLoading, registerModal, loginModal])

    const onSubmit = useCallback(async (e) => {
        try {
            setIsLoading(true);
            e.preventDefault();
            const formData = { email: email, username: username.trim(), password: password.trim(), confirmPassword: confirmPassword.trim(), name: name };
            dispatch(signUp(formData, navigate, registerModal));
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setName('');
            setUsername('');
        } catch (error){
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [registerModal, email, username, password, confirmPassword, name, dispatch, navigate]);

    const bodyContent = (
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
            <Input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                type='email'
                maxLength={30}
                value={email}
                disabled={isLoading}
            />
             <Input
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                maxLength={30}
                disabled={isLoading}
            />
            <Input
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                maxLength={30}
                disabled={isLoading}
            />
            <Input
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                maxLength={30}
                type='password'
                disabled={isLoading}
            />
            <Input
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                maxLength={30}
                type='password'
                disabled={isLoading}
            />
            <div className='flex flex-col gap-2 pt-10'>
                            <button type="submit" className='
                            w-full
                            font-semibold
                            rounded-full
                            text-xl
                            px-4
                            py-2
                            text-[#0B0C10]
                            transition
                            hover:opacity-80
                            bg-[#66FCF1]'>
                                Register
                </button>
            </div>
        </form>
    )

    const footerContent = (
        <div className="text-neutral-400 text-center mt-4">
            <p>Already have an account?  
                <span
                    onClick={onToggle}
                    className="
                        text-white
                        cursor-pointer"> Sign in</span>
            </p>

        </div>
    )

    return (
        <div>
            <Modal
                disabled={isLoading}
                isOpen={registerModal.isOpen}
                title="Create An Account"
                onClose={registerModal.onClose}
                onSubmit={onSubmit}
                body={bodyContent}
                footer={footerContent}/>
        </div>
    )
}

export default RegisterModal;