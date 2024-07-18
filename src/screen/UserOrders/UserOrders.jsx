import React, { useEffect, useState } from "react";
import { BodyOne } from "../../components/common/CustomComponents";
import { Link } from "react-router-dom";

export default function UserOrders() {
  const loggedInUser = sessionStorage.getItem("loggedInUser")
    ? JSON.parse(sessionStorage.getItem("loggedInUser"))
    : "";
  const [userOrders, setUserOrders] = useState([]);
  useEffect(() => {
    const getUserOrders = async () => {
      const res = await fetch(
        `http://localhost:8300/orders/?userId=${loggedInUser.id}`,
      );
      const data = await res.json();
      setUserOrders(data);
    };
    getUserOrders();
  }, []);
  if (userOrders.length < 1) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <h1 className="text-3xl font-medium">
          {" "}
          You have not ordered anything yet.
        </h1>
        <br />
        <br />
        <Link to={"/shop"} className="text-[15px] text-primary-green">
          Go to Shop.
        </Link>
      </div>
    );
  }
  return (
    <div className="container">
      <h1 className="m-8 text-center text-[40px] font-medium">Orders </h1>
      <div className="flex justify-between">
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse border border-slate-400 text-center text-sm rtl:text-right">
            <thead>
              <tr>
                <th scope="col" className="border border-slate-300 px-16 py-5">
                  SR. NO
                </th>
                <th scope="col" className="border border-slate-300 px-16 py-5">
                  ORDER DATE
                </th>
                <th className="border border-slate-300 px-6 py-5">
                  PRODUCT DETAIL
                </th>
                <th className="border border-slate-300 px-6 py-5">
                  TOTAL QUANTITY
                </th>
                <th className="border border-slate-300 px-6 py-5">
                  TOTAL BILL
                </th>
                <th className="border border-slate-300 px-6 py-5">
                  ORDER STATUS
                </th>
              </tr>
            </thead>
            <tbody>
              {userOrders.map((order, i) => (
                <tr key={i}>
                  <td className="border border-slate-300">
                    <BodyOne>{++i}</BodyOne>
                  </td>
                  <td className="border border-slate-300">
                    <BodyOne>{order.orderDate}</BodyOne>
                  </td>
                  <td className="border border-slate-300 p-4 pl-[60px]">
                    {order.products.map((product, i) => (
                      <div key={i}>
                        <p>
                          <b>Product Name : </b> {product.title}
                        </p>
                        <p>
                          <b>Quantity :</b> {product.quantity}
                        </p>
                        <p>
                          <b> price : </b> {product.price}
                        </p>
                      </div>
                    ))}
                  </td>
                  <td className="border border-slate-300 p-4">
                    <BodyOne>
                      {order.products
                        .map((product) => product.quantity)
                        .reduce((a, c) => a + c, 0)}
                    </BodyOne>
                  </td>
                  <td className="border border-slate-300 p-4">
                    <BodyOne>{order.total}</BodyOne>
                  </td>
                  <td className="border border-slate-300 p-4 uppercase">
                    <BodyOne>{order.status}</BodyOne>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
