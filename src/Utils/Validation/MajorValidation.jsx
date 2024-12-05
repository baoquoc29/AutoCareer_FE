export const validateField = (field) => {
    const validationRules = {
        section: [
            {required: true, message: "Không được bỏ trống"},
        ],
        name: [
            {required: true, message: "Không được bỏ trống"},
            {min: 5, message: "Tên ngành phải có ít nhất 10 ký tự"},
            {max: 100, message: "Tên ngành tối đa 100 ký tự"},
        ],
        code: [
            {required: true, message: "Không được bỏ trống"},
            {min: 3, message: "Tối thiếu 10 ký tự"},
            {max: 100, message: "Tối đa 100 ký tự"},
        ],
        numberStudent: [
            {required: true, message: "Không được bỏ trống"},
            {min: 2, message: "Ít nhất 10 sinh viên"},
            {max: 10000, message: "Nhiều nhẩ 1.000 sinh viên"},

        ],
    };
    return validationRules[field] || [];
};
