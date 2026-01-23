import {createSlice} from "@reduxjs/toolkit";
import type {Chat, MessageModel, ServiceModel} from "@/shared/services/types.ts";
import {serviceApi} from "@/middlewares/service.ts";

type ServiceState = {
  services: ServiceModel[];
  currentChat: Chat | null;
  messages: MessageModel[];
  totalService: number;
  totalMessage: number;
}

const initialState: ServiceState = {
  services: [],
  currentChat: null,
  messages: [],
  totalService: 0,
  totalMessage: 0
}

export const service = createSlice({
  name: "service",
  initialState,
  reducers: {
    resetCurrentChat: (state: ServiceState) => {
      state.currentChat = null
    }
  },
  selectors: {
    currentChat: (state: ServiceState) => state.currentChat,
    allServices: (state: ServiceState) => state.services,
    chatMessages: (state: ServiceState) => state.messages,
    totalService: (state: ServiceState) => state.totalService,
    totalMessage: (state: ServiceState) => state.totalMessage,
  },
  extraReducers: (builder) => {
    builder.addMatcher(serviceApi.endpoints.getAllServicesByType.matchFulfilled, (state, action) => {
      state.services = action.payload.documents;
      state.totalService = action.payload.total;
    })
    builder.addMatcher(serviceApi.endpoints.getAllMessagesByChat.matchFulfilled, (state, action) => {
      state.messages = action.payload.documents;
      state.totalMessage = action.payload.total;
    })
    builder.addMatcher(serviceApi.endpoints.getChat.matchFulfilled, (state, action) => {
      state.currentChat = action.payload;
    })
  }
});

export const { reducer: serviceReducer, actions: serviceActions, selectors: serviceSelectors } = service