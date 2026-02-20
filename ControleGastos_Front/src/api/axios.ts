import axios from "axios";

export const api = axios.create({
  baseURL: "https://localhost:7086/api",
});

//Incluido um interceptor para tratamento das mensagens de erro
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      alert("Servidor indisponível. Tente novamente.");
      return Promise.reject(error);
    }
    else {
      const status = error.response.status;   
      const data = error.response.data;

      switch (status) {
        case 400:
        alert(error.response.data);        
        break;
        case 401:
          alert("Não autorizado.");
          break;
        case 404:
          alert("Recurso não encontrado.");
          break;
        case 500:
          alert("Erro interno no servidor.");
          break;
        default:
          alert("Erro inesperado.");
      }
    }

    return Promise.reject(error);
  }
);
