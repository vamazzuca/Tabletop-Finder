import useLoginModal from "../../hooks/useLoginModel";
import { useCallback, useState } from "react";
import Input from "../input"
import Modal from "../modal";

function LoginModal() {
    const loginModal = useLoginModal();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

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
        <div classNmae="flex flex-col gap-4">
            <Input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                disabled={isLoading}
            />
            <Input
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                disabled={isLoading}
            />
        </div>
    )

    return (
        <div>
            <Modal
                disabled={isLoading}
                isOpen={loginModal.isOpen}
                title="Login"
                actionLabel="Sign In"
                onClose={loginModal.onClose}
                onSubmit={onSubmit}
                body={bodyContent} />
        </div>
    )
}

export default LoginModal;