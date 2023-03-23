import React from "react";
import Chat from "../../components/Chat/Chat";
import Contact from "../../components/Contact/Contact";
import { SVG } from "../../SVG";

import './HomePage.styles.scss';


const HomePage = () => {

    return (
        <div className="flex flex-1 h-[100vh] text-[#cbc9ee]">
            <div className="flex flex-1 flex-col">
                <div className="bg-[#2f2d52] flex py-[20px]">
                    <div className="flex-1 px-[20px]">
                        <h3>Kras</h3>
                    </div>
                    <div className="px-[20px]">
                        <SVG.Menu w={22} h={22} />
                    </div>
                </div>
                <div className="bg-[#3f3d61] flex py-[20px] border-b-[#444266] border-b-[2px]">
                    <div className="flex flex-1 px-[20px]">
                        <div className="flex items-center">
                            <SVG.Search w={18} h={18} />
                        </div>
                        <div className="flex items-center ml-[14px]" >
                            <input type="text" placeholder="Search"
                                className="bg-[transparent] outline-none "
                            />
                        </div>
                    </div>
                    <div className="px-[20px]">
                        <div className="flex items-center">
                            <SVG.Plus w={22} h={22} />
                        </div>
                    </div>
                </div>
                <div className="flex-1 overflow-y-scroll bg-[#3f3d61] scroll-hide">
                    <Contact name={'Doch'} />
                    <Contact name={'Doch'} messagesCount={4} online={true}/>
                    <Contact name={'Doch'} />
                    <Contact name={'Doch'} />
                    <Contact name={'Doch'} messagesCount={3} online={true} />
                    <Contact name={'Doch'} messagesCount={5} online={true} />
                    <Contact name={'Doch'} />
                    <Contact name={'Doch'} />
                    <Contact name={'Doch'} messagesCount={6} online={true} />
                    <Contact name={'Doch'} />
                </div>
                <div className="flex h-[70px] items-center bg-[#474b7b]">
                    <div className="px-[20px]">
                        <p>Vernone George</p>
                    </div>
                </div>
            </div>
           <Chat />
        </div>
    );
};

export default HomePage;