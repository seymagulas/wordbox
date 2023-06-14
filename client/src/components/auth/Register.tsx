import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { registerUser } from '../../services/auth.service';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import loginLogo from '../../assets/loginLogo.png';
import "./auth.css";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const schema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().required()
      .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, 'Password should contains a lowercase, a uppercase character and a digit.'),
    confirmPassword: Yup.string().required()
      .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, 'Password should contains a lowercase, a uppercase character and a digit.')
  });

  const { 
    register, 
    handleSubmit, 
    formState: { errors, isDirty, isValid } 
  } = useForm<FormData>({
    mode: 'all',
    resolver: yupResolver(schema)
  });

  const handleValidSubmit = async (data: FormData) => {
    setIsSubmitted(true);
    try {
      const result = await registerUser({ 
        name: data.name, 
        email: data.email, 
        password: data.password, 
        confirmPassword: data.confirmPassword
      });

      if (result?.data) {
        navigate('/');
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
    setIsSubmitted(false);
  }

  return (
      <section className="authContainer">
        <form className="formContainer" onSubmit={handleSubmit(handleValidSubmit)}>
          <span className="authLogo">
            <img src={loginLogo} alt="loginLogo" width="80" height="80" className="d-inline-block align-text-top"/>
            <label>WordBox</label>
          </span>
          <div className="mb-3">
            <label htmlFor="inputName" className="form-label">Name</label>
            <input type="name" className="form-control" id="inputName" {...register('name')} autoComplete="off" />
            <div className="form-text text-danger">
              {errors.name && <p>{errors.name.message}</p>}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="inputEmail" className="form-label">Email address</label>
            <input type="email" className="form-control" id="inputEmail" {...register('email')} autoComplete="off" />
            <div className="form-text text-danger">
              {errors.email && <p>{errors.email.message}</p>}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="inputPassword" className="form-label">Password</label>
            <input type="password" className="form-control" id="inputPassword" {...register('password')} />
            <div className="form-text text-danger">
              {errors.password && <p>{errors.password.message}</p>}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="inputConfirmPassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="inputConfirmPassword" {...register('confirmPassword')} />
            <div className="form-text text-danger">
              {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-auth" disabled={isSubmitted || !isDirty || !isValid}>Register</button>
          <p>
            Already Member?
            <Link to={'/login'} className="link-auth">Login</Link>
          </p>
        </form>
      </section>
  );
}

export default Register;