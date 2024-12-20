import * as Yup from "yup";

const SectionValidation = () =>Yup.object({
    name: Yup.string()
        .required('Tên khoa là bắt buộc')
        .min(3, 'Tên khoa phải có ít nhất 3 ký tự')
        .max(100, 'Tên khoa tối đa 100 ký tự'),
    description:Yup.string()
        .max(255,'Mô tả không quá 255 kí tự')
}) ;
export default SectionValidation;