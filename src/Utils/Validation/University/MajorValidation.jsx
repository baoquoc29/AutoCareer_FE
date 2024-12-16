import * as Yup from "yup";

const MajorValidation = (isSectionIdRequired = true) => Yup.object({
    sectionId: isSectionIdRequired ? Yup.string().required('Chọn khoa là bắt buộc') : Yup.string(),
    name: Yup.string()
        .matches(/^\S.*$/, "Không được bắt đầu bằng dấu cách")
        .min(3, "Tối thiểu 3 kí tự ")
        .max(100, 'Tối đa 100 kí tự')
        .required("Tên chuyên ngành là bắt buộc"),

    code: Yup.string()
        .matches(/^[a-zA-Z0-9\s]+$/, 'Mã chuyên ngành không được chứa ký tự đặc biệt và không dấu')
        .matches(/^\S.*$/, "Không được bắt đầu bằng dấu cách")
        .min(3, "Tối thiểu 3 kí tự ")
        .max(10, 'Tối đa 10 kí tự')
        .required('Mã chuyên ngành là bắt buộc'),
    numberStudent: Yup.number()
        .typeError('Số lượng sinh viên phải là số')
        .required('Số lượng sinh viên là bắt buộc')
        .positive('Số lượng sinh viên phải lớn hơn 0')
        .integer('Số lượng sinh viên phải là số nguyên')
        .min(10, 'Số lượng sinh viên phải lớn hơn 10')

        .max(1000, 'Số lượng sinh viên phải nhỏ hơn 1000'),
    description: Yup.string()
        .max(255, 'Mô tả không quá 255 kí tự')
});
export default MajorValidation;