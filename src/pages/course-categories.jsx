import { Await, defer, useLoaderData, useNavigate, useNavigation } from "react-router-dom";
import { httpInterceptedService } from "@core/http-servis";
import { Suspense, useState } from "react";
import CategoryList from "../features/categories/components/category-list";
import MOdal from "../components/modal";
import { toast } from "react-toastify";
import AddOrUpdateCategory from "../features/categories/components/add-or-update-category";
import { useCategoryContext } from "../features/categories/category-context";



const CourseCategories = () => {
    const [showDeletModal, setShowDeletModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState();
    const [showAddCategory, setShowAddCategory] = useState(false);
    const { category } = useCategoryContext();

    const navigate = useNavigate();

    const deletCategory = categoryId => {
        setSelectedCategory(categoryId);
        setShowDeletModal(true);
    }

    const handleDeletCategory = async () => {
        setShowDeletModal(false);
        const response = httpInterceptedService.delete(`/CourseCategory/${selectedCategory}`);

        toast.promise(
            response,
            {
                pending: 'درحال حذف...',
                success: {
                    render() {
                        const url = new URL(window.location.href);
                        navigate(url.pathname + url.search);
                        return 'عملیات با موفقیت انجام شد'
                    },
                },
                error: {
                    render() {
                        return 'امکان حذف وجود ندارد'
                    },
                },
            },

        );
    };


    const data = useLoaderData();
    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="d-flex align-items-center justify-content-between mb-5">
                        <a className="btn btn-primary fw-bolder mt n1"
                            onClick={() => setShowAddCategory(true)}>

                            افزودن دسته جدید
                        </a>
                    </div>
                    {
                        (showAddCategory || category) && <AddOrUpdateCategory setShowAddCategory={setShowAddCategory} />
                    }

                    <Suspense fallback={<p className="text-info">در حال دریافت اطلاعات...</p>}>
                        <Await resolve={data.categories}>
                            {(loadedCategories) => <CategoryList deletCategory={deletCategory} categories={loadedCategories} />}
                        </Await>
                    </Suspense>
                </div>
            </div>
            <MOdal
                isOpen={showDeletModal}
                open={setShowDeletModal}
                title={"حذف"}
                body={"ایا از حذف این دسته اطمینان دارید"}>
                <button type="button" className="btn btn-secondary fw-bolder" onClick={() => setShowDeletModal(false)}>
                    انصراف
                </button>
                <button type="button" className="btn btn-primary fw-bolder" onClick={handleDeletCategory}>
                    حذف
                </button>
            </MOdal>
        </>
    )
}

export async function categorisLoader({ request }) {
    return defer({
        categories: loadCategories({ request })
    })
}
const loadCategories = async ({ request }) => {
    const page = new URL(request.url).searchParams.get("page") || 1;
    const pageSize = import.meta.env.VITE_PAGE_SIZE;
    let url = '/CourseCategory/sieve';
    url += `?page=${page}&pageSize=${pageSize}`;
    const response = await httpInterceptedService.get(url);
    return response.data;
};

export default CourseCategories;
