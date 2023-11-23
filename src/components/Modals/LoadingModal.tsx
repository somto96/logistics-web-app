import React, { Component, MutableRefObject, RefObject } from 'react';
import { createPortal } from 'react-dom'


export interface LoadingModalProps{
    message?: string;
    ref?: Function;
    backgroundScrollable?: boolean;
    ignorePreline?: boolean
}

class LoadingModal extends Component<LoadingModalProps, any>{

    // Instance variables
    private _toggleRef?: RefObject<HTMLButtonElement> | null;
    // private _globalModalEl?: MutableRefObject<HTMLDivElement|null>| null;
    // private _globalModalEl = document.getElementById('imperium-modal')
    
    constructor(props: LoadingModalProps){
        super(props);
    
        this._toggleRef = React.createRef<HTMLButtonElement>();
        // this._globalModalEl = React.createRef<HTMLDivElement>();
        
    }

    toggle(){

        if (this.props.ignorePreline) {
            document.body.classList.toggle('overflow-hidden');
            // document.getElementById('imperium-modal')?.classList.toggle('hidden')
            // this._globalModalEl?.classList.toggle('hidden')
        }
        else{
            this._toggleRef?.current?.click();
        }
       
    }

    render(): JSX.Element {

        return(
            <>
            <button 
                ref={this._toggleRef}
                type="button" 
                className="hidden" 
                data-hs-overlay="#hs-static-loading-modal">
                toggle modal
            </button>

            <div 
                id="hs-static-loading-modal" 
                className="hs-overlay hidden w-full h-full fixed top-0 start-0 overflow-x-hidden overflow-y-auto [--overlay-backdrop:static] z-50" 
                // data-hs-overlay-keyboard="false"
            >
                <div className='h-full flex items-center justify-center'>
                    <p className='text-white'>{ this.props.message || "Please wait..." }</p>
                </div>
            </div>

            </>
        )
    }
}

export default LoadingModal;