import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
    let errors = {};

    if (Validator.isEmpty(data.username)) {
        errors.username = '성명은 필수항목 입니다.'
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = '유효하지 않은 이메일 주소입니다.'
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = '비밀번호는 필수항목 입니다.'
    }

    if (Validator.isEmpty(data.passwordConfirmation)) {
        errors.passwordConfirmation = '비밀번호는 필수항목 입니다.'
    }
    if (!Validator.equals(data.passwordConfirmation, data.password)) {
        errors.passwordConfirmation = "입력하신 비밀번호가 일치하지 않습니다."
    }

    if (Validator.isEmpty(data.gender)) {
        errors.gender = '성별을 입력해주세요.'
    }

    if (Validator.isEmpty(data.birth)) {
        errors.birth = '생년월은 필수항목 입니다.'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}