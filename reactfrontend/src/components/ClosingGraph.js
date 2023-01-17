import react from "react";

const ClosingGraph = ({ imageUrl }) => {


  return (
    <div>
      <img src={imageUrl}  style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
    </div>
  );
};

export default ClosingGraph;
