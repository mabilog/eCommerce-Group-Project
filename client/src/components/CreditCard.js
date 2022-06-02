import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "./GlobalContext";
import { ShippingContext } from "./ShippingContext";
import styled from "styled-components";
import { CartContext } from "./CartContext";

const CreditCard = () => {
  const {
    shippingState,
    actions: {
      updateFirstName,
      updateLastName,
      updateEmail,
      updateAddress,
      updateCcHolder,
      updateCcNum,
      updateCcExp,
      updateCcCvv,
      resetState,
    },
  } = useContext(ShippingContext);

  const { state } = useContext(CartContext);
  const { setOrderConfirmation } = useContext(GlobalContext);

  const navigate = useNavigate();

  useEffect(() => {
    resetState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    const postbody = { ...shippingState, ...state };
    fetch("/api/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postbody),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOrderConfirmation(data.orderObj);
      })
      .then(() => navigate("/orders"));
  };
  return (
    <Wrapper>
      <FormWrapper
        method="POST"
        onSubmit={(e) => {
          handleOrderSubmit(e);
        }}
      >
        <TopWrapper>
          <PaymentHeader>Payment</PaymentHeader>
          <p>All transactions are secure and encrypted (...lol jk)</p>
        </TopWrapper>
        <InputWrapper>
          <input
            type="text"
            placeholder="First Name"
            name="first-name"
            id="input-first-name"
            required
            onChange={(e) => updateFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            name="last-name"
            id="input-last-name"
            required
            onChange={(e) => updateLastName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            id="input-email"
            required
            onChange={(e) => updateEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Address"
            name="address"
            id="input-address"
            required
            onChange={(e) => updateAddress(e.target.value)}
          />
          <input
            type="number"
            placeholder="Card Number"
            name="credit-card-number"
            id="input-card-number"
            required
            onChange={(e) => updateCcNum(e.target.value)}
          />
          <input
            type="text"
            name="credit-card-holder-name"
            placeholder="Name on Card"
            id="input-card-name"
            required
            onChange={(e) => updateCcHolder(e.target.value)}
          />
          <SecurityWrapper>
            <input
              type="number"
              name="expiration-date"
              placeholder="Expiration Date"
              id="input-card-number"
              required
              onChange={(e) => updateCcExp(e.target.value)}
            />
            <input
              type="number"
              name="security-code"
              id="input-card-sec"
              placeholder="CVC"
              required
              onChange={(e) => updateCcCvv(e.target.value)}
            />
          </SecurityWrapper>
        </InputWrapper>
        <ButtonWrapper>
          <SubmitBtn type="submit">Confirm Purchase</SubmitBtn>
        </ButtonWrapper>
      </FormWrapper>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  margin-left: 50px;
  margin-top: 20px;
  font-family: "Jost";
`;
const TopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 20px;
`;
const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  height: 700px;
  width: 600px;

  input {
    padding-left: 15px;
    border: 1px solid #888;
    border-radius: 5px;
    line-height: 36px;
    font-size: 18px;
    font-family: "Jost";
  }
  // Removing some input type="number" styling
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }
`;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
  padding: 20px 0;
  border-top: 2px dotted #999;
  border-bottom: 2px dotted #999;
`;

const SecurityWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  gap: 10px;
  input {
    width: 100%;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 20px;
`;

const SubmitBtn = styled.button`
  font-size: 20px;
  font-family: "Jost";
  padding: 15px 35px;
  border-radius: 5px;
  border: none;
  background-color: var(--primary-color);
  color: #fff;
  cursor: pointer;
  &:hover {
    background-color: #444920;
  }
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;

const PaymentHeader = styled.h1`
font-size: 36px;
font-weight: 700;
letter-spacing: 3pt;
text-transform: uppercase;
/* text-align: center; */
color: #BE974C;
`

export default CreditCard;
