import react from "react";

const ClosingGraph = ({ imageUrl }) => {


  return (
    <div className="ui container">
      <img className="ui bordered image" src={imageUrl} />
    </div>
  );
};

export default ClosingGraph;
