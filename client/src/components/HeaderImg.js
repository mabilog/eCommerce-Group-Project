import dreamteam from "../images/dreamteamheader2.png"
import styled from "styled-components";

const HeaderImg = () => {
    return (
        <>
        <Img src={dreamteam}/>
        <HeaderDiv>Dream Team Wearables</HeaderDiv>
        </>
    )
}

const Img = styled.img`
margin-bottom: 20px;
`

const HeaderDiv = styled.div`
position: absolute;
margin-top: 130px;
margin-left: 700px;
font-size: 60px;
font-weight: 700;
letter-spacing: 3pt;
text-transform: uppercase;
text-align: center;
color: #BE974C;
`

export default HeaderImg;

