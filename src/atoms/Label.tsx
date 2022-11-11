import * as LabelPrimitive from '@radix-ui/react-label';
import { LabelProps } from "@radix-ui/react-label";


const Label = ({children, color}: LabelProps) => {
  return (
	<LabelPrimitive.Root style={{color: color}}>
	  {children}
	</LabelPrimitive.Root>
  )
}


export default Label