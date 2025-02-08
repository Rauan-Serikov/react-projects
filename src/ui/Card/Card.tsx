import "./Card.css"

type CardProps = {
    type: 'rating' | 'genre' | 'favorites';
    value?: number | string;
    backgroundImg: string | null | undefined;
    onClick?: (e: React.SyntheticEvent<HTMLButtonElement>) => void;
}

const Card = ({ type, value, backgroundImg }: CardProps) => {
    if (type === 'rating') {
        return (
            <div className="card-rating-wrapper">
                <div className="card-rating-body" style={{ backgroundImage: `url('${backgroundImg}')` }}></div>
                {value && (
                    <span className="card-rating">{value}</span>
                )}
            </div>
        );
    }

    if (type === 'genre') {
        return (
            <div className="card-genre-wrapper">
                <div className="card-genre-body" style={{ backgroundImage: `url('${backgroundImg}')` }}></div>
                <div className="card-genre">{value}</div>
            </div>
        );
    }

    if (type === 'favorites') {
        return (
            <div className="card-favorites-wrapper">
                <div className="card-favorites-body" style={{ backgroundImage: `url('${backgroundImg}')` }}></div>
            </div>
        );
    }

    return null;
};

export default Card;
