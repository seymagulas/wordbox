import React from "react";
import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { login } from '../../services/auth.service';
import { getUser } from "../../services/user.service";
import loginLogo from '../../assets/loginLogo.png';
import "./auth.css";

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () =>  {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const schema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required()
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
      const result = await login({ email: data.email, password: data.password });
      if (result?.accessToken) {
        await getUser();
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
          <label htmlFor="inputEmail" className="form-label">Email address</label>
          <input type="email" className="form-control" id="inputEmail" {...register('email')} />
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
        <div className="d-grid gap-2">
          <button type="submit" disabled={isSubmitted || !isDirty || !isValid} className="btn btn-primary btn-auth">Login</button>
        </div>
        <p>
          New Member?
          <Link to={'/register'} className="link-auth">Sign up</Link>
        </p>
      </form>
    </section>
  );
}  

export default Login;