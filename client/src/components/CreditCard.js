import styled from "styled-components";

const CreditCard = () => {
  return (
    <form method="POST">
      <input
        type="number"
        placeholder="Card Number"
        name="credit-card-number"
        required
      />
      <input
        type="text"
        name="credit-card-holder-name"
        placeholder="Name on Card"
        required
      />
      <input
        type="number"
        name="expiration-date"
        placeholder="Expiration date"
        min="4"
        max="4"
        required
      />
      <input type="number" name="security-code" min="3" max="3" required />
      <button type="submit">Pay now</button>
    </form>
  );
};

export default CreditCard;
