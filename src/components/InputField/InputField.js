import React from "react";
import { SVG } from "../../SVG";

import './InputField.styles.scss';

const InputField = (props) => {

    return (
        <>
            <div className="form-input-wrapper mb-[12px]">
                <div className="form-input-card">
                    <div className="flex p-[4px] w-[32px] h-[32px] bg-[#16a085] text-[white] rounded-l-[4px]">
                        {props.children}
                    </div>
                    <input className="form-input-field rounded-r-[4px]"
                        placeholder={props.placeholder}
                        type={props.type}
                        id={props.id}
                        name={props.name}
                        value={props.value}
                        onChange={props.onChange}
                        onBlur={props.onBlur}
                    />
                </div>
                {props.inputIsInvalid && <p className="invalid-input">{props.invalidMessage}</p>}
            </div>
        </>
    );
};

export default InputField;