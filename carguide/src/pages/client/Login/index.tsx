/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormInput from '../../../components/FormInput';
import * as authService from '../../../services/auth-service';
import { ContextToken } from '../../../utils/context-token';
import * as forms from "../../../utils/forms";
import './styles.css';

function Login() {

  const { setContextTokenPayload } = useContext(ContextToken)

  const navigate = useNavigate();

  const [submitResponseFail, setSubmitResponseFail] = useState(false);

  const [formData, setFormData] = useState<any>({
    username: {
      value: "",
      id: "username",
      name: "username",
      type: "text",
      placeholder: "Email",
      validation: function (value: string) {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value.toLowerCase());
      },
      message: "Favor informar um email válido",
    },
    password: {
      value: "",
      id: "password",
      name: "password",
      type: "password",
      placeholder: "Senha",
    }
  })

  function handleSubmit(event: any) {
    event.preventDefault();

    setSubmitResponseFail(false)
    const formDataValidated = forms.dirtyAndValidateAll(formData);
    if (forms.hasAnyInvalid(formDataValidated)) {
      setFormData(formDataValidated);
      return;
    }

    authService.LoginRequest(forms.toValues(formData))
      .then(response => {
        authService.saveAccessToken(response.data.access_token);
        setContextTokenPayload(authService.getAccessTokenPayload());
        navigate("/admin/home")
      }).catch(() => {
        setSubmitResponseFail(true);
      })
  }

  function handleInputChange(event: any) {
    const result = forms.updateAndValidate(formData, event.target.name, event.target.value)
    setFormData(result);
  }

  function handleTurnDirty(name: string) {
    const newFormData = forms.dirtyAndValidate(formData, name);
    setFormData(newFormData);
  }

  return (
    <div>
      <main>
        <section id="login-section" className="carguide-container">
          <div className="carguide-login-form-container">
            <form className="carguide-card carguide-form" onSubmit={handleSubmit}>
              <h2>Login</h2>
              <div className="carguide-form-controls-container">
                <div>
                  <FormInput
                    {...formData.username}
                    className="carguide-form-control"
                    onChange={handleInputChange}
                    onTurnDirty={handleTurnDirty}
                  />
                  <div className="carguide-form-error">{formData.username.message}</div>
                </div>
                <div>
                  <FormInput
                    {...formData.password}
                    className="carguide-form-control"
                    onChange={handleInputChange}
                    onTurnDirty={handleTurnDirty}
                  />

                </div>
              </div>
              {
                submitResponseFail &&
                <div className='carguide-form-global-error'>
                  usuário ou senha inválidos
                </div>
              }
              <div className="carguide-login-form-buttons carguide-mt20">
                <button type="submit" className="carguide-btn">
                  Entrar
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Login;