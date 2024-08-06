import { useEffect, useState } from "react";
import CatalogCard from "../../../components/CatalogCard";
import * as vehicleService from "../../../services/vehicle-service";

import ButtonNextPage from "../../../components/ButtonNextPage";
import { VehicleDTO } from "../../../models/car";
import "./styles.css";

type QueryParams = {
  page: number;
};

function Catalog() {
  const [isLastPage, setIsLastPage] = useState(false);

  const [vehicles, setVehicles] = useState<VehicleDTO[]>([]);

  const [queryParams, setQueryParams] = useState<QueryParams>({
    page: 0,
  });

  useEffect(() => {
    vehicleService.
    findCarsPageRequest(queryParams.page).then((response) => {
      const nextPage = response.data.content;
      setVehicles(vehicles.concat(nextPage));
      setIsLastPage(response.data.last);
    });
  }, [queryParams]);

  function handleNextPageClick() {
    setQueryParams({ ...queryParams, page: queryParams.page + 1 });
  }

  return (
    <main>
      <section id="catalog-section" className="carguide-container">
        <div className="carguide-catalog-cards dsc-mb20 dsc-mt20">
          {vehicles.map((vehicle) => (
            <CatalogCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
        {!isLastPage ? (
          <div onClick={handleNextPageClick}>
            <ButtonNextPage text={"Carregar Mais itens"} />
          </div>
        ) : (
          <ButtonNextPage text={"Não há mais itens para exibir"} />
        )}
      </section>
    </main>
  );
}

export default Catalog;
