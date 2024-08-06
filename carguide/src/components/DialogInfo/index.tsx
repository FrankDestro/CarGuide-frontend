import ButtonPrimary from "../ButtonPrimary"

type Props = {
    message: string;
    onDialogClose: Function
}

function DialogInfo({ message, onDialogClose }: Props) {

    return (
        <div className="carguide-dialog-background" onClick={() => onDialogClose()}>
            <div className="carguide-dialog-box" onClick={(event) => event.stopPropagation()}>
                <h2>{message}</h2>
                <div className="carguide-dialog-btn" onClick={() => onDialogClose()}>
                    <ButtonPrimary text="OK" />
                </div>
            </div>
        </div>
    )
}

export default DialogInfo
