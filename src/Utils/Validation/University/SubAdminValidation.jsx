import * as Yup from "yup";

const SubAdminValidation = (fields = []) => {
    const schema = {};

    if (fields.includes("subAdminCode")) {
        schema.subAdminCode = Yup.string()
            .required("Mã quản trị viên không được để trống.")
            .matches(/^[A-Za-z0-9]+$/, "Mã quản trị viên chỉ được chứa chữ và số.")
            .max(10, "Mã quản trị viên tối đa 10 ký tự.");
    }

    if (fields.includes("name")) {
        schema.name = Yup.string()
            .required("Họ tên không được để trống.")
            .min(2, "Họ tên phải có ít nhất 2 ký tự.")
            .max(50, "Họ tên không được vượt quá 50 ký tự.")
            .matches(/^[A-Za-zÀ-ỹ\s]+$/, "Họ tên chỉ được chứa chữ cái và khoảng trắng.");
    }

    if (fields.includes("gender")) {
        schema.gender = Yup.string()
            .required("Giới tính không được để trống.")
            .oneOf(["male", "female", "other"], "Giới tính không hợp lệ.");
    }

    if (fields.includes("email")) {
        schema.email = Yup.string()
            .email("Email không hợp lệ.")
            .required("Email không được để trống.")
            .max(100, "Email không được vượt quá 100 ký tự.");
    }

    if (fields.includes("phone")) {
        schema.phone = Yup.string()
            .required("Số điện thoại không được để trống.")
            .matches(/^[0-9]{10}$/, "Số điện thoại phải có đúng 10 chữ số.");
    }

    if (fields.includes("address")) {
        schema.address = Yup.string()
            .required("Địa chỉ không được để trống.")
            .min(5, "Địa chỉ phải có ít nhất 5 ký tự.")
            .max(200, "Địa chỉ không được vượt quá 200 ký tự.");
    }

    if (fields.includes("subAdminImage")) {
        schema.subAdminImage = Yup.mixed()
            // .required("Ảnh không được để trống.")
            .test(
                "fileType",
                "Chỉ được tải lên file ảnh (jpg, jpeg, png).",
                (value) =>
                    value &&
                    ["image/jpg", "image/jpeg", "image/png"].includes(value.type)
            )
            .test(
                "fileSize",
                "Kích thước ảnh không được vượt quá 10MB.",
                (value) => value && value.size <= 10 * 1024 * 1024
            );
    }

    return Yup.object(schema);
};

export default SubAdminValidation;
