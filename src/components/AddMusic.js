import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addMusic } from '../actions/products';
import { Form, Button, Container, Header } from 'semantic-ui-react';
import Toast from './Toast';

class AddMusic extends Component {

    state = {
        name: '',
        image: '',
        price: '',
        toastMsg: ''
    };

    showToast = (msg) => {
        this.setState({ toastMsg: msg });
        setTimeout(() => this.setState({ toastMsg: '' }), 2000);
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.addMusic({
            name: this.state.name,
            image: this.state.image,
            price: parseFloat(this.state.price)
        });

        this.showToast("✅ Product added");

        this.setState({ name: '', image: '', price: '' });
    };

    render() {
        return (
            <Container text style={{ marginTop: '40px' }}>

                <Toast message={this.state.toastMsg} />

                <Header as="h2" textAlign="center">
                    Add New Product 🧸
                </Header>

                <Form onSubmit={this.handleSubmit}>
                    <Form.Input label="Product Name" name="name" value={this.state.name} onChange={this.handleChange} />
                    <Form.Input label="Image URL" name="image" value={this.state.image} onChange={this.handleChange} />
                    <Form.Input label="Price" name="price" value={this.state.price} onChange={this.handleChange} type="number" />

                    <Button primary fluid type="submit">
                        Add Product
                    </Button>
                </Form>
            </Container>
        );
    }
}

export default connect(null, { addMusic })(AddMusic);