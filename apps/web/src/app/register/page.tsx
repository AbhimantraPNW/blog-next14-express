'use client'

import FormInput from '@/components/FormInput';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useFormik } from 'formik';
import { validationSchema } from './validationSchema';
import useRegister from '@/hooks/api/auth/useRegister';

const Register: React.FC = () => {
  const {register} = useRegister()
  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      register(values)
    },
  });

  return (
    <main className="container mx-auto px-4">
      <div className="mt-16 flex justify-center">
        <Card className="w-[350px] ">
          <CardHeader className="space-y-4">
            <CardTitle className="text-center text-2xl ">
              Welcome to BlogHub
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={formik.handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <FormInput
                  name="fullName"
                  error={formik.errors.fullName}
                  isError={
                    !!formik.touched.fullName && !!formik.touched.fullName
                  }
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  placeholder="Type your username here"
                  type="text"
                  value={formik.values.fullName}
                  label="Full Name"
                />

                <FormInput
                  name="email"
                  error={formik.errors.email}
                  isError={!!formik.touched.email && !!formik.errors.email}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  placeholder="example@mail.com"
                  type="email"
                  value={formik.values.email}
                  label="Email"
                />

                <FormInput
                  name="password"
                  error={formik.errors.password}
                  isError={
                    !!formik.touched.password && !!formik.errors.password
                  }
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  placeholder="password"
                  type="password"
                  value={formik.values.password}
                  label="Password"
                />

                <Button type="submit" className=" mt-6 w-full text-white">
                  Register
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end">
            {/* <Button className=" text-white">Register</Button> */}
          </CardFooter>
        </Card>
      </div>
    </main>
  );
};

export default Register;
