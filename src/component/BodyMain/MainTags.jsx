import getTagsProduk from "../DataBase/Produk/GetTagsproduk"
import ListGroup from 'react-bootstrap/ListGroup';
import { useState, useEffect } from 'react'

const MainTags = ({ onTagClick, onViewAll }) => {
    const [tags, setTags] = useState([]);

    const [selectedTag, setSelectedTag] = useState('');

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const tagsData = await getTagsProduk();
                setTags(tagsData.data);
                console.log(tagsData.data);
            } catch (error) {
                console.error('Error fetching tags:', error);
            }
        };

        fetchTags();
    }, []);



    return (
        <ListGroup>
            <ListGroup.Item
                onClick={() => {
                    onViewAll();
                    setSelectedTag();
                }}
                style={{
                    cursor: 'pointer',
                }}>
                View All
            </ListGroup.Item>

            {tags.length > 0 && tags.map((tag, i) =>
                <ListGroup.Item
                    key={i}
                    onClick={() => {
                        onTagClick(tag._id); 
                        setSelectedTag(tag._id); 
                    }}
                    style={{
                        cursor: 'pointer',
                        backgroundColor: selectedTag === tag._id ? '#ffedd5' : '',
                    }}>
                    {tag.name}
                </ListGroup.Item>
            )}


            <h5>{tags.name}</h5>
        </ListGroup>
    )
}

export default MainTags