import logo from '@assets/images/logo.svg'
import { useForm } from 'react-hook-form';
import { Link, useActionData, useNavigate, useNavigation, useRouteError, useSubmit } from 'react-router-dom';
import { httpService } from '@core/http-servis';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
const Register = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { t } = useTranslation()

    const submitForm = useSubmit();

    const onSubmit = (data) => {
        const { confrimPassword, ...userData } = data;
        submitForm(userData, { method: 'post' });
    };

    const navigtion = useNavigation();
    const isSubmitting = navigtion.state !== 'idle';

    const isSuccessOperation = useActionData();

    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccessOperation)
            setTimeout(() => {
                navigate('/login')
            }, 2000);
    }, [isSuccessOperation])

    const routeErrors = useRouteError();

    return (
        <>
            <div className="text-center mt-4">
                <img src={logo} style={{ height: "100px" }} />
                <h1 className="h2"> {t("register.title")}</h1>
                <p className="lead">
                    {t("register.introMessage")}
                </p>
                <p className="lead">
                    {t("register.alreadyRegistered")}
                    <Link to="/login" className="me-2"> {t("register.signin")} </Link>
                </p>
            </div>

            <div className="card">
                <div className="card-body">
                    <div className="m-sm-4">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-3">
                                <label className="form-label">{t("register.mobile")}</label>
                                <input {...register('mobile', {
                                    required: true,
                                    maxLength: 11,
                                    minLength: 11
                                })} className={`form-control form-control-lg ${errors.mobile && 'is-invalid'}`} />
                                {
                                    errors.mobile && errors.mobile.type === 'required' && (
                                        <p className='text-danger small fw-bolder mt-1'>
                                            {t("register.validation.mobileRequired")}
                                        </p>
                                    )}
                                {errors.mobile &&
                                    (errors.mobile.type === 'maxLength' ||
                                        errors.mobile.type === 'minLength') && (
                                        <p className='text-danger small fw-bolder mt-1'>
                                            {t("register.validation.mobileLength")}
                                        </p>
                                    )
                                }
                            </div>

                            <div className="mb-3">
                                <label className="form-label"> {t("register.password")}</label>
                                <input {...register('password', {
                                    required: true 
                                })}
                                    className={`form-control form-control-lg ${errors.password && 'is-invalid'}`}
                                    type="password"
                                />
                                {errors.password && errors.password.type === 'required' && (
                                    <p className='text-danger small fw-bolder mt-1'>
                                          {t("register.validation.passwordRequired")}
                                    </p>
                                )}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">{t("register.repeatPassword")}</label>
                                <input {...register('confrimPassword', {
                                     required: true ,
                                    validate: (value) => {
                                        if (watch('password') !== value) {
                                            return  t("register.validation.notMatching");
                                        }
                                    }
                                })}
                                    className={`form-control form-control-lg ${errors.confrimPassword && 'is-invalid'}`}
                                    type="password"
                                />
                                {errors.confrimPassword && errors.confrimPassword.type === 'required' && (
                                    <p className='text-danger small fw-bolder mt-1'>
                                     {t("register.validation.repeatPasswordRequired")}
                                    </p>
                                )}
                                {
                                    errors.confrimPassword && errors.confrimPassword.type === 'validate' && (
                                        <p className='text-danger small fw-bolder mt-1'>
                                            {errors.confrimPassword?.message}
                                        </p>
                                    )
                                }
                            </div>
                            <div className="text-center mt-3">
                                <button type="submit" disabled={isSubmitting} className="btn btn-lg btn-primary">

                                    {isSubmitting ? t("register.saving") : t("register.register")}
                                </button>
                            </div>
                            {isSuccessOperation && (
                                <div className='alert alert-success text-success p-2 mt-3'>
                                    {t("register.successOperation")}
                                </div>
                            )}
                            {
                                routeErrors && (
                                    <div className='alert alert-danger text-danger p-2 mt-3'>
                                        {
                                            routeErrors.response?.data.map(error => <p className='mb-0'>{error.description}</p>)
                                        }
                                    </div>
                                )
                            }
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Register;

export async function registerAction({ request }) {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const response = await httpService.post('/Users', data)
    return response.status === 200;
}


