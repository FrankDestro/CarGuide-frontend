import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import deleteIcon from "../../../assets/img/delete.svg";
import editIcon from "../../../assets/img/edit.svg";
import ButtonInverse from "../../../components/ButtonInverse";
import ButtonNextPage2 from "../../../components/ButtonNextPage2";
import DialogConfirmation from "../../../components/DialogConfirmation";
import DialogInfo from "../../../components/DialogInfo";
import { VehicleDTO } from "../../../models/car";
import * as vehicleService from "../../../services/vehicle-service";
import "./styles.css";


type QueryParams = {
  page: number;
};

function VehicleListing() {

  
  const navigate = useNavigate();

  const [dialogInfoData, setDialogInfoData] = useState({
    visible: false,
    message: "Operação realizada com Sucesso!",
  });

  const [dialogConfirmationData, setDialogConfirmationData] = useState({
    visible: false,
    id: 0,
    message: "Tem certeza que deseja deletar?",
  });

  const [isLastPage, setIsLastPage] = useState(false);

  const [vehicles, setVehicles] = useState<VehicleDTO[]>([]);

  const [queryParams, setQueryParams] = useState<QueryParams>({
    page: 0,
  });

  useEffect(() => {
    vehicleService.findCarsPageRequest(queryParams.page).then((response) => {
      const nextPage = response.data.content;
      setVehicles(vehicles.concat(nextPage));
      setIsLastPage(response.data.last);
    });
  }, [queryParams]);

  function handleNextPageClick() {
    setQueryParams({ ...queryParams, page: queryParams.page + 1 });
  }

  function handleDialogInfoClose() {
    setDialogInfoData({ ...dialogInfoData, visible: false });
  }

  function handleDeleteClick(productId: number) {
    setDialogConfirmationData({
      ...dialogConfirmationData,
      id: productId,
      visible: true,
    });
  }

  function handleUpdateClick(vehicle: number) {
    navigate(`/admin/vehicle/${vehicle}`);
  }

  function handleDialogConfirmationAnswer(answer: boolean, vehicleId: number) {
    if (answer === true) {
      vehicleService
        .deleteVehicleById(vehicleId)
        .then(() => {
          setVehicles([]);
          setQueryParams({ ...queryParams, page: 0 });
        })
        .catch((error) => {
          setDialogInfoData({
            visible: true,
            message: error.response.data.error,
          });
        });
    }

    setDialogConfirmationData({ ...dialogConfirmationData, visible: false });
  }

  function hanndleNewProductClick() {
    navigate("/admin/vehicle/create");
  }

  return (
    <div>
      <main>
        <section id="product-listing-section" className="carguide-container">
          <h2 className="carguide-section-title carguide-mb20">
            Cadastro de Veiculos
          </h2>

          <div className="carguide-btn-page-container carguide-mb20">
            <div onClick={hanndleNewProductClick}>
              <ButtonInverse text="Novo Vehicle" />
            </div>
          </div>

          <table className="carguide-table carguide-mb20 carguide-mt20">
            <thead>
              <tr>
                <th className="carguide-tb576">ID</th>
                <th></th>

                <th className="carguide-txt-left">Nome</th>
                <th className="carguide-txt-left">Modelo</th>
                <th className="carguide-txt-left">Marca</th>
                <th className="carguide-tb768">Preço</th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle) => (
                <tr key={vehicle.id}>
                  <td className="carguide-tb576">{vehicle.id}</td>
                  <td style={{ width: "150px" }}>
                    <img
                      className="carguide-vehicle-listing-image"
                      src={vehicle.imgUrl}
                      alt={vehicle.name}
                    />
                  </td>
                  <td className="carguide-txt-left">{vehicle.name}</td>
                  <td className="carguide-txt-left">{vehicle.model}</td>
                  <td className="carguide-txt-left">{vehicle.brand}</td>
                  <td className="carguide-tb768">
                    {" "}
                    R$ {vehicle.valueAmount.toFixed(2)}
                  </td>
                  <td>
                    <img
                      className="carguide-vehicle-listing-btn"
                      src={editIcon}
                      alt="Editar"
                      onClick={() => handleUpdateClick(vehicle.id)}
                    />
                  </td>
                  <td>
                    <img
                      className="carguide-vehicle-listing-btn"
                      src={deleteIcon}
                      alt="Deletar"
                      onClick={() => handleDeleteClick(vehicle.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!isLastPage && <ButtonNextPage2 onNextPage={handleNextPageClick} />}
        </section>
        {dialogInfoData.visible && (
          <DialogInfo
            message={dialogInfoData.message}
            onDialogClose={handleDialogInfoClose}
          />
        )}

        {dialogConfirmationData.visible && (
          <DialogConfirmation
            id={dialogConfirmationData.id}
            message={dialogConfirmationData.message}
            onDialogAnswer={handleDialogConfirmationAnswer}
          />
        )}
      </main>
    </div>
  );
}

export default VehicleListing;
