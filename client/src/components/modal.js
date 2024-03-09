import { useCallback } from 'react';
import {AiOutlineClose} from 'react-icons/ai'

function Modal({ isOpen, onClose, disabled, title, body, footer }) {
    
    const handleClose = useCallback(() => {
        if (disabled) {
          return
        }
        
        onClose();
      }, [disabled, onClose]);
    
      
    if (!isOpen) {

        return null;
      }

    return (
        <>
            <div className='
                    justify-center
                    items-center
                    flex
                    overflow-x-auto
                    overflow-y-auto
                    fixed
                    inset-0
                    z-50
                    outline-none
                    focus:outline-none
                    bg-neutral-800
                    bg-opacity-70'>
                
                <div className="
                    relative
                    w-full
                    lg:w-3/6
                    my-6
                    mx-auto
                    lg:max-w-3xl
                    h-full
                    lg:h-auto">
                    
                    <div className='
                        h-full
                        lg:h-auto
                        border-0
                        rounded-lg
                        shadow-lg
                        relative
                        flex
                        flex-col
                        bg-[#0B0C10]
                        outline-none
                        focus:outline-none'>
                        
                        <div className='
                            
                            flex
                            items-center
                            justify-between
                            p-10
                            rounded-t

                            '>
                            
                            <h1 className="text-3xl font-semibold text-white">{title}</h1>
                            <button onClick={handleClose} className='
                                p-1
                                ml-auto
                                border-0
                                text-white
                                hover:opacity-70
                                transition'>
                                <AiOutlineClose size={20} />
                            </button>
                    
                        </div>
                        
                        <div className='realtive p-8 flex-auto'>
                            {body}
                            {footer}
                        </div>

                        
                </div>

            </div>

                

            </div> 
        </>
    )
}

export default Modal;