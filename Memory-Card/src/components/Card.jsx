/* eslint-disable react/prop-types */

const Card = ({ imageUrl, text, onClick }) => {
    return (
      <div className="card" onClick={onClick}>
        <img src={imageUrl} alt={text} />
        <p>{text}</p>
      </div>
    );
  };
  
  export default Card;
  