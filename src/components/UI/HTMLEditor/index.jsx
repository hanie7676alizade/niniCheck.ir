import React from 'react'
import { Editor } from '@tinymce/tinymce-react';

import axios from "axiosInstance";


export const HTMLEditor = (props) => {


   const handleContentChange = (content, editor) => {
      props.contentChangedHandler(content);
   }

   const handleImageUpload = async (blobInfo, success, failure) => {
      try {
         const formData = new FormData();
         formData.append('file', blobInfo.blob(), blobInfo.filename());

         const result = await axios.post('admin/upload',
            formData,
            {
               headers: {
                  'Content-Type': 'multipart/form-data'
               }
            })
            
         success(result.data);
      } catch (error) {
         console.log("catch", error);
         failure('HTTP Error: ');
      }
   }

   const editorConfig = {
      height: 500,
      menubar: false,
      image_caption: true,
      image_advtab: true,
      image_uploadtab: true,
      language: "fa",
      images_upload_handler: handleImageUpload,
      plugins: [
         'advlist autolink lists link image media charmap print preview anchor',
         'searchreplace visualblocks fullscreen',
         'media table paste code help wordcount'
      ],
      toolbar:
         'undo redo | formatselect | paste | link anchor | | image media | table | bold italic backcolor | ' +
         'alignleft aligncenter alignright alignjustify | ' +
         'bullist numlist outdent indent | removeformat | preview code source help'
   }

   
   return (

      <Editor
         initialValue={props.initialValue}
         apiKey="29khjiulh6i8v4wry7o14234fo6q7c2u3o27bv65hs8z6mei"
         init={editorConfig}
         onEditorChange={handleContentChange}
      />
   )
}