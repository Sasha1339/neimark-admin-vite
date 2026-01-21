import type {Publication} from "@/shared/publications/types.ts";
import {createSlice} from "@reduxjs/toolkit";
import {publicationApi} from "@/middlewares/publication.ts";
import type {Student} from "@/shared/students/types.ts";
import {studentApi} from "@/middlewares/student.ts";

type StudentState = {
  students: Student[];
  currentStudent: Student | null;
  total: number;
}

const initialState: StudentState = {
  students: [],
  currentStudent: null,
  total: 0
}

export const student = createSlice({
  name: "student",
  initialState,
  reducers: {
    resetCurrentStudent: (state: StudentState) => {
      state.currentStudent = null
    }
  },
  selectors: {
    currentStudent: (state: StudentState) => state.currentStudent,
    allStudents: (state: StudentState) => state.students,
    total: (state: StudentState) => state.total,
  },
  extraReducers: (builder) => {
    builder.addMatcher(studentApi.endpoints.getAllStudents.matchFulfilled, (state, action) => {
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

exp