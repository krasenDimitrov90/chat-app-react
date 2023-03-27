import React from "react";

import './FormCard.styles.scss';

const FormCard = ({
    submitHandler,
    formTitle,
    children,
    btnName,
    formIsInvalid,
}) => {

    return (
        <form onSubmit={submitHandler} className='form-card' >
            <div className="flex justify-center items-center p-[20px] bg-[#16a085] rounded-t-[4px] ">
                <h1 className="form-card-title font-bold text-[white]" >{formTitle}</h1>
            </div>
            <div className="form-content" >
                {children}
            </div>
        </form>
    );
};

export default FormCard;