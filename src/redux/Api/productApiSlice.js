import {PRODUCT_URL,UPLOAD_URL} from '../constants.js'
import {apiSlice} from './apiSlice.js'

export const productApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getProducts:builder.query({
            query:({keyword})=>({
                url:`${PRODUCT_URL}`,
                params:{keyword}
            }),
            keepUnusedDataFor:5,
            providesTags:['Product']
        }),
        getProductById:builder.query({
            query:(ProductId)=>`${PRODUCT_URL}/${ProductId}/fetch`,
            providesTags:(result,error,productId)=>[
                {type:"Product",id:productId}
            ]
        }),
        allProducts:builder.query({
            query:()=>`${PRODUCT_URL}/allproducts`
        }),
        getProductDetails:builder.query({
            query:(productId)=>({
                url:`${PRODUCT_URL}/${productId}/fetch`
            }),
            keepUnusedDataFor:5,
        }),
        createProduct:builder.mutation({
            query:(productData)=>({
                url:`${PRODUCT_URL}`,
                method:'POST',
                body:productData,
            }),
            invalidatesTags:['Product']
        }),
        updateProduct:builder.mutation({
            query:({productId,formData})=>({
                url:`${PRODUCT_URL}/${productId}/fetch`,
                method:'PUT',
                body:formData
            }),
        }),

        uploadProductImage:builder.mutation({
            query:(data)=>({
                url:`${UPLOAD_URL}`,
                method:'POST',
                body:data
            }),
        }),

        deleteProduct:builder.mutation({
            query:(productId)=>({
                url:`${PRODUCT_URL}/${productId}/fetch`,
                method:'DELETE',

            }),
            providesTags:['Product']
        }),
        createReview:builder.mutation({
            query:(data)=>({
                url:`${PRODUCT_URL}/${data.productId}/reviews`,
                method:'POST',
                body:data,
            }),
        }),
        getTopProducts:builder.query({
            query:()=>`${PRODUCT_URL}/top`,
            keepUnusedDataFor:5,
        }),
        getNewProducts:builder.query({
            query:()=>`${PRODUCT_URL}/new`,
            keepUnusedDataFor:5,
        }),
        getFilteredProducts:builder.query({
            query:({checked,radio})=>({
                url:`${PRODUCT_URL}/filtered-products`,
                method:'POST',
                body:{checked,radio}
            }),
        }),
    }),
});



export const {
useGetProductByIdQuery,
useGetProductsQuery,
useGetProductDetailsQuery,
useGetNewProductsQuery,
useAllProductsQuery,
useCreateProductMutation,
useDeleteProductMutation,
useCreateReviewMutation,
useGetTopProductsQuery,
useUploadProductImageMutation,
useUpdateProductMutation,
useGetFilteredProductsQuery
}=productApiSlice