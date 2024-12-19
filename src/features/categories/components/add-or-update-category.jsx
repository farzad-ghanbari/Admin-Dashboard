import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { httpInterceptedService } from "@core/http-servis";
import { useNavigate } from "react-router-dom";
import { useCategoryContext } from "../category-context";
import { useEffect } from "react";

const AddOrUpdateCategory = ({ setShowAddCategory }) => {
    const { register, handleSubmit, setValue } = useForm();
    const navigate = useNavigate();
    const { category, setCategory } = useCategoryContext();

    useEffect(() => {
        if (category) {
            setValue('name', category.name);
            setValue('id', category.id);
        }
    }, [category])

    const onClose = () => {
        setShowAddCategory(false);
        setCategory(null);
    }

    const onSubmit = (data) => {
        setShowAddCategory(false);

        const response = httpInterceptedService.post(`/CourseCategory/`, data);
        toast.promise(
            response,
            {
                pending: 'در حال ذخیره  اطلاعت',
                success: {
                    render() {
                        const url = new URL(window.location.href);
                        navigate(url.pathname + url.search);
                        if (category) {
                            setCategory(null);
                        }
                        return 'عملیات با موفقیت انجام شد'
                    },
                },
                error: {
                    render() {
                        return 'امکان ذخیره کردن اطلاعات وجود ندارد'
                    },
                },
            },

        );
    }
    return (
        <div className="card">
            <div className="card-body">
                <form className="mb-4" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="form-lable">نام</label>
                        <input className='form-control form-control-lg'

                            {...register('name', { required: true })} />

                    </div>
                    <div className="text-start mt-3">
                        <button type="button"
                            className="btn btn-lg btn-secondary ms-2"
                            onClick={onClose}>
                            بستن
                        </button>
                        <button type="submit"
                            className="btn btn-lg btn-primary ms-2"
                        >
                            ثبت تغییرات
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}


export default AddOrUpdateCategory;