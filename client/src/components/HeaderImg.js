import dreamteam from "../images/dreamteamheader1.png"
import styled from "styled-components";

const HeaderImg = () => {
    return (
        <>
        <Img src={dreamteam}/>
        </>
    )
}

const Img = styled.img`
margin-bottom: 20px;
`

export default HeaderImg;

