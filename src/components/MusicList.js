import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { deleteMusic, updateMusic } from '../actions/products';
import { Card, Image, Button } from 'semantic-ui-react';
import Toast from './Toast'; // ✅ use custom toast
import axios from 'axios';
import { serverUrl } from '../environment/environment';

const MusicList = ({ musics, deleteMusic, updateMusic }) => {

    const musicArray = musics.musics || [];
    const role = localStorage.getItem('role');

    const [toastMsg, setToastMsg] = React.useState("");

    const showToast = (msg) => {
        setToastMsg(msg);
        setTimeout(() => setToastMsg(""), 2000);
    };

    const addToCart = async (product) => {
    try {
        const userId = localStorage.getItem("userId"); // must be stored during login

        await axios.post(serverUrl + "cart", {
            userId: userId,
            productId: product.id,
            name: product.name,
            image: product.image,
            price: product.price
        });

        showToast("🛒 Added to cart");
    } catch (err) {
        console.error(err);
        showToast("❌ Failed to add to cart");
    }
};

    const handleEdit = (music) => {
        const newName = prompt("New name:", music.name);
        const newImage = prompt("New image:", music.image);
        const newPrice = prompt("New price:", music.price);

        if (!newName || !newImage || !newPrice) {
            showToast("⚠️ Update cancelled");
            return;
        }

        updateMusic({
            id: music.id,
            name: newName,
            image: newImage,
            price: parseFloat(newPrice)
        });

        showToast("✅ Product updated");
    };

    const handleDelete = (id) => {
        deleteMusic(id);
        showToast("🗑️ Product deleted");
    };

    return (
        <div>
            <Toast message={toastMsg} /> {/* ✅ render toast */}

            {musicArray.length === 0 && (
                <p style={{ textAlign: 'center' }}>No Products yet</p>
            )}

            <Card.Group itemsPerRow={3}>
                {musicArray.map(music => (
                    <Card key={music.id}>

                        <Image
                            src={music.image || 'https://via.placeholder.com/300'}
                            onError={(e) => e.target.src = 'https://via.placeholder.com/300'}
                            wrapped
                            ui={false}
                        />

                        <Card.Content>
                            <Card.Header>{music.name}</Card.Header>
                            <Card.Meta style={{ marginTop: '10px', fontWeight: 'bold' }}>
                                ₹ {music.price}
                            </Card.Meta>
                        </Card.Content>

                        {role === "Admin" && (
                            <Card.Content extra>
                                <Button color="red" size="small" onClick={() => handleDelete(music.id)}>
                                    Delete
                                </Button>

                                <Button color="blue" size="small" onClick={() => handleEdit(music)}>
                                    Edit
                                </Button>
                            </Card.Content>
                        )}

                        {role !== "Admin" && (
                            <Card.Content extra>
                                <Button color="green" size="small" onClick={() => addToCart(music)}>
                                    Add to Cart 🛒
                                </Button>
                            </Card.Content>
                        )}

                    </Card>
                ))}
            </Card.Group>
        </div>
    );
};

MusicList.propTypes = {
    musics: PropTypes.object.isRequired,
    deleteMusic: PropTypes.func.isRequired,
    updateMusic: PropTypes.func.isRequired
};

export default connect(
    state => ({ musics: state.musics }),
    { deleteMusic, updateMusic }
)(MusicList);