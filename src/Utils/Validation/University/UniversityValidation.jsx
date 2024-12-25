import * as Yup from "yup";

const UniversityValidation = () => Yup.object({
    name: Yup.string()
        .required('Tên trường là bắt buộc')
        .min(3, 'Tên trường phải có ít nhất 3 ký tự'),
    website: Yup.string()
        .url('Website không hợp lệ')
        .required('Website là bắt buộc'),
    phone: Yup.string()
        .required('Điện thoại là bắt buộc')
        .matches(/^[0-9]{10}$/, 'Số điện thoại không hợp lệ'),
    foundedYear: Yup.number()
        .required('Năm thành lập là bắt buộc')
        .min(1900, 'Năm thành lập phải lớn hơn hoặc bằng 1900')
        .max(new Date().getFullYear(), `Năm thành lập không được lớn hơn ${new Date().getFullYear()}`),
    description: Yup.string()
        .max(255, 'Mô tả tối thiểu 255 kí tự '),
    provinceId: Yup.number()
        .required('Tỉnh/Thành phố là bắt buộc')
        .nullable(),
    districtId: Yup.number()
        .required('Quận/Huyện là bắt buộc')
        .nullable(),
    wardId: Yup.number()
        .required('Xã/Phường là bắt buộc')
        .nullable(),
    logoImageId: Yup.mixed().nullable()
})
export default UniversityValidation;