import React from "react";
import { SVG } from "../../SVG";
import Message from "../Message/Message";

const Chat = ({ online }) => {
    return (
        <div className="flex flex-[3] flex-col">
            <div className=" bg-[#5e5c8e] flex py-[20px] ">
                <div className="px-[20px]">
                    <h3>CONTACT NAME</h3>
                </div>
                <div className="flex">
                    <div className="flex items-center mr-[6px]">
                        <div className={`${online ? 'bg-[#00cf4b]' : 'border-[2px] border-[black]'}  w-[10px] h-[10px]  rounded-[50%]   `}></div>
                    </div>
                    <p>{online ? 'Online' : 'Offline'}</p>
                </div>
            </div>
            <div className=" bg-[#dcdef7] flex-1 overflow-y-scroll scroll-hide">
                <Message side={'left'} hasAvatar={true} />
                <Message side={'right'} hasAvatar={true} />
                <Message side={'right'} hasAvatar={false} />
                <Message side={'right'} hasAvatar={false} />
                <Message side={'left'} hasAvatar={true} />
                <Message side={'left'} hasAvatar={false} />
                <Message side={'left'} hasAvatar={false} />
                <Message side={'left'} hasAvatar={false} />
            </div>
            <div className="bg-[white]" >
                <div className="h-[70px] flex items-center">
                    <input type="text" placeholder="Type somthing to send"
                        className="text-[black] outline-none pl-[20px] flex-1"
                    />
                    <div className="pr-[20px]">
                        <button>
                            <SVG.Send w={24} h={24} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chat;