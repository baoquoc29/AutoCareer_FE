import * as Yup from "yup";

const InstructionalValidation = (includeDateOfBirth = true) => {
    const schema = {
        name: Yup.string()
            .matches(/^\S.*$/, "Tên giáo vụ không được bắt đầu bằng dấu cách") // Không được bắt đầu bằng dấu cách
            .min(3, "Tên giáo vụ tối thiểu 3 kí tự") // Tối thiểu 3 kí tự
            .max(100, 'Tên giáo vụ tối đa 100 kí tự') // Tối đa 100 kí tự
            .required("Tên giáo vụ là bắt buộc"), // Không trống
        email:Yup.string()
            .email('Email không hợp lệ')  // Kiểm tra định dạng email hợp lệ
            .matches(/^\S.*$/, "Không được bắt đầu bằng dấu cách")
            .matches(
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                'Email phải chứa ký tự hợp lệ như @, . và tên miền hợp lệ'
            )  // Kiểm tra email có định dạng chuẩn hơn
            .required('Email là bắt buộc'),  // Kiểm tra email không trống
        instructionalCode: Yup.string()
            .matches(/^\S.*$/, "Mã giáo vụ không được bắt đầu bằng dấu cách") // Không được bắt đầu bằng dấu cách
            .min(5, "Mã giáo vụ phải có ít nhất 5 kí tự") // Tối thiểu 5 kí tự
            .max(20, 'Mã giáo vụ tối đa 20 kí tự') // Tối đa 20 kí tự
            .matches(/^[A-Za-z0-9]+$/, "Mã giáo vụ chỉ được chứa chữ cái và số") // Chỉ cho phép chữ và số
            .required("Mã giáo vụ là bắt buộc"), // Không trống
        phone: Yup.string()
            .matches(/^(0[3|5|7|8|9])+([0-9]{8})$/, "Số điện thoại không hợp lệ") // Số điện thoại phải theo định dạng của Việt Nam
            .length(10, "Số điện thoại phải có 10 ký tự") // Phải có 10 ký tự
            .required("Số điện thoại là bắt buộc"), // Không trống
        gender: Yup.string()
            .oneOf(['Male', 'Female', 'Other'], "Giới tính phải là nam, nữ hoặc khác") // Giới tính chỉ chấp nhận 3 giá trị
            .required("Giới tính là bắt buộc"), // Không trống
        address: Yup.string()
            .min(5, "Địa chỉ phải có ít nhất 5 kí tự") // Tối thiểu 5 ký tự
            .max(255, 'Địa chỉ tối đa 255 kí tự') // Tối đa 255 ký tự
            .matches(/^\S.*$/, "Tên giáo vụ không được bắt đầu bằng dấu cách") // Không được bắt đầu bằng dấu cách
            .required("Địa chỉ là bắt buộc"), // Không trống
        instructionalImageId: Yup.mixed()
            .test("fileSize", "Kích thước ảnh không được vượt quá 5MB", (value) => !value || (value && value.size <= 5 * 1024 * 1024)) // Tối đa 5MB
            .test("fileType", "Chỉ chấp nhận file hình ảnh (JPG, PNG, JPEG)", (value) => !value || (value && ["image/jpeg", "image/png", "image/jpg"].includes(value.type))) // Chỉ chấp nhận ảnh
            .nullable() // Không bắt buộc phải có ảnh, nhưng nếu có thì phải đúng định dạng và kích thước
    };

    if (includeDateOfBirth) {
        schema.dateOfBirth = Yup.date()
            .max(new Date(), "Ngày sinh không thể trong tương lai") // Ngày sinh không thể lớn hơn ngày hiện tại
            .required("Ngày sinh là bắt buộc"); // Không trống
    }

    return Yup.object(schema);
};

export default InstructionalValidation;
