import './styles.css';

type Props = {
  text : string;
}

function ButtonInverse({ text }: Props) {

  return (
    <div className="carguide-btn carguide-btn-white">
      {text}
    </div>
  )
}

export default ButtonInverse
