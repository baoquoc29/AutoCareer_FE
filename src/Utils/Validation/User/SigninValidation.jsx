
import * as Yup from "yup";

const SigninValidation = () => Yup.object({
    username: Yup.string()
        .required('Không được bỏ trống')
        .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, 'Email không hợp lệ'),
    password:Yup.string()
        .required('Không được bỏ trống')
});

export default SigninValidation;