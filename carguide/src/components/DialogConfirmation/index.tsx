import ButtonInverse from "../ButtonInverse";
import ButtonPrimary from "../ButtonPrimary"

type Props = {
    id : number;
    message: string;
    onDialogAnswer: Function
}

function DialogConfirmation({ id, message, onDialogAnswer }: Props) {

    return (
        <div className="carguide-dialog-background" onClick={() => onDialogAnswer(false, id)}>
            <div className="carguide-dialog-box" onClick={(event) => event.stopPropagation()}>
                <h2>{message}</h2>
                <div className="carguide-dialog-btn-container">
                    <div onClick={() => onDialogAnswer(false, id)}>
                        <ButtonInverse text="NÃO" />
                    </div>
                    <div onClick={() => onDialogAnswer(true, id)}>
                        <ButtonPrimary text="SIM" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DialogConfirmation
