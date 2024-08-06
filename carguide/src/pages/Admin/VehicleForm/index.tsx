import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FormInput from '../../../components/FormInput';
import * as vehicleService from "../../../services/vehicle-service"
import * as forms from "../../../utils/forms";
import './styles.css';

function VehicleForm() {

  const params = useParams();

  const navigate = useNavigate();

  const isEditing = params.vehicleId !== 'create';

  const [formData, setFormData] = useState<any>({
    name: {
      value: "",
      id: "name",
      name: "name",
      type: "text",
      placeholder: "Nome",
      validation: function (value: string) {
        return /^.{3,80}$/.test(value.toLowerCase())
      },
      message: "Favor informar um nome que contenha de 3 a 80 caracteres"
    },
    model: {
      value: "",
      id: "model",
      name: "model",
      type: "text",
      placeholder: "Modelo",
      validation: function (value: string) {
        return /^.{3,80}$/.test(value.toLowerCase())
      },
      message: "Favor informar um modelo que contenha de 3 a 80 caracteres"
    },
    brand: {
      value: "",
      id: "brand",
      name: "brand",
      type: "text",
      placeholder: "Marca",
      validation: function (value: string) {
        return /^.{3,80}$/.test(value.toLowerCase())
      },
      message: "Favor informar uma Marca que contenha de 3 a 80 caracteres"
    },
    valueAmount: {
      value: "",
      id: "valueAmount",
      name: "valueAmount",
      type: "number",
      placeholder: "valueAmount",
      validation: function (priceValue: any) {
        return Number(priceValue) > 0;
      },
      message: "Favor informar um valor positivo"
    },
    imgUrl: {
      value: "",
      id: "imgUrl",
      name: "imgUrl",
      type: "text",
      placeholder: "Imagem"
    },
  })

  useEffect(() => {
    if (isEditing) {
      vehicleService.findCarById(Number(params.vehicleId))
        .then(response => {
          setFormData(forms.updateAll(formData, response.data));
        })
    }
  }, []);

  function handleInputChange(event: any) {
    const result = forms.updateAndValidate(formData, event.target.name, event.target.value)
    setFormData(result);
  }

  function handleTurnDirty(name: string) {
    const newFormData = forms.dirtyAndValidate(formData, name);
    setFormData(newFormData);
  }

  function handleSubmit(event: any) {
    event.preventDefault();

    const formDataValidated = forms.dirtyAndValidateAll(formData);
    if (forms.hasAnyInvalid(formDataValidated)) {
      setFormData(formDataValidated);
      return;
    }

    const requestBody = forms.toValues(formData)

    if (isEditing) {
      requestBody.id = params.vehicleId;
    }

    const request = isEditing 
      ? vehicleService.updateVehicle(requestBody)
      : vehicleService.insertVehicle(requestBody)

    request
      .then(() => {
        navigate("/admin/vehicles")
      }).catch(error => {
        const newInputs = forms.setBackendErros(formData, error.response.data.errors)
        setFormData(newInputs);
      })
  }

  return (
    <div>
      <main>
        <section id="vehicle-form-section" className="carguide-container">
          <div className="carguide-vehicle-form-container">
            <form className="carguide-card carguide-form" onSubmit={handleSubmit}>
              <h2>Dados do Veículo</h2>
              <div className="carguide-form-controls-container">
                <div>
                  <FormInput
                    {...formData.name}
                    className="carguide-form-control"
                    onTurnDirty={handleTurnDirty}
                    onChange={handleInputChange}
                  />
                  <div className='carguide-form-error'>{formData.name.message}</div>
                </div>
                <div>
                  <FormInput
                    {...formData.model}
                    className="carguide-form-control"
                    onTurnDirty={handleTurnDirty}
                    onChange={handleInputChange}
                  />
                  <div className='carguide-form-error'>{formData.model.message}</div>
                </div>
                <div>
                  <FormInput
                    {...formData.brand}
                    className="carguide-form-control"
                    onTurnDirty={handleTurnDirty}
                    onChange={handleInputChange}
                  />
                  <div className='carguide-form-error'>{formData.name.message}</div>
                </div>
                <div>
                  <FormInput
                    {...formData.valueAmount}
                    className="carguide-form-control"
                    onTurnDirty={handleTurnDirty}
                    onChange={handleInputChange}
                  />
                  <div className='carguide-form-error'>{formData.valueAmount.message}</div>
                </div>
                <div>
                  <FormInput
                    {...formData.imgUrl}
                    className="carguide-form-control"
                    onTurnDirty={handleTurnDirty}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="carguide-vehicle-form-buttons">
                <Link to="/admin/vehicles">
                  <button type="reset" className="carguide-btn carguide-btn-white">Cancelar</button>
                </Link>
                <button type="submit" className="carguide-btn carguide-btn-blue">Salvar</button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  )
}

export default VehicleForm
