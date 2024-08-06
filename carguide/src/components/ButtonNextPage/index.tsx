import './styles.css';

type Props = {
  text : string;
}

function ButtonNextPage({text} : Props) {
  return (
    <div className="carguide-btn-next-page">
        {text}
    </div>
  )
}

export default ButtonNextPage
