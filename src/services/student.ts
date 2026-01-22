import {createSlice} from "@reduxjs/toolkit";
import type {Student} from "@/shared/students/types.ts";
import {studentApi} from "@/middlewares/student.ts";
import type {DocumentFile} from "@/shared/documents/types.ts";
import {documentApi} from "@/middlewares/document.ts";

type StudentState = {
  students: Student[];
  currentStudent: Student | null;
  studentDocuments: DocumentFile[] | null;
  total: number;
}

const initialState: StudentState = {
  students: [],
  currentStudent: null,
  studentDocuments: [],
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
    studentDocuments: (state: StudentState) => state.studentDocuments,
    allStudents: (state: StudentState) => state.students,
    total: (state: StudentState) => state.total,
  },
  extraReducers: (builder) => {
    builder.addMatcher(studentApi.endpoints.getAllStudents.matchFulfilled, (state, action) => {
      state.students = action.payload.documents;
      state.total = action.payload.total;
    })
    builder.addMatcher(studentApi.endpoints.getAllStudentsWithPagination.matchFulfilled, (state, action) => {
      state.students = [...state.students, ...action.payload.documents];
      state.total = action.payload.total;
    })
    builder.addMatcher(studentApi.endpoints.getStudent.matchFulfilled, (state, action) => {
      state.currentStudent = action.payload
    })
    builder.addMatcher(studentApi.endpoints.updateStudentFields.matchFulfilled, (state, action) => {
      state.currentStudent = action.payload
      state.students = state.students.map(student =>
        student.$id === action.payload.$id
          ? { ...student, ...action.payload }
          : student
      );
    })
    builder.addMatcher(documentApi.endpoints.getAllDocumentsById.matchFulfilled, (state, action) => {
      state.studentDocuments = action.payload.documents;
    })
    builder.addMatcher(studentApi.endpoints.deleteStudent.matchFulfilled, (state, action) => {
      state.students = state.students.filter(student => action.meta.arg.originalArgs.id !== student.$id);
      state.total = state.total - 1;
    })
  }
});

export const { reducer: studentReducer, actions: studentActions, selectors: studentSelectors } = student