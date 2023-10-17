import { createSlice } from "@reduxjs/toolkit";
import { getApiInstance } from "../../utils/axios";


const initialState = {
  userData: null,
  userInsert: null,
  contract: null,
  insertContract: null,
  compras: null,
};

export const userSlice = createSlice({
  name: "usuario",
  initialState,
  reducers: {
    setUsuario: (state, action) => {
      state.userData = action.payload;
    },
    contratoData: (state, action) => {
      state.contract = action.payload;
    },
    getComprasBanco:(state,action) => {
      state.compras = action.payload;
    },
    getImoveisBanco:(state,action) => {
      state.compras = action.payload;
    }
  },
});

export const { setUsuario, contratoData, getComprasBanco, getImoveisBanco } = userSlice.actions;
export const userReducer = userSlice.reducer;

///Usuarios 
export const setUsuarioInfo =
  (usuario) =>
  async (dispatch) => {
    try {
      const instance = getApiInstance();
      const {data} = await instance.get(`/usuarios/${usuario}`);
      dispatch(setUsuario(data));
    } catch (error) {
      throw Error(error);
    }
};

export const insertUsuarioBanco = 
  (json) =>
  async(dispatch) => {
      try {
        const instance = getApiInstance();
        const {data} = await instance.post(`/usuarios`,json);
        console.log(data);
      } catch (error) {
        throw Error(error);
      }
};

///Contratos
export const  getContrato = 
  (id) => 
  async(dispatch) => {
    try {
        const instance = getApiInstance();
        const {data} = await instance.get(`/contratos/${id}`);
        dispatch(contratoData(data));
    } catch (error) {
        throw Error(error);
    }
};

export const insertContratoBanco = 
  (json) =>
  async(dispatch) => {
    try {
      const instance = getApiInstance();
      const {data} = await instance.post(`/contratos`,json);
      console.log(data);
    } catch (error) {
      throw Error(error);
    }
};

/// Compras
export const getCompras = 
  (id) =>
    async(dispatch)  => {
      try{
          const instance = getApiInstance();
          const {data} = await instance.get(`/compras/${id}`);
          dispatch(getComprasBanco(data));
          return data;
      } catch(error) {
          throw Error(error);
      }
};

export const insertCompra = 
  (json) => 
    async(dispatch) => {
      try{
        const instance = getApiInstance();
        const {data} = await instance.post(`/compras`,json);
        console.log(data);
      } catch(error) {
        throw Error(error);
      }
    }

//imovel 

export const getImoveis =
  (id) =>
    async(dispatch) => {
      try{
        const instance = getApiInstance();
        const {data} = await instance.get(`/imoveis/${id}`);
        dispatch(getImoveisBanco(data));
        console.log(data);
      } catch (error) {
        throw Error(error);
      }
};

export const insertImovel =
  (json) =>
    async(dispatch) => {
      try {
        const instance = getApiInstance();
        const {data} = await instance.post(`/imoveis`,json);
        console.log(data);
      } catch (error) {
          throw Error(error);
      }
    }

export const putImovel =
    (json) => 
      async(dispatch) => {
        try {
          const instance = getApiInstance();
          const {data} = await instance.put(`/imoveis`,json);
        } catch (error) {
          throw Error(error);
        }
      }

///Vendas

export const getVendas = 
  (id) =>
    async(dispatch)  => {
      try{
          const instance = getApiInstance();
          const {data} = await instance.get(`/vendas/${id}`);
          dispatch(getVendasBanco(data));
      } catch(error) {
          throw Error(error);
      }
};

export const insertVenda = 
  (json) => 
    async(dispatch) => {
      try{
        const instance = getApiInstance();
        const {data} = await instance.post(`/vendas`,json);
        console.log(data);
      } catch(error) {
        throw Error(error);
      }
    }