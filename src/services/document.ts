import {createSlice} from "@reduxjs/toolkit";
import type {DocumentFile} from "@/shared/documents/types.ts";
import {documentApi} from "@/middlewares/document.ts";
import {publicationApi} from "@/middlewares/publication.ts";

type DocumentState = {
  documents: DocumentFile[];
  currentDocument: DocumentFile | null;
  total: number;
}

const initialState: DocumentState = {
  documents: [],
  currentDocument: null,
  total: 0
}

export const document = createSlice({
  name: "document",
  initialState,
  reducers: {
    resetCurrentDocument: (state: DocumentState) => {
      state.currentDocument = null
    }
  },
  selectors: {
    currentDocument: (state: DocumentState) => state.currentDocument,
    allDocuments: (state: DocumentState) => state.documents,
    total: (state: DocumentState) => state.total,
  },
  extraReducers: (builder) => {
    builder.addMatcher(documentApi.endpoints.getAllDocuments.matchFulfilled, (state, action) => {
      state.documents = action.payload.documents;
      state.total = action.payload.total;
    })
    builder.addMatcher(documentApi.endpoints.getAllDocumentsWithPagination.matchFulfilled, (state, action) => {
      state.documents = [...state.documents, ...action.payload.documents];
      state.total = action.payload.total;
    })
    builder.addMatcher(documentApi.endpoints.approvedDocument.matchFulfilled, (state, action) => {
      state.documents = state.documents.map(document =>
        document.$id === action.payload.$id
          ? { ...document, ...action.payload }
          : document
      );
    })
    builder.addMatcher(documentApi.endpoints.rejectedDocument.matchFulfilled, (state, action) => {
      state.documents = state.documents.map(document =>
        document.$id === action.payload.$id
          ? { ...document, ...action.payload }
          : document
      );
    })
  }
});

export const { reducer: documentReducer, actions: documentActions, selectors: documentSelectors } = document