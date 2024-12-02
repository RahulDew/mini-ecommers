import React, { useState } from "react";

export default function StatusSelector({
  id,
  orderStatus,
  handleUpdateOrderStatus,
}: {
  orderStatus: string;
  id: string;
  handleUpdateOrderStatus: (id: string, status: string) => void;
}) {
  let statusColor =
    orderStatus === "Pending"
      ? "bg-yellow-100 text-yellow-700 border-2 border-yellow-700"
      : orderStatus === "Completed"
      ? "bg-green-100 text-green-700 border-2 border-green-700"
      : "bg-red-100 text-red-700 border-2 border-red-700";

  const handleChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("Updated Order Status: ", e.target.value);
    if (orderStatus !== e.target.value) {
      handleUpdateOrderStatus(id, e.target.value);
    }
  };

  return (
    <div className="flex flex-col items-start w-full max-w-sm mx-auto mt-8 bg-gray-100 p-4 rounded-lg shadow-md">
      <select
        id="status"
        value={orderStatus}
        onChange={handleChangeStatus}
        className={`w-[100px] px-4 py-1 border ${statusColor} rounded-full font-semibold text-xs focus:outline-none focus:ring-2 
          `}
      >
        <option
          className="bg-yellow-100 text-yellow-700 rounded-full"
          value="Pending"
        >
          Pending
        </option>
        <option
          className="bg-green-100 text-green-700 border-2 border-green-700"
          value="Completed"
        >
          Completed
        </option>
        <option
          className="bg-red-100 text-red-700 border-2 border-red-700"
          value="Cancelled"
        >
          Cancelled
        </option>
      </select>
    </div>
  );
}
