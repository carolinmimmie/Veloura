import React from "react";

const Form = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h3 className="uppercase tracking-widest text-center">
          Never Miss Out
        </h3>
        <p>
          Don’t miss out on the latest arrivals, curated collections, and
          special editions.
        </p>
      </div>
      <form
        action=""
        className="border border-black px-4 py-2.5 flex justify-between "
      >
        <input type="text" placeholder="Enter email adress" />
        <button type="submit" className="ml-2 text-black">
          ➜
        </button>
      </form>
    </div>
  );
};

export default Form;
