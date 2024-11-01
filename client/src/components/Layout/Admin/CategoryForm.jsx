import React from "react";

const CategoryForm = ({handleSubmit , value , setvalue}) => {
  return (
    <div>
      <form className="d-flex flex-row justify-content-center align-items-center" onSubmit={handleSubmit}>
        <div className="m-3">
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            placeholder="Add new Category"
            value={value}
            onChange={ev=> setvalue(ev.target.value)}
          />
        </div>
        
        <button type="submit" className="btn btn-primary m-2">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;
