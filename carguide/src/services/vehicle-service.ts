import { AxiosRequestConfig } from "axios";
import { requestBackend } from "../utils/request";
import { VehicleDTO } from "../models/car";

export function findCarsPageRequest(page: number, size = 9) {
    const config: AxiosRequestConfig = {
      method: "GET",
      url: '/vehicle',
      params: {
        page,
        size,
      }
  
    }
    return requestBackend(config);
  }

  export function findCarById(id: number) {
    return requestBackend({ url: `/vehicle/${id}` })
  }

  export function deleteVehicleById(id: number) {
    const config: AxiosRequestConfig = {
      method: "DELETE",
      url: `/vehicle/${id}`,
      withCredentials: true
    }
    return requestBackend(config);
  }
  
  export function updateVehicle(obj: VehicleDTO) {
    const config: AxiosRequestConfig = {
      method: "PUT",
      url: `/vehicle/${obj.id}`,
      withCredentials: true,
      data: obj
    }
    return requestBackend(config);
  }
  
  export function insertVehicle(obj: VehicleDTO) {
    const config: AxiosRequestConfig = {
      method: "POST",
      url: "/vehicle",
      withCredentials: true,
      data: obj
    }
    return requestBackend(config);
  }