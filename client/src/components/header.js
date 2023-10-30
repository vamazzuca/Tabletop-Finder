import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';

function Header({ label, showBackArrow }) {
    
    const navigate = useNavigate();

    return (
        <div className="p-5 w-11/12">
            <div className="flex lex-row items-center gap-2">
                {
                    showBackArrow && (
                        <BiArrowBack onClick={() => navigate(-1)} color="white" size={20} className="cursor-pointer hover:opacity-70 transition"/>
                    )
                }
                <h1 className="text-white text-xl font-semibold">{label}</h1>
            </div>
        </div>
        
    )
}

export default Header;