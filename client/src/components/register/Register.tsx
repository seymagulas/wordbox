import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { registerUser } from '../../services/auth.service';
import { useState } from 'react';
import "./style.css";
import { Link } from 'react-router-dom';

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

      if (result.data) {
        navigate('/');
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
    setIsSubmitted(false);
  }

  return (
    <div className="row">
      <div className="col-6 offset-3">
        <form onSubmit={handleSubmit(handleValidSubmit)}>
          <div className="mb-3">
            <label htmlFor="inputName" className="form-label">Name</label>
            <input type="name" className="form-control" id="inputName" {...register('name')} />
            <div className="form-text text-danger">
              {errors.name && <p>{errors.name.message}</p>}
            </div>
          </div>
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
          <div className="mb-3">
            <label htmlFor="inputConfirmPassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="inputConfirmPassword" {...register('confirmPassword')} />
            <div className="form-text text-danger">
              {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
            </div>
          </div>
          <button type="submit" className="btn btn-primary" disabled={isSubmitted || !isDirty || !isValid}>Submit</button>
        </form>
        <p>
        Already member?<br />
        <span className="line">
          <Link to={'/login'} className="nav-link active">Sign in</Link>
        </span>
      </p>
      </div>
    </div>
  );
}

export default Register;