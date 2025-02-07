function DeliveryAdress() {
  return (
    <div className="bg-gray-600 ">
      <form className="flex flex-col gap-4 p-4">
        <input type="text" placeholder="Name"/>
        <input type="text" placeholder="10-digit mobile number"/>
        <input type="text" placeholder="Pincode"/>
        <input type="text" placeholder="Locality"/>
        <input type="text" placeholder="Address"/>
        <input type="text" placeholder="City/District/Town"/>
        <input type="text" placeholder="State"/>
        <input type="text" placeholder="Landmark (Optional)"/>
        <input type="text" placeholder="Alternate Phone (Optional)"/>
        <button className="bg-green-500 text-white p-2 rounded-md">Save and Deliver Here</button>

      </form>
    </div>
  );
}

export default DeliveryAdress;
