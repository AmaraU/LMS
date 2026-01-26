import React from "react";
// import { SelectProps } from "@/interfaces/type";
import {
    Select as ChakraSelect,
    FormLabel,
    FormControl,
    FormErrorMessage,
} from "@chakra-ui/react";
import { Field } from "formik";
import { MdArrowDropDown } from "react-icons/md";

const Select = ({
    name,
    label,
    placeholder,
    options,
    readOnly,
    disabled,
    ...rest
}) => {
    return (
        <Field name={name}>
            {({ field, form }) => (
                <FormControl isInvalid={form.errors[name] && form.touched[name]}>
                    <FormLabel
                        color="#344054"
                        fontWeight={"600"}
                        fontSize={14}
                        mb={1}
                        fontFamily="body"
                    >
                        {label}
                    </FormLabel>
                    <ChakraSelect
                        {...field}
                        placeholder={placeholder}
                        icon={<MdArrowDropDown />}
                        bg="#F8FAFC"
                        borderRadius={"12px"}
                        color="#4B5563"
                        // color="#374151"
                        fontSize={14}
                        fontWeight={400}
                        // h={12}
                        // size="md"
                        isInvalid={form.errors[name] && form.touched[name]}
                        errorBorderColor="brand.600"
                        focusBorderColor="brand.200"
                        backgroundColor="#F2F4F7"
                        borderWidth={1}
                        readOnly={readOnly}
                        disabled={disabled}
                        _focus={{ borderWidth: 0 }}
                        // px={4}
                        // py={5}
                        borderColor={"#B4BCDD"}
                        {...rest}
                    >
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </ChakraSelect>
                    <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
                </FormControl>
            )}
        </Field>
    );
};

export default Select;






// import React from "react";
// import { Field as FormikField } from "formik";
// import {
//     Field,
//     Select,
// } from "@chakra-ui/react";
// import { MdArrowDropDown } from "react-icons/md";

// const CustomSelect = ({
//     name,
//     label,
//     placeholder,
//     options = [],
//     readOnly,
//     disabled,
//     ...rest
// }) => {
//     return (
//         <FormikField name={name}>
//             {({ field, form }) => {
//                 const isInvalid = form.touched[name] && form.errors[name];

//                 return (
//                     <Field.Root invalid={!!isInvalid}>
//                         {label && (
//                             <Field.Label
//                                 color="#344054"
//                                 fontWeight="600"
//                                 fontSize="14px"
//                                 mb={1}
//                                 fontFamily="body"
//                             >
//                                 {label}
//                             </Field.Label>
//                         )}

//                         <Select
//                             {...field}
//                             {...rest}
//                             placeholder={placeholder}
//                             icon={<MdArrowDropDown />}
//                             bg="#F2F4F7"
//                             borderRadius="full"
//                             color="#374151"
//                             fontSize="14px"
//                             fontWeight="400"
//                             borderWidth="0"
//                             readOnly={readOnly}
//                             disabled={disabled}
//                             _focus={{ borderWidth: 0 }}
//                         >
//                             {options.map((option) => (
//                                 <option key={option.value} value={option.value}>
//                                     {option.label}
//                                 </option>
//                             ))}
//                         </Select>

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

// export default CustomSelect;
