import React from "react";

const Categories = (props) => {
  const rows = props.categories.map((category) => {
    return (
      <tr key={category.id}>
        <td>{category.name}</td>
        <td>{category.description}</td>
        <td>
        <button class="btn btn-link text-danger" >|Delete|</button>
        </td>
      </tr>
    );
  });

  return ( 
    <div className="col-md-7" >

      <br></br>
      <h1>Categories</h1>

      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr></tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
};

export default Categories;
