import React from "react";
import { Field } from "formik";
import {
    FormLabel,
    FormControl,
    FormErrorMessage,
    Input as ChakraInput,
    InputGroup,
    InputRightElement,
    IconButton,
    Image,
} from "@chakra-ui/react";
// import { InputProps } from "@/interfaces/type";
import { useState } from "react";

const Input = ({
    type,
    name,
    placeholder,
    label,
    maxLength,
    icon,
    iconPosition,
    value,
    readOnly,
    style,
    ...rest
}) => {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    return (
        <Field name={name}>
            {({ field, form }) => {
                const { onChange: customOnChange, ...restProps } = rest || {};

                const handleCombinedChange = (e) => {
                    field.onChange(e);
                    if (customOnChange) {
                        customOnChange(e);
                    }
                };
                return (
                    <FormControl>
                        {/* <FormControl isInvalid={form.errors[name] && form.touched[name]}> */}
                        <FormLabel
                            color="#344054"
                            fontWeight={"600"}
                            fontSize={14}
                            mb={1}
                            fontFamily="body"
                        >
                            {label}
                        </FormLabel>
                        <InputGroup>
                            {icon && iconPosition === "left" && (
                                <InputRightElement position="absolute">
                                    <Image src={icon} alt="icon" />
                                </InputRightElement>
                            )}

                            <ChakraInput
                                {...field}
                                {...restProps}
                                placeholder={placeholder}
                                bg="#F8FAFC"
                                borderRadius={"12px"}
                                color="#4B5563"
                                fontSize={14}
                                fontWeight={400}
                                isInvalid={form.errors[name] && form.touched[name]}
                                errorBorderColor="brand.600"
                                focusBorderColor="brand.200"
                                type={type === "password" ? (show ? "text" : "password") : type}
                                backgroundColor="#F2F4F7"
                                maxLength={maxLength}
                                borderWidth={1}
                                _focus={{ borderWidth: 0 }}
                                readOnly={readOnly}
                                style={style}
                                onChange={handleCombinedChange}

                                px={4}
                                py={5}
                                borderColor={"#B4BCDD"}
                            />

                            {type === "password" && (
                                <InputRightElement position="absolute">
                                    <IconButton
                                        aria-label={show ? "Hide" : "Show"}
                                        variant="ghost"
                                        colorScheme="brand.200"
                                        size="sm"
                                        onClick={handleClick}
                                        icon={
                                            show ? (
                                                <Image src="/images/eye.svg" alt="hide" />
                                            ) : (
                                                <Image src="/images/eye.svg" alt="hide" />
                                            )
                                        }
                                    />
                                </InputRightElement>
                            )}

                            {icon && iconPosition === "right" && (
                                <InputRightElement position="absolute">
                                    <Image src={icon} alt="icon" />
                                </InputRightElement>
                            )}
                        </InputGroup>

                        <FormErrorMessage
                            color="brand.600"
                            fontWeight={400}
                            fontSize={12}
                            mt={1}
                        >
                            {form.errors[name]}
                        </FormErrorMessage>
                    </FormControl>
                );
            }}
        </Field>
    );
};

export default Input;







// import React, { useState } from "react";
// import { Field as FormikField } from "formik";
// import {
//     Field,
//     Input,
//     InputGroup,
//     // InputRightElement,
//     IconButton,
//     Image,
// } from "@chakra-ui/react";

// const CustomInput = ({
//     type,
//     name,
//     placeholder,
//     label,
//     maxLength,
//     icon,
//     iconPosition,
//     readOnly,
//     style,
//     ...rest
// }) => {
//     const [show, setShow] = useState(false);
//     const handleClick = () => setShow((prev) => !prev);

//     return (
//         <FormikField name={name}>
//             {({ field, form }) => {
//                 const { onChange: customOnChange, ...restProps } = rest || {};

//                 const handleCombinedChange = (e) => {
//                     field.onChange(e);
//                     if (customOnChange) customOnChange(e);
//                 };

//                 const isInvalid = form.touched[name] && form.errors[name];

//                 return (
//                     <Field.Root invalid={!!isInvalid}>
//                         {label && (
//                             <Field.Label
//                                 color="#344054"
//                                 fontWeight="600"
//                                 fontSize="14px"
//                                 mb={1}
//                             >
//                                 {label}
//                             </Field.Label>
//                         )}

//                         <InputGroup>
//                             {/* {icon && iconPosition === "left" && (
//                                 <InputRightElement>
//                                     <Image src={icon} alt="icon" />
//                                 </InputRightElement>
//                             )} */}

//                             <Input
//                                 {...field}
//                                 {...restProps}
//                                 placeholder={placeholder}
//                                 type={
//                                     type === "password"
//                                         ? show
//                                             ? "text"
//                                             : "password"
//                                         : type
//                                 }
//                                 bg="#F2F4F7"
//                                 color="#4B5563"
//                                 fontSize="16px"
//                                 fontWeight="400"
//                                 borderRadius="full"
//                                 borderWidth="1px"
//                                 borderColor="#B4BCDD"
//                                 maxLength={maxLength}
//                                 readOnly={readOnly}
//                                 style={style}
//                                 onChange={handleCombinedChange}
//                                 px={5}
//                                 py={6}
//                                 mt={5}
//                                 _focus={{ borderWidth: "1px" }}
//                                 endAdornment={
//                                     type === "password" ? <IconButton
//                                         aria-label={show ? "Hide password" : "Show password"}
//                                         variant="ghost"
//                                         size="sm"
//                                         onClick={handleClick}
//                                         icon={
//                                             <Image
//                                                 src="/images/eye.svg"
//                                                 alt={show ? "Hide" : "Show"}
//                                             />
//                                         }
//                                     />
//                                         : (icon && iconPosition === "right") ? <Image src={icon} alt="icon" />
//                                             : null
//                                 }
//                             />

//                             {/* {type === "password" && (
//                                 <InputRightElement>
//                                     <IconButton
//                                         aria-label={show ? "Hide password" : "Show password"}
//                                         variant="ghost"
//                                         size="sm"
//                                         onClick={handleClick}
//                                         icon={
//                                             <Image
//                                                 src="/images/eye.svg"
//                                                 alt={show ? "Hide" : "Show"}
//                                             />
//                                         }
//                                     />
//                                 </InputRightElement>
//                             )} */}

//                             {/* {icon && iconPosition === "right" && (
//                                 <InputRightElement>
//                                     <Image src={icon} alt="icon" />
//                                 </InputRightElement>
//                             )} */}
//                         </InputGroup>

//                         {isInvalid && (
//                             <Field.ErrorText
//                                 color="brand.600"
//                                 fontSize="12px"
//                                 mt={1}
//                             >
//                                 {form.errors[name]}
//                             </Field.ErrorText>
//                         )}
//                     </Field.Root>
//                 );
//             }}
//         </FormikField>
//     );
// };

// export default CustomInput;
