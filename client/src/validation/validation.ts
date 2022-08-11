export const AddressOptions = {
  firstName: { required: 'Bạn chưa nhập họ',
 },
  lastName: { required: 'Bạn chưa nhập tên',

 },
  phone: {
      required: 'Bạn chưa nhập số điện thoại',
      minLength: {
        value: 10,
        message: 'Số điện thoại ít nhất phải 10 số'
      },
      maxLength:{
        value: 11,
        message: 'Số điện thoại tối đa 10 số'
      }
      ,
      pattern: {
        value:  /[0]{1}[0-9]{9}/,
        message: 'Chưa đúng định dạng số điện thoại'
      }
    },
    address: {
      required: 'Bạn chưa nhập địa chỉ giao hàng',
      minLength:{
        value: 10,
        message: 'Địa chỉ giao hàng phải ít nhất 10 chữ cái'

      }
    }  

  };
export const LoginOptions ={
  email: { required: 'Bạn chưa nhập email',
  pattern: {
    value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
    message: 'Không đúng định dạng email'
  }
 },
 password: {
  required: 'Bạn chưa nhập mật khẩu',
  minLength: {
    value: 8,
    message: 'Độ dài tổi thiếu mật khẩu là 8'
  }
 }

}

export const RegisterOptions = {
 
    email: { required: 'Bạn chưa nhập email',
    pattern: {
      value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
      message: 'Không đúng định dạng email'
    }
   },
   password: {
    required: 'Bạn chưa nhập mật khẩu',
    minLength: {
      value: 8,
      message: 'Độ dài tổi thiếu mật khẩu là 8'
    }
   },
  }  


