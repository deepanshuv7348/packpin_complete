import React, { useRef } from "react";
import img from '../assets/shop.png'
import emailjs from "@emailjs/browser";

const Bulk = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_s83qt38",
        "template_z1esh3s",
        form.current,
        "wm7rU-w433dtbW80Y"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("message sent");
        },
        (error) => {
          console.log(error.text);
        }
      );
  };


  return (
    <div className='h-[115vh] w-[100%] flex items-center justify-center  border-red-500 ' >

      <form ref={form} onSubmit={sendEmail} className="xs:w-[90%] w-[40%] bg-slate-400 rounded-3xl p-3 justify-center items-center mt-2 ">
        <div className='flex flex-col justify-center  items-center'>
          <img src={img} alt="" className='h-14' />
          <span className='text-center font-bold xs:text-[15px] '>Become a Packpin Seller</span> <br />
          <span className='text-center text-[13px] xs:text-[13px] mt-[-10px] '>Want to sell your products to millions of B2B customers globally?
            Don’t worry we are here to handhold you in your journey. </span>
        </div>

        <div className="flex my-4 flex-col">
          <div className="w-full px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide  text-xs font-bold mb-2" for="grid-first-name">
              FULL Name
            </label>
            <input name="user_name" className="border-red-500 appearance-none block w-full  text-gray-700 border  rounded-2xl py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" />
          </div>

          <div className="w-full  px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
              Mobile Number
            </label>
            <input name="user_mo" className="border-red-500 appearance-none block w-full  text-gray-700 border  rounded-2xl py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text"/>
          </div>

        </div>
        <div className="flex flex-col">
          <div className="w-full  px-3 mb-6 md:mb-0">
            <label  className="block uppercase tracking-wide  text-xs font-bold mb-2" for="grid-first-name">
              Business Name
            </label>
            <input name="user_bisi" className="border-red-500 appearance-none block w-full  text-gray-700 border  rounded-2xl py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" />
          </div>

          <div className="w-full  px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
              Business Contact
            </label>
            <input name="user_business_Contect" className="border-red-500 appearance-none block w-full  text-gray-700 border  rounded-2xl py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text"/>
          </div>

        </div>
        <div className="flex flex-col">
          <div className="w-full mt-3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide  text-xs font-bold mb-2" for="grid-first-name">
              GSTIN*
            </label>
            <input name="user_gstin" className="border-red-500 appearance-none block w-full  text-gray-700 border  rounded-2xl py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" />
          </div>
          <div className="w-full  px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
              Business Address
            </label>
            <input name="user_address" className="border-red-500 appearance-none block w-full  text-gray-700 border  rounded-2xl py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text"/>
          </div>
        </div>

        <button class="w-[94%] mb-10 mt-6 flex justify-center ml-3 items-center  bg-red-500 hover:bg-green-500 text-white hover:text-black font-bold py-3 rounded-xl focus:outline-none focus:shadow-outline text-19  " type="submit" value="Send" >
          Submit
        </button>

      </form>

    </div>

  )
}

export default Bulk
