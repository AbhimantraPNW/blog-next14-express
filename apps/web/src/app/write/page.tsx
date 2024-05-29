'use client';

import Dropzone from '@/components/Dropzone';
import FormInput from '@/components/FormInput';
import FormTextArea from '@/components/FormTextArea';
import PreviewImages from '@/components/PreviewImages';
import RichTextEditor from '@/components/RichTextEditor';
import { Button } from '@/components/ui/button';
import AuthGuard from '@/hoc/AuthGuard';
import useCreateBlog from '@/hooks/api/blog/useCreateBlog';
import { useAppSelector } from '@/redux/hooks';
import { IFormBlog } from '@/types/blog.type';

import { useFormik } from 'formik';
import React from 'react';

const Write = () => {
  const { createBlog } = useCreateBlog();
  const { id } = useAppSelector((state) => state.user);

  const {
    handleSubmit,
    handleBlur,
    handleChange,
    setFieldValue,
    values,
    errors,
    touched,
  } = useFormik<IFormBlog>({
    initialValues: {
      title: '',
      category: '',
      thumbnail: [],
      description: '',
      content: '',
    },
    onSubmit: (values) => {
      createBlog({ ...values, userId: id });
    },
  });

  return (
    <div className="container mx-auto px-4 mt-4">
      <form onSubmit={handleSubmit}>
        <div className="mx-auto flex max-w-5xl flex-col gap-4">
          <FormInput
            name="title"
            error={errors.title}
            isError={!!touched.title && !!errors.title}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Title"
            type="title"
            value={values.title}
            label="Title"
          />
          <FormInput
            name="category"
            error={errors.category}
            isError={!!touched.category && !!errors.category}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Category"
            type="category"
            value={values.category}
            label="Category"
          />
          <FormTextArea
            name="description"
            error={errors.description}
            isError={!!touched.description && !!errors.description}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Description"
            value={values.description}
            label="Description"
          />
          <PreviewImages
            fileImages={values.thumbnail}
            onRemoveImage={(idx: number) =>
              setFieldValue('thumbnail', values.thumbnail.toSpliced(idx, 1))
            }
          />
          <Dropzone
            isError={Boolean(errors.thumbnail)}
            label="Thumbnail"
            onDrop={(files) =>
              setFieldValue('thumbnail', [
                ...values.thumbnail,
                ...files.map((file) => file),
              ])
            }
          />
          <RichTextEditor
            onChange={(html: string) => setFieldValue('content', html)}
            label="Content"
            value={values.content}
            isError={Boolean(errors.content)}
          />

          <div className="mb-4 flex justify-end">
            <Button type="submit">Submit</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AuthGuard(Write);
