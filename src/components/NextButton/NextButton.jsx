import "./NextButton.css"
import { Link } from 'react-router-dom'


const NextButton = ({ info }) => {

    return (
        <Link className="button-link" to={info["path"]}>{info["text"]}</Link>
    );
};

export default NextButton;
