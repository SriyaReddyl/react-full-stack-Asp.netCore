import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { menuStyle, fixedMenuStyle } from '../helpers/styleHelpers';
import { Container, Image, Menu, Visibility } from 'semantic-ui-react';

class Header extends Component {
    state = {
        menuFixed: null,
    };

    stickTopMenu = () => this.setState({ menuFixed: true });
    unStickTopMenu = () => this.setState({ menuFixed: null });

    handleLogout = () => {
        localStorage.clear();
        window.location.href = "/login"; // reload
    };

    render() {
        const { menuFixed } = this.state;

        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');

        return (
            <div>
                <Visibility
                    onBottomPassed={this.stickTopMenu}
                    onBottomVisible={this.unStickTopMenu}
                    once={false}
                >
                    <Menu
                        borderless
                        fixed={menuFixed && 'top'}
                        style={menuFixed ? fixedMenuStyle : menuStyle}
                    >
                        <Container text>

                            <Menu.Item>
                                <Image
                                    size='mini'
                                    src='https://react.semantic-ui.com/logo.png'
                                />
                            </Menu.Item>

                            <Menu.Item header>
                                Product Store 🧸
                            </Menu.Item>

                            {/* 🔐 Show only when logged in */}
                            {token && (
                                <Menu.Item as={Link} to="/products">
                                   Products
                                </Menu.Item>
                            )}
							
							{/* 🔐 USER ONLY (not admin) */}
                            {token && role !== "Admin" && (
                                <Menu.Item as={Link} to="/cart">
                                   Cart 🛒
                                </Menu.Item>
                            )}

                            {/* 🔐 Admin only */}
                            {token && role === "Admin" && (
                                <Menu.Item as={Link} to="/add">
                                    Add Product
                                </Menu.Item>
                            )}

                            {/* 🔐 Login / Logout */}
                            {!token ? (
                                <Menu.Item position="right" as={Link} to="/login">
                                    Login
                                </Menu.Item>
                            ) : (
                                <Menu.Item position="right" onClick={this.handleLogout}>
                                    Logout
                                </Menu.Item>
                            )}

                        </Container>
                    </Menu>
                </Visibility>
            </div>
        );
    }
}

export default Header;