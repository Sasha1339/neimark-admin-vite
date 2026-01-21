import {createSlice} from "@reduxjs/toolkit";
import type {Publication} from "@/shared/publications/types.ts";
import {publicationApi} from "@/middlewares/publication.ts";

type PublicationState = {
  publications: Publication[];
  currentPublication: Publication | null;
  total: number;
}

const initialState: PublicationState = {
  publications: [],
  currentPublication: null,
  total: 0
}

export const publication = createSlice({
  name: "publication",
  initialState,
  reducers: {
    resetCurrentPublication: (state: PublicationState) => {
      state.currentPublication = null
    }
  },
  selectors: {
    currentPublication: (state: PublicationState) => state.currentPublication,
    allPublications: (state: PublicationState) => state.publications,
    total: (state: PublicationState) => state.total,
  },
  extraReducers: (builder) => {
    builder.addMatcher(publicationApi.endpoints.getAllPublications.matchFulfilled, (state, action) => {
      state.publications = action.payload.documents;
      state.total = action.payload.total;
    })
    builder.addMatcher(publicationApi.endpoints.getAllPublicationsWithPagination.matchFulfilled, (state, action) => {
      state.publications = [...state.publications, ...action.payload.documents];
      state.total = action.payload.total;
    })
    builder.addMatcher(publicationApi.endpoints.getPublication.matchFulfilled, (state, action) => {
      state.currentPublication = action.payload
    })
    builder.addMatcher(publicationApi.endpoints.updatePublicationFields.matchFulfilled, (state, action) => {
      state.currentPublication = action.payload
    })
  }
});

export const { reducer: publicationReducer, actions: publicationActions, selectors: publicationSelectors } = publication