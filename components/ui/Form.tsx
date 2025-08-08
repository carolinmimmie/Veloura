import React from "react";

const Form = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 ml-8 text-center">
        <h3 className="uppercase tracking-widest">Join the list</h3>
        <p>
          Be the first to know about new arrivals, collections and exclusive
          releases.
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
