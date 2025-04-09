"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import axios from "axios";
import { useAppContext } from "@/context/GlobalContext";
import { IoIosArrowBack } from "react-icons/io";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";

const MainCategoryList = dynamic(
  () => import("@/components/dashboardComponents/MainCategoryList"),
  { ssr: false }
);
const SubCategoryList = dynamic(
  () => import("@/components/dashboardComponents/SubCategoryList"),
  { ssr: false }
);
const AddSubCategoryForm = dynamic(
  () => import("@/components/dashboardComponents/AddSubCategoryForm"),
  { ssr: false }
);

const DeleteCategoryAlert = dynamic(
  () => import("@/components/dashboardComponents/DeleteCategoryAlert"),
  { ssr: false }
);

const UpdateCategory = dynamic(
  () => import("@/components/dashboardComponents/UpdateCategory"),
  { ssr: false }
);
const CarsandVehiclesAdmin = dynamic(
  () => import("@/components/feildsForDynamicForms/CarsandVehiclesAdmin"),
  { ssr: false }
);

const PhonesTabletsAdmin = dynamic(
  () => import("@/components/feildsForDynamicForms/PhonesTabletsAdmin"),
  { ssr: false }
);

const ComputersAccessoriesAdmin = dynamic(
  () => import("@/components/feildsForDynamicForms/ComputersAccessoriesAdmin"),
  { ssr: false }
);

const ElectronicsAppliancesAdmin = dynamic(
  () => import("@/components/feildsForDynamicForms/ElectronicsAppliancesAdmin"),
  { ssr: false }
);

const BooksSportsHobbiesAdmin = dynamic(
  () => import("@/components/feildsForDynamicForms/BooksSportsHobbiesAdmin"),
  { ssr: false }
);

const FurnitureDecorAdmin = dynamic(
  () => import("@/components/feildsForDynamicForms/FurnitureDecorAdmin"),
  { ssr: false }
);

const FashionBeautyAdmin = dynamic(
  () => import("@/components/feildsForDynamicForms/FashionBeautyAdmin"),
  { ssr: false }
);

const HouseLandsAdmin = dynamic(
  () => import("@/components/feildsForDynamicForms/HouseLandsAdmin"),
  { ssr: false }
);

const JobsAdmin = dynamic(
  () => import("@/components/feildsForDynamicForms/JobsAdmin"),
  { ssr: false }
);

const Page = () => {
  const locale = useLocale();
  const t = useTranslations("categoryPage");
  const router = useRouter();
  const { token, domain, categories, setCategories, account } = useAppContext();
  const TYPE = process.env.NEXT_PUBLIC_TYPE;

  const [subCategories, setSubCategories] = useState([]);
  const [fields, setFields] = useState([]);
  const [mainCategory, setMainCategory] = useState();
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const [isShowMainCategory, setIsShowMainCategory] = useState(true);
  const [isShowSubCategory, setIsShowSubCategory] = useState(false);
  const [isShowFields, setIsShowFields] = useState(false);
  const [isOpenAddCategory, setIsOpenAddCategory] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenUpdateCategory, setIsOpenUpdateCategory] = useState(false);

  // Handle selecting subcategories for a specific category
  const handleGetSubCategories = (index) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const selectedCategory = categories[index];
    setMainCategory(selectedCategory?.name);
    if (selectedCategory?.subcategories?.length > 0) {
      setSubCategories(selectedCategory.subcategories);
    } else {
      setSubCategories([]);
    }
    setSelectedCategoryId(selectedCategory._id);
    setIsShowMainCategory(false);
    setIsShowSubCategory(true);
  };

  const handleGetFields = (index) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const selected = subCategories[index];
    setSelectedSubCategoryId(selected._id);
    if (selected?.fields?.length > 0) {
      setFields(selected.fields);
    } else {
      setFields([]);
    }
    setIsShowFields(true);
    setIsShowMainCategory(false);
    setIsShowSubCategory(false);
  };

  // Navigate back to the main categories list
  const handleBackToMainCategories = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsShowSubCategory(false);
    setIsShowMainCategory(true);
    setSelectedCategoryId(null);
  };

  const handleBackToSubCategories = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsShowFields(false);
    setIsShowSubCategory(true);
  };

  // Toggle the Add Subcategory form
  const handleOpenAddCategory = () => {
    setIsOpenAddCategory(!isOpenAddCategory);
  };

  const handleOpenDelete = (mainId, subId) => {
    setSelectedCategoryId(mainId);
    setSelectedSubCategoryId(subId);
    setIsOpenDelete(true);
  };

  const handleOpenUpdateCategory = (mainId, subId) => {
    setSelectedCategoryId(mainId);
    setSelectedSubCategoryId(subId);
    setIsOpenUpdateCategory(true);
  };

  const handleCloseUpdateCategory = () => {
    if (!selectedSubCategoryId) {
      setSelectedCategoryId(null);
    }
    setSelectedSubCategoryId(null);
    setIsOpenUpdateCategory(false);
  };

  const handleCloseDelete = () => {
    if (!selectedSubCategoryId) {
      setSelectedCategoryId(null);
    }
    setSelectedSubCategoryId(null);
    setIsOpenDelete(false);
  };

  const handleDelete = async () => {
    try {
      setIsPending(true);
      const res = await axios.delete(
        `${domain}/${
          selectedSubCategoryId ? "sub-category" : "main-category"
        }/${selectedCategoryId}`,
        {
          data: selectedSubCategoryId
            ? { subCategoryId: selectedSubCategoryId }
            : {},
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        if (selectedSubCategoryId) {
          setCategories((prevCategories) =>
            prevCategories.map((category) =>
              category._id === selectedCategoryId ? res.data.category : category
            )
          );
          setSubCategories(res.data.category.subcategories);
        } else {
          setCategories((prevCategories) =>
            prevCategories.filter(
              (category) => category._id !== selectedCategoryId
            )
          );
        }

        setIsPending(false);
        setIsOpenDelete(false);
        setTimeout(() => {
          alert("Deleted successfully");
        }, 100);
      }
    } catch (error) {
      console.error("Error deleting category/subcategory:", error);
      setIsPending(false);
    }
  };

  const handleEditFieldForm = async () => {
    if (fields.length <= 0) return;
    try {
      setIsPending(true);
      const res = await axios.put(
        `${domain}/form-category/${selectedCategoryId}`,
        {
          subCategoryId: selectedSubCategoryId,
          newFields: fields.sort((a, b) => {
            const numA = parseInt(a),
              numB = parseInt(b);
            return numA - numB || a.localeCompare(b);
          }),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          timeout: 30000,
        }
      );
      if (res.status === 200) {
        setIsPending(false);
        setCategories((prevCategories) =>
          prevCategories.map((category) =>
            category._id === selectedCategoryId ? res.data.category : category
          )
        );
        setSubCategories(res.data.category.subcategories);

        setTimeout(() => {
          alert(res.data.message);
        }, 100);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (account === undefined) return;
    if (!account || account?.type !== TYPE) {
      router.push("/signin");
    }
  }, [account, router, TYPE]);

  if (account === null || account?.type !== TYPE) return <div></div>;
  return (
    <div className="md:px-4 lg:px-0 min-h-screen">
      <UpdateCategory
        mainId={selectedCategoryId}
        subId={selectedSubCategoryId}
        isOpenUpdateCategory={isOpenUpdateCategory}
        handleCloseUpdateCategory={handleCloseUpdateCategory}
        token={token}
        domain={domain}
        setCategories={setCategories}
        setSubCategories={setSubCategories}
        isPending={isPending}
        setIsPending={setIsPending}
      />

      <DeleteCategoryAlert
        isOpen={isOpenDelete}
        handleClose={handleCloseDelete}
        handleDelete={handleDelete}
        isPending={isPending}
      />

      {/* Add Subcategory Form */}
      <AddSubCategoryForm
        handleOpenAddCategory={handleOpenAddCategory}
        isOpenAddCategory={isOpenAddCategory}
        categoryId={selectedCategoryId}
        token={token}
        domain={domain}
        setCategories={setCategories}
        setSubCategories={setSubCategories}
        setIsPending={setIsPending}
        isPending={isPending}
      />

      {/* List Main Categories */}
      {isShowMainCategory && (
        <MainCategoryList
          categories={categories}
          handleGetSubCategories={handleGetSubCategories}
          handleOpenDelete={handleOpenDelete}
          handleOpenUpdateCategory={handleOpenUpdateCategory}
          locale={locale}
          t={t}
        />
      )}

      {/* List Subcategories */}
      {isShowSubCategory && (
        <SubCategoryList
          subCategories={subCategories}
          handleBackToMainCategories={handleBackToMainCategories}
          handleOpenAddCategory={handleOpenAddCategory}
          handleOpenDelete={handleOpenDelete}
          selectedCategoryId={selectedCategoryId}
          handleOpenUpdateCategory={handleOpenUpdateCategory}
          handleGetFields={handleGetFields}
          locale={locale}
          t={t}
        />
      )}

      {isShowFields && (
        <div className="max-w-[820px] space-y-10">
          <div className="px-4 md:px-1.5">
            <button
              onClick={handleBackToSubCategories}
              className="flex items-center space-x-1 bg-white rounded px-3 py-1 border"
            >
              <IoIosArrowBack />
              <span>{t("backBtn")}</span>
            </button>
          </div>

          <div>
            {mainCategory === "Cars and Vehicles" ? (
              <CarsandVehiclesAdmin
                fields={fields}
                setFields={setFields}
                locale={locale}
                AllFields={[
                  "1carBrand",
                  "2motoBrand",
                  "3vehicleType",
                  "4type",
                  "5year",
                  "6taxType",
                  "7condition",
                  "8color",
                  "9fuel",
                  "10transmission",
                  "11bodyType",
                  "12salePrice",
                  "13price",
                  "14discount",
                  "15freeDelivery",
                ]}
              />
            ) : mainCategory === "Phones & Tablets" ? (
              <PhonesTabletsAdmin
                fields={fields}
                setFields={setFields}
                locale={locale}
                AllFields={[
                  "1tabletBrand",
                  "2phoneBrand",
                  "3smartWatch",
                  "4network",
                  "5accessory",
                  "6storage",
                  "7condition",
                  "8discount",
                  "9price",
                  "10freeDelivery",
                ]}
              />
            ) : mainCategory === "Computers & Accessories" ? (
              <ComputersAccessoriesAdmin
                fields={fields}
                setFields={setFields}
                locale={locale}
                AllFields={[
                  "1laptopBrand",
                  "2desktopBrand",
                  "3allInOneBrand",
                  "4monitorBrand",
                  "5printerScannerBrand",
                  "6type",
                  "7condition",
                  "8storage",
                  "9ram",
                  "10cpu",
                  "11vga",
                  "12screenSize",
                  "13screenSize",
                  "14discount",
                  "15price",
                  "16freeDelivery",
                ]}
              />
            ) : mainCategory === "Electronics & Appliances" ? (
              <ElectronicsAppliancesAdmin
                fields={fields}
                setFields={setFields}
                locale={locale}
                AllFields={[
                  "1condition",
                  "2price",
                  "3discount",
                  "4freeDelivery",
                ]}
              />
            ) : mainCategory === "Jobs" ? (
              <JobsAdmin
                fields={fields}
                setFields={setFields}
                locale={locale}
                AllFields={["1type", "2experience", "3minimumSalary"]}
              />
            ) : mainCategory === "Books, Sports & Hobbies" ? (
              <BooksSportsHobbiesAdmin
                fields={fields}
                setFields={setFields}
                locale={locale}
                AllFields={[
                  "1condition",
                  "2price",
                  "3discount",
                  "4freeDelivery",
                ]}
              />
            ) : mainCategory === "Furniture & Decor" ? (
              <FurnitureDecorAdmin
                fields={fields}
                setFields={setFields}
                locale={locale}
                AllFields={[
                  "1type",
                  "2type",
                  "3price",
                  "4discount",
                  "5freeDelivery",
                ]}
              />
            ) : mainCategory === "Fashion & Beauty" ? (
              <FashionBeautyAdmin
                fields={fields}
                setFields={setFields}
                locale={locale}
              />
            ) : mainCategory === "House & Lands" ? (
              <HouseLandsAdmin
                fields={fields}
                setFields={setFields}
                locale={locale}
                AllFields={[
                  "1bathroom",
                  "2bedroom",
                  "3facing",
                  "4size",
                  "5homeType",
                  "6commercialType",
                  "7salePrice",
                  "8price",
                ]}
              />
            ) : (
              ""
            )}
          </div>

          <div className="px-[20px] text-white select-none text-center">
            <button
              onClick={handleEditFieldForm}
              className="w-full  py-2 rounded-md bg-[#0098D5] focus:outline-none hover:translate-y-0.5 transition-all duration-200 flex items-center justify-center"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <span className="h-5 w-5 rounded-full border-2 border-blue-200 border-t-transparent animate-spin"></span>
                  <span className="ml-2">{t("submitingBtn")}...</span>
                </>
              ) : (
                <p>{t("submitBtn")}</p>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
