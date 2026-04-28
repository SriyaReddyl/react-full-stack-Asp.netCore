import React, { Component } from 'react';
import { Container, Card, Button } from 'semantic-ui-react';
import axios from 'axios';
import { serverUrl } from '../environment/environment';

class Cart extends Component {
  state = {
    cart: []
  };

  componentDidMount() {
    this.loadCart();
  }

  // 🔄 Load cart from DB
  loadCart = () => {
    const userId = localStorage.getItem("userId");

    axios.get(serverUrl + "cart/" + userId)
      .then(res => {
        this.setState({ cart: res.data });
      });
  };

  // ❌ Remove item (DB version)
  removeItem = async (id) => {
    await axios.delete(serverUrl + "cart/" + id);

    this.loadCart(); // refresh cart
  };

  // 💳 Checkout
  handleCheckout = async () => {
    const userId = localStorage.getItem("userId");

    if (this.state.cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    const total = this.state.cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    try {
      await axios.post(serverUrl + "order", {
        userId: parseInt(userId),
        totalAmount: total
      });

      alert("🎉 Order placed successfully!");

      this.setState({ cart: [] });

    } catch (err) {
      console.error(err);
      alert("❌ Checkout failed");
    }
  };

  render() {
    const total = this.state.cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    return (
      <Container style={{ marginTop: "30px" }}>
        <h2>🛒 Cart</h2>

        <Card.Group>
          {this.state.cart.map(item => (
            <Card key={item.id}>

              <img src={item.image} alt="" />

              <Card.Content>
                <Card.Header>{item.name}</Card.Header>
                <Card.Meta>₹ {item.price}</Card.Meta>

                <Card.Description>
                  Quantity: {item.quantity}
                </Card.Description>
              </Card.Content>

              <Card.Content extra>
                <Button 
                  color="red" 
                  onClick={() => this.removeItem(item.id)}
                >
                  Remove
                </Button>
              </Card.Content>

            </Card>
          ))}
        </Card.Group>

        {/* 💰 TOTAL */}
        <h3 style={{ marginTop: "20px" }}>
          Total: ₹ {total}
        </h3>

        {/* 💳 CHECKOUT BUTTON */}
        <Button 
          color="green" 
          fluid 
          style={{ marginTop: "10px" }}
          onClick={this.handleCheckout}
        >
          Checkout 💳
        </Button>

      </Container>
    );
  }
}

export default Cart;