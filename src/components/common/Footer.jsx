import React from "react";
import logoImg from "../../assets/common/logo.png";
import { BodyOne } from "./CustomComponents";
export default function Footer() {
  return (
    <>
      <footer className="py-14">
        <div className="container grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <img src={logoImg} alt="" className="h-7" />
            <div className="mt-5 flex flex-col gap-2 text-primary-gray">
              <p>Address : Bapunagar , Ahmedabad</p>
              <p>Email : example@domain.com</p>
              <p>Call : +91 123 456 7890</p>
            </div>
            <br />
            <BodyOne>Subscribe To Our Newsletter</BodyOne>
            <input
              type="text"
              className="w-full rounded-md border border-gray-300 bg-white-100 p-3 outline-none"
              placeholder="Enter your email address"
            />
          </div>

          <div className="">
            <h5 className="text-[22px] font-medium">Our Stores</h5>
            <div className="flex flex-col gap-4 text-[15px] font-medium text-gray-600">
              <a href="" className="">
                Normal
              </a>
              <a href="">Shop With Sidebar</a>
              <a href="">Shop With Category</a>
              <a href="">Shop Filters Top Bar</a>
              <a href="">Shop Wide</a>
              <a href="">My Account</a>
            </div>
          </div>

          <div className="">
            <h5 className="text-[22px] font-medium">Usefull Links</h5>
            <div className="flex flex-col gap-4 text-[15px] font-medium text-gray-600">
              <a href="" className="">
                Normal
              </a>
              <a href="">Shop With Sidebar</a>
              <a href="">Shop With Category</a>
              <a href="">Shop Filters Top Bar</a>
              <a href="">Shop Wide</a>
              <a href="">My Account</a>
            </div>
          </div>

          <div className="">
            <h5 className="text-[22px] font-medium">Our Blog</h5>
            <div className="flex flex-col gap-4 text-[15px] font-medium text-gray-600">
              <a href="" className="">
                Normal
              </a>
              <a href="">Shop With Sidebar</a>
              <a href="">Shop With Category</a>
              <a href="">Shop Filters Top Bar</a>
              <a href="">Shop Wide</a>
              <a href="">My Account</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
