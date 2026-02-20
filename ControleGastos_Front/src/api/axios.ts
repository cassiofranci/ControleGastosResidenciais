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
    }
    else {
      const status = error.response.status;

      switch (status) {
        case 400:
          alert("Requisição inválida.");
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
