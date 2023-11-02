import useLoginModal from "../../hooks/useLoginModel";
import { useCallback, useState } from "react";
import Input from "../input"
import Modal from "../modal";
import useRegisterModal from "../../hooks/useRegisterModel";

function RegisterModal() {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUserName] = useState('');
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onToggle = useCallback(() => {
        if (isLoading) {
            return;
        }

        registerModal.onClose();
        loginModal.onOpen();
    }, [isLoading, registerModal, loginModal])

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);

            //ADD Log IN and Register

            registerModal.onClose()
        } catch (error){
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [registerModal]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                disabled={isLoading}
            />
            <Input
                placeholder="Username"
                onChange={(e) => setUserName(e.target.value)}
                value={username}
                disabled={isLoading}
            />
            <Input
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                disabled={isLoading}
            />
            <Input
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                disabled={isLoading}
            />
            <Input
                placeholder="Location"
                onChange={(e) => setLocation(e.target.value)}
                value={location}
                disabled={isLoading}
            />
        </div>
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
                actionLabel="Register"
                onClose={registerModal.onClose}
                onSubmit={onSubmit}
                body={bodyContent}
                footer={footerContent}/>
        </div>
    )
}

export default RegisterModal;