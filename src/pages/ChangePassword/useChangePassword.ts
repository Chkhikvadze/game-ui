import { useFormik } from "formik"
import { useChangePasswordService } from "services"
import * as Yup from "yup"
import useSnackbarAlert from "hooks/useSnackbar";

const validationSchema = Yup.object().shape({
  currentPassword:Yup.string().required("Please enter your current password."),
  password:Yup.string()
	.required("Please enter your new password.")
	.matches(
	  /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
	  "Password must contain at least 8 characters, one uppercase, one number and one special case character.",
	),
  confirmPassword:Yup.string()
	.required("Please confirm your new password")
	.oneOf([Yup.ref("password"), null], "Passwords don't match."),
})

const initialValues = {
  currentPassword:"",
  password:"",
  confirmPassword:"",
}


const useChangePassword = () => {
  const [changePasswordMutation] = useChangePasswordService()
  const {setSnackbar} = useSnackbarAlert()
  
  const updatePassword = async (values: any) => {
	try {
	  await changePasswordMutation({
		new_password:values.password,
		current_password:values.currentPassword
	  })
	  setSnackbar({
		message:"Password successfully updated",
		variant:'success',
	  })
	} catch (err) {
	  await setSnackbar({variant:"warning", message:`Something went wrong while resetting password `})
	  
	}
  }
  
  const formik = useFormik({
	initialValues,
	validationSchema,
	onSubmit:async (values: any) => updatePassword(values),
  })
  
  
  return {
	formik,
  }
}


export default useChangePassword