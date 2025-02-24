import * as Yup from "yup";

const CandidateValidation = () => Yup.object({
    fullName: Yup.string()
        .required('Tên là bắt buộc')
        .min(3, 'Tên phải có ít nhất 3 ký tự'),
    phone: Yup.string()
        .required('Điện thoại là bắt buộc')
        .matches(/^[0-9]{10}$/, 'Số điện thoại không hợp lệ'),
    provinceId: Yup.number()
        .required('Tỉnh/Thành phố là bắt buộc')
        .nullable(),
    districtId: Yup.number()
        .required('Quận/Huyện là bắt buộc')
        .nullable(),
    wardId: Yup.number()
        .required('Xã/Phường là bắt buộc')
        .nullable(),
    birthYear: Yup.number()
        .required('Năm sinh là bắt buộc')
        .min(1900, 'Năm sinh không hợp lệ')
        .max(new Date().getFullYear(), 'Năm sinh không thể lớn hơn năm hiện tại'),
    email: Yup.string()
        .required('Email là bắt buộc')
        .email('Email không hợp lệ')
});

export default CandidateValidation;
