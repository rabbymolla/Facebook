import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
  }),
  endpoints: (builder) => ({
    addUser: builder.mutation({
      query: (body) => ({
        url: "/api/v1/auth",
        method: "POST",
        body,
      }),
    }),
    loginUser: builder.mutation({
      query: (body) => ({
        url: "/api/v1/auth/login",
        method: "POST",
        body,
      }),
    }),
    otpUser: builder.mutation({
      query: (body) => ({
        url: "/api/v1/auth/verify",
        method: "POST",
        body,
      }),
    }),
    resenOTPUser: builder.mutation({
      query: (body) => ({
        url: "/api/v1/auth/resend",
        method: "PUT",
        body,
      }),
    }),
    forgotUser: builder.mutation({
      query: (body) => ({
        url: "/api/v1/auth/forgot",
        method: "POST",
        body,
      }),
    }),
    createPost: builder.mutation({
      query: ({ type, images, text, background, user, veryfied }) => ({
        url: "/api/v1/post/creactpost",
        method: "POST",
        body: { type, images, text, background, user, veryfied },
      }),
      transformResponse: (respons) => ({
        status: "done",
        data: respons,
      }),
    }),
    uploadPost: builder.mutation({
      query: ({ formData, path }) => ({
        url: "/api/v1/upload/uploading",
        method: "POST",
        body: formData,
      }),
    }),
    listImages: builder.mutation({
      query: ({ path, sort, max }) => ({
        url: "/api/v1/upload/listimg",
        method: "POST",
        body: { path, sort, max },
      }),
    }),
    getAllPost: builder.query({
      query: () => "/api/v1/post/viewpost",
    }),
    getUserProfile: builder.query({
      query: (username) => `/api/v1/auth/getuser/${username}`,
    }),

    uploadProfile: builder.mutation({
      query: ({ url, id }) => ({
        url: "/api/v1/auth/updateprofile",
        method: "PUT",
        body: { url, id },
      }),
      transformResponse: (respons) => ({
        status: "done",
        data: respons,
      }),
    }),
    uploadCoverProfile: builder.mutation({
      query: ({ url, id }) => ({
        url: "/api/v1/auth/updatecover",
        method: "PUT",
        body: { url, id },
      }),
      transformResponse: (respons) => ({
        status: "done",
        data: respons,
      }),
    }),

    //
  }),
});
export const {
  useAddUserMutation,
  useLoginUserMutation,
  useOtpUserMutation,
  useForgotUserMutation,
  useResenOTPUserMutation,
  useCreatePostMutation,
  useUploadPostMutation,
  useListImagesMutation,
  useGetAllPostQuery,
  useGetUserProfileQuery,
  useUploadProfileMutation,
  useUploadCoverProfileMutation,
} = authApi;

// // Define a service using a base URL and expected endpoints
// export const authApi = createApi({
//   reducerPath: 'pokemonApi',
//   baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
//   endpoints: (builder) => ({
//     getPokemonByName: builder.query<Pokemon, string>({
//       query: (name) => `pokemon/${name}`,
//     }),
//   }),
// })

// // Export hooks for usage in functional components, which are
// // auto-generated based on the defined endpoints
// export const { useGetPokemonByNameQuery } = pokemonApi
