import logo from '@assets/images/logo.svg'
import { useForm } from 'react-hook-form';
import { Link, useSubmit, redirect, useNavigation, useRouteError } from 'react-router-dom';
import { httpService } from '@core/http-servis';
import { useTransition } from 'react';
const Login = () => {
    const { t } = useTransition();

    const { register, handleSubmit, watch, formState: { errors }, } = useForm();

    const submitForm = useSubmit();
    const onSubmit = data => {
        submitForm(data, { method: 'post' });
    }

    const navigation = useNavigation();
    const isSubmitting = navigation.state !== 'idle';

    const routeErrors = useRouteError();

    return (
        <>
            <div className="text-center mt-4">
                <img src={logo} style={{ height: "100px" }} />
                <h1 className="h2">پلتفرم آموزش آنلاین</h1>
                <p className="lead">
                    جهت ورود لازم است از طریق موبایل و رمز عبور خود اقدام کنید
                </p>
                <p className="lead">
                    قبلا ثبت نام نکرده اید؟
                    <Link to="/register" className="me-2">ثبت نام کنید </Link>
                </p>
            </div>

            <div className="card">
                <div className="card-body">
                    <div className="m-sm-4">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-3">
                                <label className="form-label">موبایل</label>
                                <input {...register('mobile', {
                                    required: 'موبایل الزامی است',
                                    maxLength: 11,
                                    minLength: 11
                                })} className={`form-control form-control-lg ${errors.mobile && 'is-invalid'}`} />
                                {
                                    errors.mobile && errors.mobile.type === 'required' && (
                                        <p className='text-danger small fw-bolder mt-1'>
                                            {errors.mobile?.message}
                                        </p>
                                    )}
                                {errors.mobile &&
                                    (errors.mobile.type === 'maxLength' ||
                                        errors.mobile.type === 'minLength') && (
                                        <p className='text-danger small fw-bolder mt-1'>
                                            موبایل باید 11 رقم باشد
                                        </p>
                                    )
                                }
                            </div>
                            <div className="mb-3">
                                <label className="form-label">رمز عبور</label>
                                <input {...register('password', {
                                    required: 'رمز عبور الزامی است'
                                })}
                                    className={`form-control form-control-lg ${errors.password && 'is-invalid'}`}
                                    type="password"
                                />
                                {errors.password && errors.password.type === 'required' && (
                                    <p className='text-danger small fw-bolder mt-1'>
                                        {errors.password?.message}
                                    </p>
                                )}
                            </div>
                            <div className="text-center mt-3">
                                <button disabled={isSubmitting} type="submit" className="btn btn-lg btn-primary">
                                    {
                                        isSubmitting ? 'در حال ورود' : 'وارد شوید'
                                    }
                                </button>
                                {
                                routeErrors && (
                                    <div className='alert alert-danger text-danger p-2 mt-3'>
                                        {
                                            routeErrors.response?.data.map(error => <p className='mb-0'>{error.description}</p>)
                                        }
                                    </div>
                                )
                            }
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
};

export async function loginAction({ request }) {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const response = await httpService.post("/Users/login", data);
    if (response.status === 200) {
      localStorage.setItem("token", response?.data.token);
      return redirect('/');
    }
  }
export default Login;
