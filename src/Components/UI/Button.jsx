import { Button as ChakraButton, Image } from "@chakra-ui/react";
// import { ButtonType } from "@/interfaces/type";

const Button = (props) => {
    const {
        text: textProp,
        icon,
        iconPosition,
        size,
        variant = "solid",
        isDisabled,
        isLoading,
        onClick,
        fontSize = 15,
        fontWeight = 500,
        px = '18px',
        py,
        color: text = variant === "outline" ? "#2C2F7E" : "#F0F0F0",
        bg = variant === "outline" ? "white" : "#2C2F7E",
        border = variant === "outline" ? "#2C2F7E" : "transparent",
        type = "submit",
        borderRadius = "7px",
        width = "100%",
        height = "48px",
        iconWidth = "20px",
        iconHeight = "20px",
    } = props;

    // align-items: center;
    // background: #2C2F7E;
    // padding: 14px 20px;
    // gap: 4px;
    // border-radius: 7px;
    // color: #F0F0F0;
    // font-size: 18px;
    // font-weight: 500;
    // border: none;
    // outline: none;

    return (
        <ChakraButton
            size={size}
            variant={variant}
            isDisabled={isDisabled}
            isLoading={isLoading}
            onClick={onClick}
            color={text}
            bg={bg}
            leftIcon={
                icon &&
                iconPosition === "left" && (
                    <Image src={icon} alt="icon" width={iconWidth} height={iconHeight} />
                )
            }
            rightIcon={
                icon &&
                iconPosition === "right" && (
                    <Image src={icon} alt="icon" width={iconWidth} height={iconHeight} />
                )
            }
            borderWidth={variant === "outline" ? "1px" : "0px"}
            borderColor={border}
            borderRadius={borderRadius}
            _hover={
                {
                    // bg: variant === "outline" ? "brand.100" : "brand.200",
                    // color: variant === "outline" ? "white" : "white",
                    // bg: "none",
                }
            }
            fontSize={fontSize}
            fontWeight={fontWeight}
            px={px}
            py={py}
            type={type}
            width={width}
            height={height}
        >
            {textProp}
        </ChakraButton>
    );
};

export default Button;