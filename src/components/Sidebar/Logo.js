import styled from "styled-components";

const Image = styled.img`
    width: 80%;
    padding: 10%;
`;

const Logo = () => {
    return (
        <Image src='./images/loich.png' alt="Loich Logo" />
    )
};

export default Logo;